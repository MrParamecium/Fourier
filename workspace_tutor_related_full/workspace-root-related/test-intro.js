const fs = require('fs');
const html = fs.readFileSync('tutor-openclaw-ui/index.html', 'utf8');
const app = fs.readFileSync('tutor-openclaw-ui/app.js', 'utf8');
if (!html.includes('introGetStartedBtn')) console.log("Missing button in HTML");
if (!app.includes('initIntroLanding')) console.log("Missing init in JS");
