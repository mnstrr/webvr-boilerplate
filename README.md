webvr-boilerplate
========

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Boilerplate for your ThreeJS WebVR experiences powered by grunt and ES6.

This boilerplate is based on [Three.js](https://github.com/mrdoob/three.js/) and uses the  [WebVR API](https://developer.mozilla.org/de/docs/Web/API/WebVR_API) to provide you with all the tools needed to create immersive VR-experiences for the Web. The setup uses Grunt as Taskrunner to build your Project and watch for changes. The whole project is written in ECMA Script 6, for older browser support browserify and babelify will create ECMASCRIPT 5 code for you. 

## Version
Current version="0.0.1"

## Requirements for development

* NodeJS (>= 5.9.0)
* Grunt

## Getting started

### clone

Clone this project in your favorite destination.

```
git clone https://github.com/mnstrr/webvr-boilerplate.git
```

### install

Install all development dependencies from npm.

```
npm install
```

### run local

This will build the project and start a local server. Changes in your code are being watched.

```
grunt
```

### serve

This will build your project and minify/uglify code files.

```
grunt build
```