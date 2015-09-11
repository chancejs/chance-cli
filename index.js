#!/usr/bin/env node

var Chance = require('chance');
var argv = require('minimist')(process.argv.slice(2), { string:'pool' });
var chalk = require('chalk');
var R = require('ramda');

var program = require('commander');

console.log('SNTH', process.argv);

program
    .version('0.0.1')
    .option('-s, --seed [seed]', 'seed for the random number generator')
    .arguments('<generator> [args...]')
    .action(function(generator, args, program) {
        var chance = program.seed ? Chance(program.seed) : Chance();

        var result = null;
        var error = null;
        console.log('generator: ', generator);
        console.log('args: ', args);
        var options = require('minimist')(program.rawArgs.slice(3), { string: 'pool' });

        // Note, this is potentially dangerous as it prevents users from having
        // option values that are "true" and "false" but likely does more harm
        // than good. Unless we want to parse each option explicitly, which would
        // require this CLI knowing more about the internals of Chance, this is
        // the best we can probably do for now. And since the majority of options
        // are boolean, seems better to get them right and disallow "true" and
        // "false" than to get them wrong and allow those as option values.

        // Remove this minimist quirk
        delete options["_"];
        options = R.mapObj(function(item) {
            if (item === 'true') {
                return true;
            } else if (item === 'false') {
                return false;
            } else if (parseFloat(item, 10) !== NaN) {
                return parseFloat(item);
            } else {
                return item;
            }
        }, options);

        if (generator && chance[generator]) {
            result = chance[generator](options);
        } else if (generator === undefined) {

        } else {
            error = 'Chance: unknown generator "' + generator + '"';
        }

        if (error !== null) {
            if (process.stdout.istty) {
                error = chalk.red(error);
            }
            process.stderr.write(error);
        } else {
            // We can only print out a string, so cast if number
            if (!R.is(String, result)) {
                result = String(result);
            }
            process.stdout.write(result);
        }
    })
    .parse(process.argv);

console.log('SNTH', program.args.length);
if (program.args.length < 1) {
    process.stderr.write('Chance: you must supply a generator');
}
