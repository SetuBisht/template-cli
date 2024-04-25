const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");

async function installDependencies(projectDir, dependencies) {
  return new Promise((resolve, reject) => {
    const command = `npm install ${dependencies.join(" ")}`;
    exec(command, { cwd: projectDir }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Failed to install dependencies: ${error.message}`);
        reject(error);
      } else {
        console.log(`Dependencies installed: ${dependencies.join(", ")}`);
        resolve();
      }
    });
  });
}
function execShellCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout ? stdout : stderr);
    });
  });
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
            }`;

  const scriptJSContent = ``;

  await Promise.all([
    fs.writeFile(path.join(projectDir, "index.html"), indexHTMLContent),
    fs.writeFile(path.join(projectDir, "style.css"), styleCSSContent),
    fs.writeFile(path.join(projectDir, "script.js"), scriptJSContent),
    fs.mkdir(path.join(projectDir, "assets")),
  ]);

  console.log("Vanilla web project generated successfully!");
}
async function generateReact(projectDir, name, dependencies) {
  try {
    let customDependencies = ["axios", "react-redux"];
    console.log(`Creating React app '${name}'...`);

    // Create the React app using create-react-app
    const command = `npx create-react-app ${name}`;
    await execShellCommand(command);

    // Change directory to the newly created React app
    process.chdir(name);

    // Install additional dependencies
    if (customDependencies.length > 0) {
      console.log(
        `Installing additional dependencies: ${customDependencies.join(", ")}`
      );
      const newCommand = `npm install --save ${customDependencies.join(" ")}`;
      await execShellCommand(newCommand);
    }

    console.log(`React app '${name}' generated successfully!`);
  } catch (error) {
    console.error("Error generating React app:", error);
  }
}

async function generateNode(projectDir, name, dependencies) {
  try {
    // Create directory for the project
    let customDependencies = ["express", "nodemon", "jsonwebtoken"];

    // Generate package.json file
    const packageJsonContent = {
      name: name,
      version: "1.0.0",
      description: "",
      main: "index.js",
      scripts: {
        start: "node index.js",
      },
      dependencies: {},
      devDependencies: {},
    };
    await fs.writeFile(
      path.join(projectDir, "package.json"),
      JSON.stringify(packageJsonContent, null, 2)
    );

    // Generate index.js file
    const indexJsContent = `const express = require('express');

                            const app = express();
                            const port = 3000;

                          // Define routes
                          app.get('/', (req, res) => {
                            res.send('Hello, world!');
                          });

                            // Start the server
                            app.listen(port, () => {
                            console.log('Server is listening port');
                            });`;

    await fs.writeFile(path.join(projectDir, "index.js"), indexJsContent);
    await Promise.all([
      fs.mkdir(path.join(projectDir, "auth")),
      fs.mkdir(path.join(projectDir, "middleware")),
      fs.mkdir(path.join(projectDir, "schema")),
      fs.mkdir(path.join(projectDir, "routes")),
      fs.mkdir(path.join(projectDir, "Db")),
      fs.mkdir(path.join(projectDir, "utility")),
    ]);
    // Install dependencies
    if (customDependencies && customDependencies.length > 0) {
      console.log("Installing dependencies...");
      await installDependencies(projectDir, customDependencies);
    }

    console.log("Node.js project generated successfully!");
  } catch (error) {
    console.error("Error generating Node.js project:", error);
  }
}

async function generateNext(projectDir, name, dependencies) {
  try {
    let customDependencies = ["axios", "react-redux"];
    console.log(`Creating next app '${name}'...`);

    // Create the React app using create-react-app
    const command = `npx create-next-app ${name}`;
    await execShellCommand(command);

    // Change directory to the newly created React app
    process.chdir(name);

    // Install additional dependencies
    if (customDependencies.length > 0) {
      console.log(
        `Installing additional dependencies: ${customDependencies.join(", ")}`
      );
      // Install additional dependencies
      if (customDependencies.length > 0) {
        console.log(
          `Installing additional dependencies: ${customDependencies.join(", ")}`
        );
        const newCommand = `npm install --save ${customDependencies.join(" ")}`;
        await execShellCommand(newCommand);
      }
    }

    console.log(`React app '${name}' generated successfully!`);
  } catch (error) {
    console.error("Error generating React app:", error);
  }
}

module.exports = {
  generateVanillaWebProject,
  generateReact,
  generateNode,
  generateNext,
};
