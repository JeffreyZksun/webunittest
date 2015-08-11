// Karma configuration

module.exports = function(config) {
  config.set({

    // basePath is used to resolve all patterns (eg. files, exclude)
    // If it is a relative path, it gets resolved to the directory where the configration file is located.
    basePath: '',


    // Inject the frameworks to the test environment as the global variables.
    // They can be used directly in the test code without the require statement.
    frameworks: ['mocha', 'chai', 'sinon'],


    // List the files to be loaded into browser.
    // Both the tested code and test cases should be included.
    // In this example, we run unit tests for the microcache library.
    files: [
      '../node_modules/microcache/microcache.js',
      './*.spec.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // The port where the web server will listen.
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Specify the browsers to run the test case.
    // It can be overridden by the command line.
    // karma start --browsers Firefox
    browsers: ['Chrome', 'Safari', 'PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
