'use strict';

const assert = require('assert');
const typeName = require('..');

const getDefault = name => value => {
    assert(value);
    assert(value.constructor);
    assert(!value.constructor.name);
    return name;
};

const getName = name => value => {
    assert(value);
    assert(value.constructor);
    return name;
};

describe('options (ES6)', () => {
    it('default (string, anonymous class)', () => {
        const input = new class { };
        assert.equal(typeName(input), '');
        assert.equal(typeName(input, { 'default': '' }), '');
        assert.equal(typeName(input, { 'default': 'unknown' }), 'unknown');
        assert.equal(typeName(input, { 'default': 'Foo' }), 'Foo');
    });

    it('default (string, named class)', () => {
        const input = new class Foo { };
        assert.equal(typeName(input), 'Foo');
        assert.equal(typeName(input, { 'default': '' }), 'Foo');
        assert.equal(typeName(input, { 'default': 'unknown' }), 'Foo');
        assert.equal(typeName(input, { 'default': 'Bar' }), 'Foo');
    });

    it('default (function, anonymous class)', () => {
        const input = new class { };
        assert.equal(typeName(input), '');
        assert.equal(typeName(input, { 'default': getDefault('unknown') }), 'unknown');
        assert.equal(typeName(input, { 'default': getDefault('Foo') }), 'Foo');
    });

    it('default (function, named class)', () => {
        const input = new class Foo { };
        assert.equal(typeName(input), 'Foo');
        assert.equal(typeName(input, { 'default': getDefault('') }), 'Foo');
        assert.equal(typeName(input, { 'default': getDefault('unknown') }), 'Foo');
        assert.equal(typeName(input, { 'default': getDefault('Foo') }), 'Foo');
        assert.equal(typeName(input, { 'default': getDefault('Bar') }), 'Foo');
    });

    it('name (anonymous class)', () => {
        const input = new class { };
        assert.equal(typeName(input), '');
        assert.equal(typeName(input, { name: 'Invalid' }), '');
        assert.equal(typeName(input, { name: ['Invalid'] }), '');
        assert.equal(typeName(input, { name: getName('Bar') }), 'Bar');
        assert.equal(typeName(input, { 'default': 'Baz', name: getName('Bar') }), 'Bar');
        assert.equal(typeName(input, { 'default': 'Baz', name: getName('') }), 'Baz');
    });

    it('name (named class)', () => {
        const input = new class Foo { };
        assert.equal(typeName(input), 'Foo');
        assert.equal(typeName(input, { name: 'Invalid' }), 'Foo');
        assert.equal(typeName(input, { name: ['Invalid'] }), 'Foo');
        assert.equal(typeName(input, { name: getName('Bar') }), 'Bar');
        assert.equal(typeName(input, { 'default': 'Bar', name: getName('') }), 'Bar');
        // XXX the scraper doesn't parse "class Foo {}"
        assert.equal(typeName(input, { name: getName('') }), '');
    });

});
