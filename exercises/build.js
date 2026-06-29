#!/usr/bin/env node
// build.js — reads MD files, parses exercises, updates HTML exercise arrays.
// Run from anywhere inside the game/ repo:  node exercises/build.js
// 01-variables.md uses a Track A / Track B layout and is not included here.

const fs = require('fs');
const path = require('path');

const DIR = __dirname; // exercises/

const MAPPINGS = [
  { md: '02-numbers.md',              html: 'numbers.html' },
  { md: '03-chars-bools.md',          html: 'chars-bools.html' },
  { md: '04-statements-expressions.md', html: 'statements-expressions.html' },
  { md: '05-functions.md',            html: 'functions.html',  track: 'A', limit: 6 },
  { md: '06-ownership.md',            html: 'ownership.html',  track: 'A', limit: 6 },
];

// ─── main ────────────────────────────────────────────────────────────────────

for (const { md, html, track, limit } of MAPPINGS) {
  try {
    const mdText   = fs.readFileSync(path.join(DIR, md),   'utf8');
    const htmlText = fs.readFileSync(path.join(DIR, html), 'utf8');
    const exercises = parseMd(mdText, track, limit);
    const newHtml   = replaceArray(htmlText, exercises);
    fs.writeFileSync(path.join(DIR, html), newHtml, 'utf8');
    console.log(`OK  ${html}  (${exercises.length} exercises from ${md})`);
  } catch (err) {
    console.error(`ERR ${html}: ${err.message}`);
    process.exitCode = 1;
  }
}

// ─── parser ──────────────────────────────────────────────────────────────────

