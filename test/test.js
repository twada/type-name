function Person(name, age) {
    this.name = name;
    this.age = age;
}

var AnonPerson = function(name, age) {
    this.name = name;
    this.age = age;
};

var typeName = require('..'),
    assert = require('assert'),
    fixtures = {
        'string literal': 'hoge',
        'number literal': 5,
        'boolean literal': false,
        'regexp literal': /^not/,
        'array literal': [],
        'function expression': function () {},
        'String object': new String('hoge'),
        'Number object': new Number('3'),
        'Boolean object':new Boolean('1'),
        'Date object': new Date(),
        'RegExp object': new RegExp('^not', 'g'),
        'Array object': new Array(),
        'Function object': new Function('x', 'y', 'return x + y'),
        'Error object': new Error('error!'),
        'user-defined constructor': new Person('alice', 5),
        'anonymous constructor': new AnonPerson('bob', 4),
        'NaN': NaN,
        'Infinity': Infinity,
        'Math': Math,
        'JSON': JSON,
        'arguments object': (function(){ return arguments; })(),
        'null literal': null,
        'undefined value': undefined
    };

describe('typeName of', function () {
    var i, sut, expected, input, tests = [
        ['string literal',           'string'],
        ['number literal',           'number'],
        ['boolean literal',          'boolean'],
        ['regexp literal',           'RegExp'],
        ['array literal',            'Array'],
        ['function expression',      'function'],
        ['String object',            'String'],
        ['Number object',            'Number'],
        ['Boolean object',           'Boolean'],
        ['Date object',              'Date'],
        ['RegExp object',            'RegExp'],
        ['Array object',             'Array'],
        ['Function object',          'function'], // be careful!
        ['Error object',             'Error'],
        ['NaN',                      'number'],
        ['Infinity',                 'number'],
        ['Math',                     'Math'],
        ['JSON',                     'JSON'],
        ['arguments object',         'Arguments'],
        ['user-defined constructor', 'Person'],
        ['anonymous constructor',    ''],
        ['null literal',             'null'],
        ['undefined value',          'undefined']
    ], len = tests.length;

    for(i = 0; i < len; i += 1) {
        sut = tests[i][0];
        expected = tests[i][1];
        input = fixtures[sut];
        it(sut + ' is ' + expected, function () {
            assert.equal(typeName(input), expected);
        });
    }
});
