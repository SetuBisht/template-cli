#!/usr/bin/env node
const fs = require("fs-extra");
const { Command } = require("commander");
const path = require("path");

const validProjectTypes = ["vanillaWeb", "fullStack"];
const version = "1.0.0";
const features = ["vanillaWeb", "fullStack", "Feature 3"];

const program = new Command();

program
  .version("1.0.0")
  .description("CLI tool for generating boilerplate code")
  .arguments("<command> [projectType] [name]")
  .action(async (command, projectType, name) => {
    try {
      switch (command) {
        case "make":
          if (!validProjectTypes.includes(projectType)) {
            console.error(
              `Invalid project type. Supported project types: ${validProjectTypes.join(
                ", "
              )}`
            );
            return;
          }
          await generateProject(projectType, name);
          break;
        case "features":
          console.log("Supported features:");
          features.forEach((feature, index) =>
            console.log(`${index + 1}. ${feature}`)
          );
          break;
        default:
          console.error(`Invalid command. Supported commands: make, features`);
      }
    } catch (error) {
      console.error("Error generating boilerplate:", error);
    }
  });

program.option("-currentVersion,-cv", "Output the version number", () => {
  console.log(version);
  process.exit(0); // Exit after printing version
});

async function generateProject(projectType, name) {
  const projectDir = path.join(process.cwd(), name);
  // Create directory for the project
  await fs.mkdir(projectDir);
  // Create files inside the directory
  if (projectType === "vanillaWeb") {
    await generateVanillaWebProject(projectDir, name); // Pass 'name' to the function
  }

  console.log(`${projectType} project generated successfully!`);
}
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


  const scriptJSContent = `; // Add your JavaScript code here`;

  // Create files inside the directory with boilerplate content
  await Promise.all([
    fs.writeFile(path.join(projectDir, "index.html"), indexHTMLContent),
    fs.writeFile(path.join(projectDir, "style.css"), styleCSSContent),
    fs.writeFile(path.join(projectDir, "script.js"), scriptJSContent),
    fs.mkdir(path.join(projectDir, "assets")),
  ]);

  console.log("Vanilla web project generated successfully!");
}

program.parse(process.argv);