function parseMd(mdText, track = null, limit = null) {
  // If a track is specified, extract only that section of the document
  if (track) {
    const trackHeader = `## Track ${track}`;
    const trackIdx    = mdText.indexOf(trackHeader);
    if (trackIdx >= 0) {
      const nextTrack = mdText.indexOf('\n## Track', trackIdx + trackHeader.length);
      mdText = mdText.slice(trackIdx, nextTrack >= 0 ? nextTrack : undefined);
    }
  }

  const exercises = [];
  // Exercises are separated by horizontal rules: \n---\n
  const sections = mdText.split(/\n---\n/);

  for (const section of sections) {
    // Handle both ## Exercise N and ### Exercise N headers
    const headerMatch = section.match(/^#{2,3} Exercise (\d+) - (.+)$/m);
    if (!headerMatch) continue;

    const num   = parseInt(headerMatch[1], 10);
    const title = headerMatch[2].trim();
    // body = everything after the exercise header line
    const headerEnd = section.indexOf(headerMatch[0]) + headerMatch[0].length;
    const body = section.slice(headerEnd).trim();

    exercises.push(parseExercise(num, title, body));

    if (limit && exercises.length >= limit) break;
  }
  return exercises;
}

function parseExercise(num, title, body) {
  // Split off answer block(s)
  const answerIdx  = body.indexOf('<answer>');
  const mainBody   = answerIdx >= 0 ? body.slice(0, answerIdx).trim() : body;
  const answerBody = answerIdx >= 0 ? body.slice(answerIdx) : '';

  // Split main body at "#### Your Task"
  const taskSplit    = mainBody.split(/\n#### Your Task\n+/);
  const explainerRaw = taskSplit[0].trim();
  const taskSection  = taskSplit[1] ? taskSplit[1].trim() : '';

  const explainer = mdToHtml(explainerRaw);

  // Find the bold instruction line: **...**  or  **...:**
  const instrRe    = /^\*\*([^*\n]+?)\*\*:?\s*$/m;
  const instrMatch = instrRe.exec(taskSection);

  let taskRaw, instrText, codeSection;

  if (instrMatch) {
    taskRaw     = taskSection.slice(0, instrMatch.index).trim();
    instrText   = instrMatch[1].replace(/:$/, '').trim();
    codeSection = taskSection.slice(instrMatch.index + instrMatch[0].length).trim();
  } else {
    // fallback: split at first code block
    const codeIdx = taskSection.indexOf('```rust');
    taskRaw     = codeIdx >= 0 ? taskSection.slice(0, codeIdx).trim() : taskSection;
    instrText   = '';
    codeSection = codeIdx >= 0 ? taskSection.slice(codeIdx) : '';
  }

  const task        = mdToHtml(taskRaw);
  const instruction = inlineToHtml(instrText);

  // Starter code: first ```rust``` in codeSection
  const starterMatch = codeSection.match(/```rust\n([\s\S]*?)```/);
  const starterCode  = starterMatch ? starterMatch[1].trimEnd() : '';

  // Expected output: ```text``` after "#### Expected Output"
  const outputMatch   = mainBody.match(/#### Expected Output\n+```text\n([\s\S]*?)```/);
  const expectedOutput = outputMatch ? outputMatch[1].trimEnd() : '';

  // Parse answer block(s)
  const { why, answerCode } = parseAnswers(answerBody);

  return { num, title, explainer, task, starterCode, instruction, expectedOutput, answerCode, why };
}

function parseAnswers(answersSection) {
  if (!answersSection) return { why: '', answerCode: '' };

  const blockRe = /<answer>([\s\S]*?)<\/answer>/g;
  const blocks  = [];
  let m;
  while ((m = blockRe.exec(answersSection)) !== null) {
    const content = m[1];

    const labelMatch = content.match(/<summary>([^<]+)<\/summary>/);
    const label = labelMatch ? labelMatch[1].trim() : 'Answer';

    // Why text = between </summary> and first ```rust
    const whyMatch = content.match(/<\/summary>\s*([\s\S]*?)(?=```rust)/);
    const why = whyMatch ? whyMatch[1].trim() : '';

    // Code = first ```rust``` block
    const codeMatch = content.match(/```rust\n([\s\S]*?)```/);
    const code = codeMatch ? codeMatch[1].trimEnd() : '';

    blocks.push({ label, why, code });
  }

  if (blocks.length === 0) return { why: '', answerCode: '' };

  if (blocks.length === 1) {
    return { why: mdToHtml(blocks[0].why), answerCode: blocks[0].code };
  }

  // Multiple answer blocks: collect why texts; comment-out second+ code blocks
  const whyParts  = blocks.filter(b => b.why).map(b => b.why);
  const why       = mdToHtml(whyParts.join('\n\n'));

  const codeParts = blocks.map((b, i) => {
    if (i === 0) return b.code;
    const commented = b.code.split('\n').map(l => '// ' + l).join('\n');
    return `\n// ${b.label}:\n${commented}`;
  });
  const answerCode = codeParts.join('\n');

  return { why, answerCode };
}

// ─── markdown → html ─────────────────────────────────────────────────────────

function mdToHtml(text) {
  if (!text) return '';
  const lines  = text.split('\n');
  let html     = '';
  let inOl     = false;
  let inUl     = false;
  let pLines   = [];

  const flushP = () => {
    if (pLines.length > 0) {
      html += '<p>' + inlineToHtml(pLines.join(' ')) + '</p>';
      pLines = [];
    }
  };

  for (const line of lines) {
    const t = line.trim();

    if (!t) {
      flushP();
      if (inOl) { html += '</ol>'; inOl = false; }
      if (inUl) { html += '</ul>'; inUl = false; }
    } else if (/^\d+\.\s/.test(t)) {
      flushP();
      if (inUl) { html += '</ul>'; inUl = false; }
      if (!inOl) { html += '<ol>'; inOl = true; }
      html += '<li>' + inlineToHtml(t.replace(/^\d+\.\s+/, '')) + '</li>';
    } else if (/^[-*]\s/.test(t)) {
      flushP();
      if (inOl) { html += '</ol>'; inOl = false; }
      if (!inUl) { html += '<ul>'; inUl = true; }
      html += '<li>' + inlineToHtml(t.replace(/^[-*]\s+/, '')) + '</li>';
    } else if (t.startsWith('#') || t.startsWith('>')) {
      // skip headers and blockquotes
    } else {
      if (inOl) { html += '</ol>'; inOl = false; }
      if (inUl) { html += '</ul>'; inUl = false; }
      pLines.push(t);
    }
  }

  flushP();
  if (inOl) html += '</ol>';
  if (inUl) html += '</ul>';

  return html;
}

function inlineToHtml(text) {
  if (!text) return '';
  // Process backtick code spans first to protect their content
  const parts = text.split(/(`[^`\n]+`)/);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      // Code span
      const inner   = part.slice(1, -1);
      const escaped = inner
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return '<code>' + escaped + '</code>';
    }
    // Regular text
    let t = part.replace(/&/g, '&amp;');
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    return t;
  }).join('');
}

// ─── html replacement ────────────────────────────────────────────────────────

function replaceArray(html, exercises) {
  const openMarker  = '  const exercises = [';
  const closeMarker = '\n  ];';

  const start = html.indexOf(openMarker);
  if (start === -1) throw new Error('"const exercises = [" not found');

  const closeStart = html.indexOf(closeMarker, start);
  if (closeStart === -1) throw new Error('closing "  ];" not found');
  const end = closeStart + closeMarker.length;

  const lines = [openMarker];
  for (let i = 0; i < exercises.length; i++) {
    const ex    = exercises[i];
    const comma = i < exercises.length - 1 ? ',' : '';
    lines.push('    {');
    lines.push(`      num: ${ex.num},`);
    lines.push(`      title: ${JSON.stringify(ex.title)},`);
    lines.push(`      explainer: ${JSON.stringify(ex.explainer)},`);
    lines.push(`      task: ${JSON.stringify(ex.task)},`);
    lines.push(`      starterCode: ${JSON.stringify(ex.starterCode)},`);
    lines.push(`      instruction: ${JSON.stringify(ex.instruction)},`);
    lines.push(`      expectedOutput: ${JSON.stringify(ex.expectedOutput)},`);
    lines.push(`      answerCode: ${JSON.stringify(ex.answerCode)},`);
    lines.push(`      why: ${JSON.stringify(ex.why)}`);
    lines.push(`    }${comma}`);
  }

  return html.slice(0, start) + lines.join('\n') + closeMarker + html.slice(end);
}
