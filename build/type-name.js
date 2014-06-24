!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.typeName=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * type-name - Just a reasonable typeof
 * 
 * https://github.com/twada/type-name
 *
 * Copyright (c) 2014 Takuto Wada
 * Licensed under the MIT license.
 *   http://twada.mit-license.org/
 */
'use strict';

var toStr = Object.prototype.toString;

function funcName (f) {
    return f.name ? f.name : /^\s*function\s*([^\(]*)/im.exec(f.toString())[1];
}

function ctorName (obj) {
    var strName = toStr.call(obj).slice(8, -1);
    if (strName === 'Object') {
        return funcName(obj.constructor);
    }
    return strName;
}

function typeName (val) {
    var type;
    if (val === null) {
        return 'null';
    }
    type = typeof(val);
    if (type === 'object') {
        return ctorName(val);
    }
    return type;
}

module.exports = typeName;

},{}]},{},[1])
(1)
});