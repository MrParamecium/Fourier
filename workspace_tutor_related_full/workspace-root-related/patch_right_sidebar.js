const fs = require('fs');

let css = fs.readFileSync('tutor-openclaw-ui/style.css', 'utf8');

const newRightSidebarCSS = `
/* --- UI Polish & Sidebar Toggle Additions (Right TOC Sidebar Hide Logic) --- */
.toc-sidebar {
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-x: hidden;
}

.app.sidebar-collapsed .toc-sidebar {
  width: 0 !important;
  transform: translateX(100%);
  border-left: none !important;
}
`;

if (!css.includes('app.sidebar-collapsed .toc-sidebar')) {
  fs.writeFileSync('tutor-openclaw-ui/style.css', css + newRightSidebarCSS);
  console.log('Right sidebar CSS patch applied.');
} else {
  console.log('Right sidebar CSS patch already exists.');
}
