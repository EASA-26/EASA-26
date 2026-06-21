const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/import React(?:, \{.*?\})? from 'react';\n/g, (match) => {
        if (match.includes('{')) {
          return match.replace(/React, /, '');
        }
        return '';
      });
      content = content.replace(/import React from 'react';\n/, '');
      
      // Fix Github import in EngageWithUs
      if (file === 'EngageWithUs.tsx') {
        content = content.replace(/Github/g, 'Globe');
      }
      
      fs.writeFileSync(fullPath, content);
    } else if (fullPath.endsWith('content.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/Lightbulb,\s*/g, '');
      content = content.replace(/CheckCircle,\s*/g, '');
      content = content.replace(/TrendingUp,\s*/g, '');
      content = content.replace(/Cpu\s*/g, '');
      // clean up commas
      content = content.replace(/,\s*,/g, ',');
      content = content.replace(/,\s*}/g, '\n}');
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(__dirname, 'src'));
console.log('Fixed TS lint errors.');
