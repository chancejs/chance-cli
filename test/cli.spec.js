'use strict';

const expect = require('chai').expect;
const spawn = require('child_process').spawn;

const Chance = require('chance');

const configurations = [
  makeConfiguration('23', 'string', { }),
  makeConfiguration('23', 'string', { length: 11 }),
  makeConfiguration('23', 'name', { }),
  makeConfiguration('23', 'name', { middle_initial: true }),
  makeConfiguration('23', 'name', { suffix: true }),
  makeConfiguration('23', 'age', { }),
  makeConfiguration('23', 'ip', { }),
  makeConfiguration('23', 'twitter', { }),
  makeConfiguration('23', 'guid', { }),
  makeConfiguration('23', 'country', { })
];

describe('Output', () => {
  configurations.forEach((config) => {
    it(`matches Chance result for \`${config.commandLine}\``, (done) => {
      const expectedResult = chance(config.seed, config.name, config.options);
      executeWithExpectedOutput(config.args, String(expectedResult), done);
    });
  });
});

function chance(seed, generator, options) {
  return Chance(seed)[generator](options);
}

function executeWithExpectedOutput(args, expectedOutput, done) {
  execute(args, (code, output) => {
    expect(code).to.equal(0);
    expect(output).to.equal(expectedOutput);
    done();
  });
}

function makeConfiguration(seed, name, options) {
  const argsWithoutSeed = [ name ].concat(makeCommandArguments(options));
  const args = ['--seed', seed].concat(argsWithoutSeed);
  const commandLine = argsWithoutSeed.join(' ');

  return {
    seed: seed,
    name: name,
    options: options,
    args: args,
    commandLine: commandLine
  }
}

function makeCommandArguments(options) {
  const result = [];
  for (const propertyName in options) {
    if (options.hasOwnProperty(propertyName)) {
      result.push('--' + propertyName);
      result.push(String(options[propertyName]));
    }
  }
  return result;
}

function execute(args, onFinished) {
  const app = spawn("node", ['index.js'].concat(args));

  let output = '';

  app.stdout.on('data', (data) => {
    output += data;
  });

  app.stderr.on('data', (data) => {
    output += data;
  });

  app.on('close', (code) => {
    onFinished(code, output);
  });
}
