'use strict';

const assert = require('assert');
const typeName = require('..');

describe('ES6 features', () => {

    it('anonymous class', () => {
        const input = new(class { constructor() {} });
        assert.equal(typeName(input), '');
    });

    it('named class', () => {
        const input = new(class Foo { constructor() {} });
        assert.equal(typeName(input), 'Foo');
    });

});
