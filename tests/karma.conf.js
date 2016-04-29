// Karma configuration

module.exports = function(config) {

    'use strict';

    config.set({

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        // as well as any additional frameworks (requirejs/chai/sinon/...)
        frameworks: [
            'jasmine'
        ],

        files: [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            //'src/dist/angular-avatar.js',
            'dist/angular-avatar.js',
            'tests/*.js'
        ],

        exclude: [ ],

        browsers: [
            'PhantomJS'
        ],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],

        junitReporter: {
            outputFile: 'tests_out/unit.xml',
            suite: 'unit'
        }

    });
};
