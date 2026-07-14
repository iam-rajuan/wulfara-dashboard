const fs = require('fs');
const path = require('path');
const svgDir = path.join(process.cwd(), 'src', 'svglogos');
const files = fs.readdirSync(svgDir).filter(f => f.endsWith('Icon.jsx') && f !== 'SvgIcons.jsx');

let appendContent = '\n\n';

for (const file of files) {
    let content = fs.readFileSync(path.join(svgDir, file), 'utf-8');
    content = content.replace(/import React from ['"]react['"];\r?\n?/g, '');
    content = content.replace(/const ([a-zA-Z0-9_]+)\s*=/g, 'export const $1 =');
    content = content.replace(/export default [a-zA-Z0-9_]+;?\r?\n?/g, '');
    appendContent += content + '\n';
}

const svgIconsPath = path.join(svgDir, 'SvgIcons.jsx');
let existing = fs.readFileSync(svgIconsPath, 'utf-8');
fs.writeFileSync(svgIconsPath, existing + appendContent);
console.log('Appended to SvgIcons.jsx');

for (const file of files) {
    fs.unlinkSync(path.join(svgDir, file));
}
console.log('Deleted individual files:', files.join(', '));
