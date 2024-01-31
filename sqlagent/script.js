


const sidebar = document.querySelector(".sidebar");
const sidebarClose = document.querySelector("#sidebar-close");
const menu = document.querySelector(".menu-content");
const menuItems = document.querySelectorAll(".submenu-item");
const subMenuTitles = document.querySelectorAll(".submenu .menu-title");

sidebarClose.addEventListener("click", () => sidebar.classList.toggle("close"));

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    menu.classList.add("submenu-active");
    item.classList.add("show-submenu");
    menuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show-submenu");
      }
    });
  });
});

subMenuTitles.forEach((title) => {
  title.addEventListener("click", () => {
    menu.classList.remove("submenu-active");
  });
});

document.addEventListener('DOMContentLoaded', function() {


// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/marked-highlight/lib/index.umd.js"></script>
const {markedHighlight} = globalThis.markedHighlight;
const marked = new marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);


  const button = document.getElementById('collapseExpandButton');
  const markdownContainer = document.getElementById('markdownContainer');
  const markdownContent = document.getElementById('markdownContent');

  // const marked = new marked(
  //   markedHighlight({
  //     langPrefix: 'hljs language-',
  //     highlight(code, lang, info) {
  //       const language = hljs.getLanguage(lang) ? lang : 'plaintext';
  //       return hljs.highlight(code, { language }).value;
  //     }
  //   })
  // );

  // Example Markdown content
  const markdown = `
\`\`\`javascript
console.log('Hello, world!');
\`\`\`

\`\`\`sql
SELECT * FROM users;
\`\`\`
`;

  // Render Markdown as HTML
  markdownContent.innerHTML = marked.parse(markdown);

  // Apply syntax highlighting
  document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
  });

  // Collapse/Expand functionality
  button.addEventListener('click', function() {
      if (markdownContainer.style.height === '40vh' || markdownContainer.style.height === '') {
          markdownContainer.style.height = '0';
          button.textContent = '▲';
      } else {
          markdownContainer.style.height = '40vh';
          button.textContent = '▼';
      }
  });
});





console.log(menuItems, subMenuTitles);
