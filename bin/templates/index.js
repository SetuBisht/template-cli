const fs = require("fs-extra");
const path = require("path");

async function generateVanillaWebProject(projectDir, name) {
  const indexHTMLContent = `<!DOCTYPE html>
            <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${name}</title>
                <link rel="stylesheet" href="style.css">
                </head>
                <body>
                <h1>Hello, ${name}!</h1>
                <script src="script.js"></script>
                </body>
                </html>`;

  const styleCSSContent = `/* Reset styles */
            html, body, h1 {
            margin: 0;
            padding: 0;
            }

            /* Global styles */
            body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            color: #333;
            line-height: 1.6;
            }


  const scriptJSContent = ``; // Add your JavaScript code here`;

  // Create files inside the directory with boilerplate content
  await Promise.all([
    fs.writeFile(path.join(projectDir, "index.html"), indexHTMLContent),
    fs.writeFile(path.join(projectDir, "style.css"), styleCSSContent),
    fs.writeFile(path.join(projectDir, "script.js"), scriptJSContent),
    fs.mkdir(path.join(projectDir, "assets")),
  ]);

  console.log("Vanilla web project generated successfully!");
}
async function generateReact(projectDir, name, dependencies) {}
async function generateNode(projectDir, name, dependencies) {}
async function generateNext(projectDir, name, dependencies) {}

module.exports = {
  generateVanillaWebProject,
  generateReact,
  generateNode,
  generateNext,
};
