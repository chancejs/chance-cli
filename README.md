# Chance CLI

[![Chance Logo](http://chancejs.com/logo.png)](http://chancejs.com)

[![GitHub license](https://img.shields.io/github/license/victorquinn/chancejs-cli.svg)] [![GitHub stars](https://img.shields.io/github/stars/victorquinn/chancejs-cli.svg)](https://github.com/victorquinn/chancejs-cli) [![npm](https://img.shields.io/npm/dm/chance-cli.svg)](https://npmjs.com/package/chance-cli) [![npm](https://img.shields.io/npm/v/chance-cli.svg)](https://npmjs.com/package/chance-cli) [![awesomeness](https://img.shields.io/badge/awesomeness-maximum-red.svg)](https://github.com/victorquinn/chancejs)

Chance CLI - random generator for the command line

Chance documentation: [http://chancejs.com](http://chancejs.com)

## Installation

Install globally so it can be used anywhere on your system:

`npm install -g chance-cli`

Then just use it!

```bash
$ chancesentence
Sikolnul risuz issi ah re gul unagacire mo fu nuuwazek wihnus tagit bolome.
```

## Usage

First invoke it with its keyword, `chance`

Then follow it with the name of the generator you'd like from the [docs](http://chancejs.com)

Then any options follow as flags.

Can optionally pass a seed with the `--seed` flag for repeatable results

```bash
$ chance --seed 23 name
Edna Flores
$ chance --seed 23 name
Edna Flores
```

## Examples

```bash
# Just the generator
$ chance name
Steven Nguyen

# Now add an option
$ chance name --middle_initial true
Ethel M. Barnett

# Now 2 options
$ chance name --middle_initial true --suffix true
Maria C. Daniel Esq.

# Miscellaneous random examples
$ chance floating --min 0 --max 100
11.3463

$ chance ip
35.108.104.238

$ chance hammertime
1770301460334

$ chance twitter
@mekogza

$ chance guid
f76e0aa4-bd9f-5343-b7bf-66572ba5669b
```

## Tips/Tricks

On a Mac? Copy directly from the command line to your clipboard by piping
to `pbcopy` the Mac clipboard utility

```bash
$ chance hash | pbcopy
# d1db9ef9ecee059f528d36c200534f34f474e144 is now your clipboard
```

## Author

### Victor Quinn

<a href="https://twitter.com/victorquinn" class="twitter-follow-button" data-show-count="false" data-size="large">Follow @victorquinn</a> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script> | [GitHub](https://github.com/victorquinn) | [http://victorquinn.com](http://victorquinn.com) | [OneName](https://onename.com/victor)
