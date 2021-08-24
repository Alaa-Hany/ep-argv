# ep-argv
Easily parse argument options

deal with of arguments Easily  


# example

``` js
// mergeSingleFlage default is false
let args = require('ep-argv')(process.argv.slice(2) , { mergeSingleFlage : false });
console.log(args);
```

```
$ node parse1.js -a foo -b boo -efg --tes xman --fof=bob
{ $ : [], a: 'foo', b: 'boo' , e :'fg' , 'tes' : 'xman' , 'fof' : 'bob' }
```


``` js
let args = require('ep-argv')(process.argv.slice(2) , { mergeSingleFlage : true });
console.log(args);
```

```
$ node parse.js -x 3  -y 4 -n5 -abc --foofoo=booboo tar zip
{ _: [ 'tar', 'bar', 'zip' ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  foofoo: 'booboo' }
```


# methods

``` js
var parseArgs = require('ep-argv')
```

## var argv = parseArgs(args, options={})

Return an argument object `argv` populated with the array arguments from `args`.

`argv.$` contains all the arguments that didn't have an option associated with
them.

Numeric-looking and Boolean-looking arguments will be returned as primitive (Number, boolean) 


options can be:

  mergeSingleFlage => true or false


# install

With [npm](https://npmjs.org) do:

```
npm install ep-argv
```

# license

MIT

