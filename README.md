# systemjs, jquery, knockout & bootstrap web app

modular mvvm web app based on systemjs, jquery, knockout & bootstrap

we used knockout on purpose. Even though there are other libraries or frameworks like react or angular. Knowckout is small and simple.

The idea here is to mimic the component architecture in react and angular to create a simple & fast single page application using modern patterns.

Here the main piece of the application is the javascript module not the javascript component.

The concept of module is somewhat more relaxed than components because a module can represent a small fragment in a pager or an entire page in itself.

The challenge is how to handle inter-module communication. As a first approache we did that using observers. You can create observers and have modules to subscribe to them so they can react upon the observe updates.

Additionally, we use systemjs instead of webpack. The current trend in many web applications is to create bundles that contain the entire application. With webpack bundles the idea is to minimize server requests to speed up the application. We took a different approach using systemjs to progressively load javascript modules as they are needed. Here the challenge is to tweak the application to provide an optimal user experience for the user to not "feel" the application slow since it will be loaded in small fragments (modules). In this sense, there are two important pieces, first define small modules and second leverage the browser cache.

Another goal of this project is to use as much as possible the browser native APIs. With the exception of jquery to manipulate the DOM most of the modules are implemented in plain HTML, CSS and JavaScritp.

The end result is a compact & consisten codebase, with a performant web application.

requires node > 10.0.0

see

-> https://github.com/systemjs/systemjs-examples
