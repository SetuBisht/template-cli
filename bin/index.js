#!/usr/bin/env node
const fs = require("fs-extra");
const { Command } = require("commander");
const path = require("path");
const Table = require("cli-table");
const { generateVanillaWebProject } = require("./templates/index");
const validProjectTypes = ["vanillaWeb", "fullStack"];
const version = "1.0.0";
const features = [
  {
    name: "vanillaWeb",
    description: "Vanilla Web project",
    example: "template-cli.js make vanillaWeb myVanillaProject",
  },
  {
    name: "fullStack-node-react",
    description: "Full Stack project with Node.js and React",
    example:
      "template-cli.js make fullStack-node-react myFullStackReactProject",
  },
  {
    name: "fullStack-node-next",
    description: "Full Stack project with Node.js and Next.js",
    example: "template-cli.js make fullStack-node-next myFullStackNextProject",
  },
  {
    name: "react",
    description: "Generate a React project",
    example: "template-cli.js make react myReactProject",
  },
  {
    name: "node",
    description: "Generate a Node.js project",
    example: "template-cli.js make node myNodeProject",
  },
  {
    name: "next",
    description: "Generate a Next.js project",
    example: "template-cli.js make next myNextProject",
  },
];

const program = new Command();

program
  .version("1.0.0")
  .description("CLI tool for generating boilerplate code")
  .arguments("[command] [projectType] [name]")
  .action(async (command, projectType, name) => {
    if (!command) {
      displayWelcomeMessage();
      return;
    }
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
          displayFeatures();
          break;
        case "help":
          displayFeatures();
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

function displayFeatures() {
  const table = new Table({
    head: ["#", "Command", "Description", "Example"],
    colWidths: [5, 20, 50, 50], // Adjust colWidths as needed
  });

  features.forEach((feature, index) => {
    // Example data for the new column (assuming it's stored in the 'example' property of each feature object)
    const example = feature.example || "-"; // If 'example' is not provided, use a dash (-)

    table.push([index + 1, feature.name, feature.description, example]);
  });

  console.log(table.toString());
}

function displayWelcomeMessage() {
  console.log(`Welcome to template-cli.js!`);
  console.log(`Here are the features:`);
  displayFeatures();
}

program.parse(process.argv);
