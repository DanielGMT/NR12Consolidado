# to-upper

> Converts string, as a whole, to upper case.


[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/gearcase/to-upper/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/gearcase/to-upper/master.svg?style=flat-square)](https://travis-ci.org/gearcase/to-upper)
[![coverage:?](https://img.shields.io/coveralls/gearcase/to-upper/master.svg?style=flat-square)](https://coveralls.io/github/gearcase/to-upper)


## Install

```
$ npm install --save to-upper 
```


## Usage

> For more use-cases see the [tests](https://github.com/gearcase/to-upper/blob/master/test/spec/index.js)

```js
var toUpper = require('to-upper');

toUpper('ABC');          // => 'ABC'
toUpper('--foo-bar--');  // => '--FOO-BAR--'
toUpper('fooBar');       // => 'FOOBAR'
toUpper('__foo_bar__');  // => '__FOO_BAR__'
```

## Related

- [to-lower](https://github.com/gearcase/to-lower) - Converts string, as a whole, to lower case.
- [to-integer](https://github.com/gearcase/to-integer) - Converts the given value to an integer.
- [to-num](https://github.com/gearcase/to-num) - Converts the given value to a number.
- [to-str](https://github.com/gearcase/to-str) - Converts the given value to a string.
- [to-length](https://github.com/gearcase/to-length) - Converts value to an integer suitable for use as the length of an array-like object.
- [to-path](https://github.com/gearcase/to-path) - Converts value to a property path array. 
- [to-source-code](https://github.com/gearcase/to-source-code.git) - Converts function to its source code.


## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/gearcase/to-upper/issues/new).
