#!/bin/sh

if [ "$TRAVIS_NODE_VERSION" -a "$TRAVIS_NODE_VERSION" != "0.10" -a "$TRAVIS_NODE_VERSION" != "0.12" ]
then
    $(npm bin)/mocha test/*.es6
fi
