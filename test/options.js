'use strict';

var assert = require('assert');
var typeName = require('..');

function getDefault (name) {
    return function (value) {
        assert(value);
        assert(value.constructor);
        assert(!value.constructor.name);
        return name;
    };
}

function getName (name) {
    return function (value) {
        assert(value);
        assert(value.constructor);
        return name;
    };
}

describe('options', function ()  {
    it('default (string, anonymous class)', function () {
        var input = new function () { };
        assert.equal(typeName(input), '');
        assert.equal(typeName(input, { 'default': '' }), '');
        assert.equal(typeName(input, { 'default': 'unknown' }), 'unknown');
        assert.equal(typeName(input, { 'default': 'Foo' }), 'Foo');
    });

    it('default (string, named class)', function () {
        var input = new function Foo () { };
        assert.equal(typeName(input), 'Foo');
        assert.equal(typeName(input, { 'default': '' }), 'Foo');
        assert.equal(typeName(input, { 'default': 'unknown' }), 'Foo');
        assert.equal(typeName(input, { 'default': 'Bar' }), 'Foo');
    });

    it('default (function, anonymous class)', function ()  {
        var input = new function () { };
        assert.equal(typeName(input), '');
        assert.equal(typeName(input, { 'default': getDefault('unknown') }), 'unknown');
        assert.equal(typeName(input, { 'default': getDefault('Foo') }), 'Foo');
    });

    it('default (function, named class)', function ()  {
        var input = new function Foo () { };
        assert.equal(typeName(input), 'Foo');
        assert.equal(typeName(input, { 'default': getDefault('') }), 'Foo');
        assert.equal(typeName(input, { 'default': getDefault('unknown') }), 'Foo');
        assert.equal(typeName(input, { 'default': getDefault('Foo') }), 'Foo');
        assert.equal(typeName(input, { 'default': getDefault('Bar') }), 'Foo');
    });

    it('name (anonymous class)', function ()  {
        var input = new function () { };
        assert.equal(typeName(input), '');
        assert.equal(typeName(input, { name: 'Invalid' }), '');
        assert.equal(typeName(input, { name: ['Invalid'] }), '');
        assert.equal(typeName(input, { name: getName('Bar') }), 'Bar');
        assert.equal(typeName(input, { 'default': 'Baz', name: getName('Bar') }), 'Bar');
        assert.equal(typeName(input, { 'default': 'Baz', name: getName('') }), 'Baz');
    });

    it('name (named class)', function ()  {
        var input = new function Foo () { };
        assert.equal(typeName(input), 'Foo');
        assert.equal(typeName(input, { name: 'Invalid' }), 'Foo');
        assert.equal(typeName(input, { name: ['Invalid'] }), 'Foo');
        assert.equal(typeName(input, { name: getName('Bar') }), 'Bar');
        assert.equal(typeName(input, { 'default': 'Bar', name: getName('') }), 'Bar');
        assert.equal(typeName(input, { name: getName('') }), 'Foo');
    });

});
