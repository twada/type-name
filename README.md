type-name
================================

Just a reasonable `typeof`

[![Build Status][ci-image]][ci-url]
[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]


DESCRIPTION
---------------------------------------

`typeName` function returns reasonable type name for input value.

| description    | input   | result      |
|:---------------|:--------|:------------|
| null literal   | `null`  | `'null'`    |
| undefined value | `undefined` | `'undefined'` |
| string literal | `'foo'` | `'string'` |
| number literal | `5` | `'number'` |
| boolean literal | `false` | `'boolean'` |
| regexp literal *(Android 4.1+)* | `/^not/` | `'RegExp'` |
| array literal | `['foo', 4]` | `'Array'` |
| object literal | `{name: 'bar'}` | `'Object'` *(be careful!)* |
| function expression | `function () {}` | `'function'` |
| String object | `new String('foo')` | `'String'` |
| Number object | `new Number('3')` | `'Number'` |
| Boolean object |`new Boolean('1')` | `'Boolean'` |
| Date object | `new Date()` | `'Date'` |
| RegExp object *(Android 4.1+)* | `new RegExp('^not', 'g')` | `'RegExp'` |
| Array object | `new Array()` | `'Array'` |
| Object object | `new Object()` | `'Object'` |
| Function object | `new Function('x', 'y', 'return x + y')` | `'function'` *(be careful!)* |
| Error object | `new Error('error!')` | `'Error'` |
| TypeError object | `new TypeError('type error!')` | `'TypeError'` |
| NaN | `NaN` | `'number'` |
| Infinity | `Infinity` | `'number'` |
| Math | `Math` | `'Math'` |
| JSON *(IE8+)* | `JSON` | `'JSON'` |
| arguments object *(IE9+)*  | `(function(){ return arguments; })()` | `'Arguments'` |
| User-defined constructor | `new Person('alice', 5)` | `'Person'` |
| Anonymous constructor | `new AnonPerson('bob', 4)` | `''` |
| Named class | `new(class Foo { constructor() {} })` | `'Foo'` |
| Anonymous class | `new(class { constructor() {} })` | `''` |
| Symbol | `Symbol("FOO")` | `'symbol'` |
| Promise | `Promise.resolve(1)` | `'Promise'` |


EXAMPLE
---------------------------------------

```javascript
const typeName = require('type-name');
const assert = require('assert');

assert(typeName(null) === 'null');
assert(typeName(undefined) === 'undefined');
assert(typeName('foo') === 'string');
assert(typeName(5) === 'number');
assert(typeName(false) === 'boolean');
assert(typeName(/^not/) === 'RegExp');
assert(typeName(['foo', 4]) === 'Array');
assert(typeName({name: 'bar'}) === 'Object');
assert(typeName(function () {}) === 'function');
assert(typeName(new String('foo')) === 'String');
assert(typeName(new Number('3')) === 'Number');
assert(typeName(new Boolean('1')) === 'Boolean');
assert(typeName(new Date()) === 'Date');
assert(typeName(new RegExp('^not', 'g')) === 'RegExp');
assert(typeName(new Array()) === 'Array');
assert(typeName(new Object()) === 'Object');
assert(typeName(new Function('x', 'y', 'return x + y')) === 'function');
assert(typeName(new Error('error!')) === 'Error');
assert(typeName(new TypeError('type error!')) === 'TypeError');
assert(typeName(NaN) === 'number');
assert(typeName(Infinity) === 'number');
assert(typeName(Math) === 'Math');
assert(typeName(JSON) === 'JSON'); // IE8+
assert(typeName((function(){ return arguments; })()) === 'Arguments');  // IE9+
assert(typeName(Symbol("FOO")) === 'symbol');
assert(typeName(Promise.resolve(1)) === 'Promise');

function Person(name, age) {
    this.name = name;
    this.age = age;
}

const AnonPerson = function(name, age) {
    this.name = name;
    this.age = age;
};

assert(typeName(new Person('alice', 5)) === 'Person');
assert(typeName(new AnonPerson('bob', 4)) === '');

assert(typeName(new(class Foo { constructor() {} })) === 'Foo');
assert(typeName(new(class { constructor() {} })) === '');
```


INSTALL
---------------------------------------

    $ npm install --save type-name


USAGE
---------------------------------------

```javascript
const typeName = require('type-name');
console.log(typeName(anyVar));
```


AUTHOR
---------------------------------------
* [Takuto Wada](https://github.com/twada)


CONTRIBUTORS
---------------------------------------
* [azu](https://github.com/azu)
* [Yosuke Furukawa](https://github.com/yosuke-furukawa)
* [Athan](https://github.com/kgryte)
* [Andrew Moss](https://github.com/inversion)


LICENSE
---------------------------------------
Licensed under the [MIT](https://github.com/twada/type-name/blob/master/LICENSE) license.


[npm-url]: https://npmjs.org/package/type-name
[npm-image]: https://badge.fury.io/js/type-name.svg

[ci-image]: https://github.com/twada/type-name/workflows/Node.js%20CI/badge.svg
[ci-url]: https://github.com/twada/type-name/actions?query=workflow%3A%22Node.js+CI%22

[license-url]: https://github.com/twada/type-name/blob/master/LICENSE
[license-image]: https://img.shields.io/badge/license-MIT-brightgreen.svg
