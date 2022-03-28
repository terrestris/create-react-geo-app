#!/usr/bin/env node

import chalk from 'chalk';
import { Command, OptionValues } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import fetch from 'node-fetch';
import extract from 'extract-zip';

import packageJson from './package.json';

export interface Opts extends OptionValues {
  gitInit?: boolean;
  tag?: string;
};

export const repoUrl = 'https://github.com/terrestris/react-geo-client-template';

export const init = () => {
  let projectName = '';
  let options: Opts = {};

  const programName = Object.keys(packageJson?.bin)[0] || packageJson.name;

  const program = new Command(programName)
    .version(packageJson.version)
    .description('Creates a new react-geo project in the given directory based on a comprehensive template')
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action((name: string, opts: any) => {
      projectName = name;
      options = opts;
    })
    .option('-g, --git-init', 'Whether to init an empty git repository or not', false)
    .option('-t, --tag', 'The react-geo-client-template version/tag', 'main')
    .allowUnknownOption()
    .on('--help', () => {
      console.log(
        `    Only ${chalk.green('<project-directory>')} is required.`
      );
      console.log();
    })
    .parse(process.argv);

  if (!projectName) {
    console.log(`${chalk.red('ERROR!')} Please specify the project directory:`);
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
    );
    console.log();
    console.log('For example:');
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('my-react-geo-app')}`
    );
    console.log();
    console.log(
      `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
  }

  createApp(projectName, options);
};

export const createApp = async (projectName: string, opts: Opts) => {
  const currentDir = process.cwd();
  const projectPath = path.join(currentDir, projectName);

  await downloadTemplate(opts);

  await copyTemplate(projectPath);

  await installTemplateDependencies(projectPath);

  await prepareTemplatePackage(projectPath, projectName);

  if (opts.gitInit) {
    await initGitRepository(projectPath);
  }

  console.log(`${chalk.greenBright('Done! Enjoy!')}`);
};

const downloadTemplate = async (opts: Opts) => {
  try {
    console.log('Downloading the template application');

    const downloadUrl = `${repoUrl}/archive/refs/heads/${opts.tag}.zip`;
    const targetArchive = path.join('/', 'tmp', 'package.zip');

    await download(downloadUrl, targetArchive);
    await extract(targetArchive, { dir: path.join('/', 'tmp') });

    console.log(`${chalk.greenBright('SUCCESS!')}`);
  } catch (error) {
    console.log(`${chalk.bgMagenta('ERROR!')}`);
    console.log(`${error}`);
    process.exit(1);
  }
};

const copyTemplate = async (projectPath: string) => {
  try {
    console.log(`Installing the application to ${chalk.italic(projectPath)}`);

    fs.copySync(path.join('/', 'tmp', 'react-geo-client-template-main'), projectPath);

    console.log(`${chalk.greenBright('SUCCESS!')}`);
  } catch (error) {
    console.log(`${chalk.bgMagenta('ERROR!')}`);
    console.log(`${error}`);
    process.exit(1);
  }
};

const installTemplateDependencies = async (projectPath: string) => {
  try {
    console.log(`Running ${chalk.blueBright('npm install')} in ${chalk.italic(projectPath)}`);

    process.chdir(projectPath);

    execSync('npm install');

    console.log(`${chalk.greenBright('SUCCESS!')}`);
  } catch (error) {
    console.log(`${chalk.bgMagenta('ERROR!')}`);
    console.log(`${error}`);
    process.exit(1);
  }
};

const prepareTemplatePackage = async (projectPath: string, projectName: string) => {
  try {
    console.log('Preparing the package.json');

    const templatePackageJson = fs.readJSONSync(path.join(projectPath, 'package.json'), 'utf8');

    templatePackageJson.name = projectName;
    templatePackageJson.description = 'Bootstrapped with create-react-geo-app';
    templatePackageJson.repository = {
      url: '',
      type: ''
    };

    fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(templatePackageJson, null, 2), 'utf8');

    console.log(`${chalk.greenBright('SUCCESS!')}`);
  } catch (error) {
    console.log(`${chalk.bgMagenta('ERROR!')}`);
    console.log(`${error}`);
    process.exit(1);
  }
};

const initGitRepository = async (projectPath: string) => {
  process.chdir(projectPath);

  try {
    console.log('Initializing an empty git repository');

    execSync('git init');

    console.log(`${chalk.greenBright('SUCCESS!')}`);
  } catch (error) {
    console.log(`${chalk.bgMagenta('ERROR!')}`);
    console.log(`${error}`);
    process.exit(1);
  }
};

const download = async (url: string, name: string) => {
  const res = await fetch(url);
  await new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(name);
    res.body?.pipe(fileStream);
    res.body?.on('error', (err) => {
      reject(err);
    });
    fileStream.on('finish', function() {
      resolve(true);
    });
  });
};

init();
