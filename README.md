type-name
================================

[![Build Status](https://travis-ci.org/twada/type-name.svg?branch=master)](https://travis-ci.org/twada/type-name)
[![NPM version](https://badge.fury.io/js/type-name.svg)](http://badge.fury.io/js/type-name)
[![Dependency Status](https://gemnasium.com/twada/type-name.svg)](https://gemnasium.com/twada/type-name)
[![browser support](https://ci.testling.com/twada/type-name.png)](https://ci.testling.com/twada/type-name)

Just a reasonable type name


DESCRIPTION
---------------------------------------

`typeName` function returns reasonable type name for input.

| description    | input   | result      |
|:---------------|:--------|:------------|
| string literal | `'hoge'` | `'string'` |
| number literal | `5` | `'number'` |
| boolean literal | `false` | `'boolean'` |
| regexp literal | `/^not/` | `'RegExp'` |
| array literal | `[]` | `'Array'` |
| function expression | `function () {}` | `'function'` |
| String object | `new String('hoge')` | `'String'` |
| Number object | `new Number('3')` | `'Number'` |
| Boolean object |`new Boolean('1')` | `'Boolean'` |
| Date object | `new Date()` | `'Date'` |
| RegExp object | `new RegExp('^not', 'g')` | `'RegExp'` |
| Array object | `new Array()` | `'Array'` |
| Function object | `new Function('x', 'y', 'return x + y')` | `'function'` *(be careful!)* |
| Error object | `new Error('error!')` | `'Error'` |
| user-defined constructor | `new Person('alice', 5)` | `'Person'` |
| anonymous constructor | `new AnonPerson('bob', 4)` | `''` |
| NaN | `NaN` | `'number'` |
| Infinity | `Infinity` | `'number'` |
| Math | `Math` | `'Math'` |
| JSON | `JSON` | `'JSON'` |
| arguments object | `(function(){ return arguments; })()` | `'Arguments'` |
| null literal | `null` | `'null'` |
| undefined value | `undefined` | `'undefined'` |


EXAMPLE
---------------------------------------

```javascript
var typeName = require('type-name'),
    assert = require('assert');

function Person(name, age) {
    this.name = name;
    this.age = age;
}

var AnonPerson = function(name, age) {
    this.name = name;
    this.age = age;
};

assert(typeName('hoge') === 'string');
assert(typeName(5) === 'number');
assert(typeName(false) === 'boolean');
assert(typeName(/^not/) === 'RegExp');
assert(typeName([]) === 'Array');
assert(typeName(function () {}) === 'function');
assert(typeName(new String('hoge')) === 'String');
assert(typeName(new Number('3')) === 'Number');
assert(typeName(new Boolean('1')) === 'Boolean');
assert(typeName(new Date()) === 'Date');
assert(typeName(new RegExp('^not', 'g')) === 'RegExp');
assert(typeName(new Array()) === 'Array');
assert(typeName(new Function('x', 'y', 'return x + y')) === 'function');
assert(typeName(new Error('error!')) === 'Error');
assert(typeName(new Person('alice', 5)) === 'Person');
assert(typeName(new AnonPerson('bob', 4)) === '');
assert(typeName(NaN) === 'number');
assert(typeName(Infinity) === 'number');
assert(typeName(Math) === 'Math');
assert(typeName(JSON) === 'JSON');
assert(typeName((function(){ return arguments; })()) === 'Arguments');
assert(typeName(null) === 'null');
assert(typeName(undefined) === 'undefined');
```


HOW TO USE
---------------------------------------

    $ npm install --save type-name

or

    $ bower install --save type-name


AUTHOR
---------------------------------------
* [Takuto Wada](http://github.com/twada)


LICENSE
---------------------------------------
Licensed under the [MIT](http://twada.mit-license.org/) license.
