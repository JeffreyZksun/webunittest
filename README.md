Introduction
====

Unit test is very important for a web application. The potential regression can be found in early stage by the help of unit test. 

[Karma](http://karma-runner.github.io/) is a test runner. It can work with the exiting test frameworks, like [Mocha](https://mochajs.org/), Jasmine. You can write the test cases based on the test framework. It is also straightforward to move the existing test cases into the Karma. 

The unit test should be run inside the real browsers. We can test the compatibility issue on different js engines. Karma can start the real browsers and execute the test cases in them. 

When execute the unit test, Karma will start a web server. It calls [karma-xxx-launcher](https://github.com/karma-runner?utf8=%E2%9C%93&query=launcher) to start the corresponding browsers to execute the test cases. Finally summarize the test results. The launcher is a bridge between Karma and the real browsers.

The browsers, like Chrome, Safari, only available on the OS with GUI supported. We also want the unit test can be ran on the build machine which is normally a linux os without GUI. [SlimerJS](https://slimerjs.org/) and [PhantomJS](http://phantomjs.org/) are js engine based on Gecko and webkit respectively. They can be used in this case. There are also the launcher for them.

One difficulty of the unit test frame is to simulate the running environment required by tested code. [Sinon.JS](https://github.com/cjohansen/Sinon.JS) is a library to meet this requirement. It is used to create the fake objects to simulated the real running environment.

Unit test framework
====
Next I will implement a minimum unit test framework with Karma. In the example, I create the test cases for the exiting macrocache library. 

The folder structure is as below.

	webunittest
		|-node_modules
		|	|-microcache
		|		|-microcache.js
		|-test
			|-karma.conf.js
			|-microcache.spec.js
		|-package.json


Get the example code from github: [webunittest](https://github.com/JeffreyZksun/webunittest)

karma.conf.js
----
Karma loads the configuration from the js file to run the test cases. The full configuration is pasted below. The comments explains of the meaning of each property. You can get the details from the official documentation [here](http://karma-runner.github.io/0.13/config/configuration-file.html).

You can use the command line below to start the test runner. if `--browsers` is specified, the browser setting in the configuration file will be overridden. 

	$ karma start karma.conf.js
	$ karma start karma.conf.js --browsers Chrome,Safari

.

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

microcache.spec.js
----
This file contains the test cases for the microcache library. The test case is based on the mocha framework. Since mocha and chai are injected to the global namespace, we can use them directly.

It is recommended to use suffix .spec.js as the name of the test files. It would be convenient to search all the test files with the pattern `*.spec.js` in the configuration file.

	// Test spec for microcache library
	// The mocah, chai, sinon are injected as global variables. Use them without require.
	
	describe('Microcache', function() {
	    it('contains should return true', function() {
	        var cache = new MicroCache();
	        cache.set("user", "jeffrey")
	        var result = cache.contains("user");
	        result.should.equal(true);
	    });
	    it('get should return the value', function() {
	        var cache = new MicroCache();
	        cache.set("user", "jeffrey")
	        var result = cache.get("user");
	        result.should.equal("jeffrey");
	    });
	});

package.json
----
The package.json defines the dependencies required to run the tests. `npm install` can install all the dependencies.

	{
	  "name": "webunittest",
	  "version": "0.1.0",
	  "description": "Demo the Karma framework",
	  "main": "index.js",
	  "scripts": {
	    "test": "node_modules/karma/bin/karma start test/karma.conf.js --browsers Chrome,Safari",
	    "testci": "node_modules/karma/bin/karma start test/karma.conf.js --browsers PhantomJS"
	  },
	  "repository": {
	    "type": "git",
	    "url": ""
	  },
	  "author": "Jeffrey Sun",
	  "license": "MIT",
	  "dependencies": {
	    "microcache": "^1.0.0"
	  },
	  "devDependencies": {
	    "chai": "^3.0.0",
	    "karma": "^0.13.8",
	    "karma-chai": "^0.1.0",
	    "karma-chrome-launcher": "^0.1.12",
	    "karma-firefox-launcher": "^0.1.6",
	    "karma-mocha": "^0.1.10",
	    "karma-phantomjs-launcher": "^0.2.1",
	    "karma-safari-launcher": "^0.1.1",
	    "karma-sinon": "^1.0.4",
	    "mocha": "^2.2.5",
	    "phantomjs": "^1.9.18",
	    "sinon": "^1.15.4"
	  }
	}

Run the test cases
----
The unit test can run on both GUI and no-GUI OS. You need to install browsers like Chrome, Safari manually. All other dependencies can be installed via `npm install`. 

In the current configuration, `npm test` will execute the test cases in Chrome and Safari. It is suitable to use it on Mac and Windows. `npm testci` will execute the test cases in PhantomJS. It is suitable to use it on linux build machine.


	Install the browsers, like Chrome, Safari.
	$ cd /path/to/repo
	$ npm install
	$ npm test (Run this on the environment with GUI OS)
	$ npm run testci (Run this on the environment without GUI OS)

The test results are as below.


	$ npm test
	
	> webunittest@0.1.0 test /Users/jeffreysun/sunzhongkui/github/webunittest
	> node_modules/karma/bin/karma start test/karma.conf.js --browsers Chrome,Safari
	
	11 08 2015 12:34:15.085:INFO [karma]: Karma v0.13.8 server started at http://localhost:9876/
	11 08 2015 12:34:15.091:INFO [launcher]: Starting browser Chrome
	11 08 2015 12:34:15.096:INFO [launcher]: Starting browser Safari
	11 08 2015 12:34:15.837:INFO [Chrome 42.0.2311 (Mac OS X 10.9.4)]: Connected on socket abecMhyc6qG5ulXoAAAA with id 27161714
	Chrome 42.0.2311 (Mac OS X 10.9.4): Executed 2 of 2 SUCCESS (0.005 secs / 0 secs)
	11 08 2015 12:34:16.624:INFO [Safari 7.0.5 (Mac OS X 10.9.4)]: Connected on sockChrome 42.0.2311 (Mac OS X 10.9.4): Executed 2 of 2 SUCCESS (0.005 secs / 0 secsChrome 42.0.2311 (Mac OS X 10.9.4): Executed 2 of 2 SUCCESS (0.005 secs / 0 secsChrome 42.0.2311 (Mac OS X 10.9.4): Executed 2 of 2 SUCCESS (0.005 secs / 0 secsChrome 42.0.2311 (Mac OS X 10.9.4): Executed 2 of 2 SUCCESS (0.005 secs / 0 secs)
	Safari 7.0.5 (Mac OS X 10.9.4): Executed 2 of 2 SUCCESS (0.004 secs / 0.001 secs)
	TOTAL: 4 SUCCESS

.


	$ npm run testci
	
	> webunittest@0.1.0 testci /Users/jeffreysun/sunzhongkui/github/webunittest
	> node_modules/karma/bin/karma start test/karma.conf.js --browsers PhantomJS
	
	11 08 2015 12:33:59.167:INFO [karma]: Karma v0.13.8 server started at http://localhost:9876/
	11 08 2015 12:33:59.172:INFO [launcher]: Starting browser PhantomJS
	11 08 2015 12:33:59.985:INFO [PhantomJS 1.9.8 (Mac OS X 0.0.0)]: Connected on socket ZftXGBg70B-vd97hAAAA with id 30773707
	PhantomJS 1.9.8 (Mac OS X 0.0.0): Executed 2 of 2 SUCCESS (0.004 secs / 0.001 secs)

Tools/Libraries
====
This section describes the tools and libraries used in the test framework.

 - [Karma](http://karma-runner.github.io/) is a test runner to execute JavaScript code in multiple real browsers. It spawns a web server that executes source code against test code for each of the browsers connected. It collects the tests from all the browsers and generates the test report. It can work with most of the common testing frameworks (such as Jasmine, Mocha, QUnit).
 - [Mocha](https://mochajs.org/) is a feature-rich JavaScript test framework running on Node.js and the browser. The test cases are written under this test framework.
 - [Chai](http://chaijs.com/ "chai") is a BDD / TDD assertion library for node and the browser. It provides the interfaces like should, expect and assert. It is used to validate the test results.
 - [PhantomJS](http://phantomjs.org/) is a headless WebKit scriptable with a JavaScript API. It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG. It runs on top of the Firefox browser engine webkit. It can be used to run the unit test without the browser GUI.
 - [SlimerJS](https://slimerjs.org/) allows you to interact with a web page through an external JS script. Its features are similiar with phantomjs. It runs on top of the Firefox browser engine Gecko. It can be used to run the unit test without the browser GUI.
 - [Sinon.JS](https://github.com/cjohansen/Sinon.JS) is a standalone test spies, stubs and mocks for JavaScript. It is used to create the fake objects for the tested code.
 - [karma-mocha](https://github.com/karma-runner/karma-mocha) is an adapter for the mocha test framework. It injects the mocha interfaces into the test environment. You can use the key worlds like `describe` in the test script directly. The test report will send back to karma.
 - [karma-chai](https://github.com/xdissent/karma-chai) is an adapter for chai. It injects the mocha interfaces into the test environment. You can use the key worlds like `should`, `expect`, `asset` in the test script directly without requiring this module explicitly.
 - [karma-sinon](https://github.com/yanoosh/karma-sinon) is an adapter for sinon. It injects the mocha interfaces into the test environment. you can use the key word `sinon` directly in the test cases.
 - [karma-xxx-launcher](https://github.com/karma-runner?utf8=%E2%9C%93&query=launcher) is a plugin to launch the real browser, run the test cases inside browser and returns the test results back to karma. Multiple browser engines are supported as below. 
	 - karma-phantomjs-launcher
	 - karma-slimerjs-launcher
	 - karma-chrome-launcher
	 - karma-opera-launcher
	 - karma-ie-launcher
	 - karma-firefox-launcher
	 - karma-safari-launcher
	 - karma-browserstack-launcher
