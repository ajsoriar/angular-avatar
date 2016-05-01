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
        
            //'bower_components/angular/angular.min.js',
            //'bower_components/angular-mocks/angular-mocks.js',

            /* We are testing now using version 1.4.5 of angular.js and angular-mocks.js. Version 1.5.0 and 1.5.5 break tests due to some kind of $injector:modulerr? error: Failed to instantiate module ng */

            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',

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
