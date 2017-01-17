webvr-boilerplate
========

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Boilerplate for your WebVR experiences powered by ThreeJS, grunt and ES6.

This boilerplate is based on [Three.js](https://github.com/mrdoob/three.js/) and uses the  [WebVR API](https://developer.mozilla.org/de/docs/Web/API/WebVR_API) to provide you with all the tools needed to create immersive VR-experiences for the Web. It will handle the Api availability check and device detection for you and initializes the corresponding effects and controls for ThreeJS automatically.

The setup uses Grunt as Taskrunner to build your Project and watch for changes and is written in ECMAScript 2015. For older browser support the babelify task will create ECMAScript 5 code for you. 

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

This will build the project and start a local server at http://localhost:1337. Changes in your code are being watched.

```
grunt
```

### serve

This will build your project and minify/uglify code files.

```
grunt build
```

## Start coding

### Configuration

The boilerplate has some cool built-in features which can be configured in the app.js file before running the app:

```javascript
App.config = {

    // To monitor the hardware and data usage of your app, you can simply show a stats monitor.
    // 0: Shows Frames rendered in the last second. The higher the number the better.
    // 1: Shows Milliseconds needed to render a frame. The lower the number the better.
    // 2: Shows MBytes of allocated memory. (Run Chrome with --enable-precise-memory-info)
    // default: false
    SHOW_STATS: 0, 

    // To get smoother graphics use antialising
    // default: false
    ANTIALIAS: true, 

    // To enable the app to open in fullscreen mode you can provide a queryselector to your button.
    // The click of the element will be handled from the app and enable Fullscreen
    // default: undefined
    FULLSCREEN_OPTION: '#fullscreen-button', 

    // To show a warn message if the WebVR-Api is not supported, you can provide a queryselector to your message.
    // The class 'is-visible' will be added when the Api is not supported.
    // default: undefined
    WARN_MESSAGE: '#warn-message',
    
    // To 'fake' the VR-Effect as Three Stereo-Effect you can enable this option.
    // default: false
    FAKE_VR_EFFECT: true, 
    
    //shows a simple crosshair in front of the camera
    //default: false
    SHOW_CROSSHAIR: true

};
```


### Your entry point

Your WebGL Code will be maintained in ``WebGLContent.js``:

- The ``createscene()`` function is called once when the app is loaded (after DOMContentLoaded). Use this to set up your scene.
- The ``animateScene()`` function is called each frame provided by requestAnimationFrame or vrDisplay.requestAnimationFrame (if available).
- Use ``this.options`` to access the camera and renderer throughout the class.

### Globals

Some variables can globally be accessed by using the App module:

- ``App.version`` {string} holds the current app version 
- ``App.config`` {object} holds the App [configuration](#configuration)
- ``App.isMobile`` {boolean} used to identify if a mobile device is used
- ``App.device`` {string} holds the current devicetype

### Devmode

Console logs and warnings are suppressed by default. Append ``?devmode`` to the browser adressfiled to enable devmode.