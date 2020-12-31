/**
 * type-name - Just a reasonable typeof
 *
 * https://github.com/twada/type-name
 *
 * Copyright (c) 2014-2016 Takuto Wada
 * Licensed under the MIT license.
 *   https://github.com/twada/type-name/blob/master/LICENSE
 */
'use strict';

var toStr = {}.toString;

function extractName (obj) {
    var match = /^\s*function\s*([^\(\s]+)/i.exec(obj.constructor.toString());
    return match ? match[1] : '';
}

function ctorName (obj, options) {
    var $default, getName = options.name;
    var name = typeof getName === 'function' ?
        getName(obj) :
        obj.constructor.name;
    if (name) {
        return name;
    } else {
        $default = options['default'] || extractName;
        return typeof $default === 'function' ? $default(obj) : $default;
    }
}

function objectName (obj, options) {
    var name = toStr.call(obj).slice(8, -1);
    if ((name === 'Object' || name === 'Error') && obj.constructor) {
        return ctorName(obj, options);
    } else {
        return name;
    }
}

function typeName (val, options) {
    var type = val === null ? 'null' : typeof val;
    if (type === 'object') {
        return objectName(val, options || {});
    } else {
        return type;
    }
}

module.exports = typeName;
