function Person(name, age) {
    this.name = name;
    this.age = age;
}

var AnonPerson = function(name, age) {
    this.name = name;
    this.age = age;
};

var typeName = require('..'),
    woothee = require('woothee'),
    assert = require('assert'),
    fixtures = {
        'string literal': 'foo',
        'number literal': 5,
        'boolean literal': false,
        'regexp literal': /^not/,
        'array literal': ['foo', 4],
        'object literal': {name: 'bar'},
        'function expression': function () {},
        'String object': new String('foo'),
        'Number object': new Number('3'),
        'Boolean object':new Boolean('1'),
        'Date object': new Date(),
        'RegExp object': new RegExp('^not', 'g'),
        'Array object': new Array(),
        'Object object': new Object(),
        'Function object': new Function('x', 'y', 'return x + y'),
        'Error object': new Error('error!'),
        'TypeError object': new TypeError('type error!'),
        'RangeError object': new RangeError('range error!'),
        'user-defined constructor': new Person('alice', 5),
        'anonymous constructor': new AnonPerson('bob', 4),
        'NaN': NaN,
        'Infinity': Infinity,
        'Math': Math,
        'null literal': null,
        'undefined value': undefined
    };

function addJsonSuite (tests, fixtures) {
    if (typeof JSON === 'undefined') {
        return;
    }
    fixtures['JSON'] = JSON;
    if (typeof navigator !== 'undefined' && navigator.userAgent) {
        var ua = woothee.parse(navigator.userAgent);
        if (ua.name === 'Internet Explorer' && (ua.version === '6.0' || ua.version === '7.0')) {
            tests.push(['JSON', 'Object']);
            return;
        }
    }
    tests.push(['JSON', 'JSON']);
}

function tweakRegExpSuite (tests) {
    if (typeof navigator !== 'undefined' && navigator.userAgent) {
        var ua = woothee.parse(navigator.userAgent);
        if (ua.os === 'Android' && ua.version === '4.0') {
            tests.push(['regexp literal', 'function']);
            tests.push(['RegExp object',  'function']);
            return;
        }
    }
    tests.push(['regexp literal', 'RegExp']);
    tests.push(['RegExp object',  'RegExp']);
}

describe('typeName of', function () {
    var i, tests = [
        ['string literal',           'string'],
        ['number literal',           'number'],
        ['boolean literal',          'boolean'],
        ['array literal',            'Array'],
        ['object literal',           'Object'], // be careful!
        ['function expression',      'function'],
        ['String object',            'String'],
        ['Number object',            'Number'],
        ['Boolean object',           'Boolean'],
        ['Date object',              'Date'],
        ['Array object',             'Array'],
        ['Object object',            'Object'],
        ['Function object',          'function'], // be careful!
        ['Error object',             'Error'],
        ['TypeError object',         'TypeError'],
        ['RangeError object',        'RangeError'],
        ['NaN',                      'number'],
        ['Infinity',                 'number'],
        ['Math',                     'Math'],
        ['user-defined constructor', 'Person'],
        ['anonymous constructor',    ''],
        ['null literal',             'null'],
        ['undefined value',          'undefined']
    ];
    addJsonSuite(tests, fixtures);
    tweakRegExpSuite(tests);

    for(i = 0; i < tests.length; i += 1) {
        (function(idx){
            var sut = tests[idx][0],
                expected = tests[idx][1],
                input = fixtures[sut];
            it(sut + ' is ' + expected, function () {
                assert.equal(typeName(input), expected);
            });
        })(i);
    }
});
