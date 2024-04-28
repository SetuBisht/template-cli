#!/usr/bin/env node
const fs = require("fs-extra");
const { Command } = require("commander");
const path = require("path");
const Table = require("cli-table");
const {
  generateVanillaWebProject,
  generateNode,
  generateReact,
  generateNext,
  generateFullStackNodeReact,
  generateFullStackNodeNext,
} = require("./templates/index");
const validProjectTypes = ["vanillaWeb", "fullStack", "node", "react", "next"];

const version = "1.0.0";

const features = [
  {
    name: "vanillaWeb",
    description: "Vanilla Web project",
    example: "template-cli.js make vanillaWeb <name>",
  },
  {
    name: "fullStack-node-react",
    description: "Full Stack project with Node.js and React",
    example: "template-cli.js make fullStack-node-react <name>",
  },
  {
    name: "fullStack-node-next",
    description: "Full Stack project with Node.js and Next.js",
    example: "template-cli.js make fullStack-node-next <name>",
  },
  {
    name: "react",
    description: "Generate a React project",
    example: "template-cli.js make react <name>",
  },
  {
    name: "node",
    description: "Generate a Node.js project",
    example: "template-cli.js make node <name> <dependencies>",
  },
  {
    name: "next",
    description: "Generate a Next.js project",
    example: "template-cli.js make next <name> <dependencies>",
  },
];

const program = new Command();

program
  .version("1.0.0")
  .description("CLI tool for generating boilerplate code")
  .arguments("[command] [projectType] [name],[...dependencies]")
  .action(async (command, projectType, name, ...dependencies) => {
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
          await generateProject(projectType, name, dependencies || []);
          break;
        case "features":
          displayFeatures();
          break;
        case "help":
          displayFeatures();
          break;
        default:
          console.error(
            `Invalid command. Supported commands: use "help" to see all features`
          );
      }
    } catch (error) {
      console.error("Error generating boilerplate:", error);
    }
  });

program.option("-currentVersion,-cv", "Output the version number", () => {
  console.log(version);
  process.exit(0); // Exit after printing version
});

async function generateProject(projectType, name, dependencies) {
  const projectDir = path.join(process.cwd(), name);
  // Create directory for the project
  await fs.mkdir(projectDir);
  // Create files inside the directory
  if (projectType === "vanillaWeb") {
    await generateVanillaWebProject(projectDir, name);
  }
  if (projectType === "node") {
    await generateNode(projectDir, name, dependencies);
  }
  if (projectType === "react") {
    await generateReact(projectDir, name, dependencies);
  }
  if (projectType === "next") {
    await generateNext(projectDir, name, dependencies);
  }
  if (projectType === "fullStack-node-next") {
    await generateFullStackNodeNext(projectDir, name, dependencies);
  }
  if (projectType === "fullStack-node-react") {
    await generateFullStackNodeReact(projectDir, name, dependencies);
  }
  console.log(`${projectType} project generated successfully!`);
}

function displayFeatures() {
  const table = new Table({
    head: ["#", "Command", "Description", "Example"],
    colWidths: [3, 22, 45, 50],
  });

  features.forEach((feature, index) => {
    const example = feature.example || "-";
    table.push([index + 1, feature.name, feature.description, example]);
  });
  console.log(table.toString());
}

function displayWelcomeMessage() {
  console.log("Welcome to template-cli.js!");
  console.log(`Here are the features:`);
  displayFeatures();
}

program.parse(process.argv);
