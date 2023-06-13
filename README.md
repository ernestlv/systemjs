## Micro frontends and Module Federation implementation using systemjs, jquery, knockout & bootstrap web app

Modular reactive (mvvm) web app based on systemjs, jquery, knockout & bootstrap

we used knockout on purpose. Even though there are other modern libraries or frameworks like React or Angular. Knowckout is small and simple and the main goal of the app is to explore the implementation of micro frontends and module federation.

The idea here is to reuse the component architecture defined in react and angular to create a simple & fast single page application but using modern patterns; i.e. micro frontends and module federation.

Here the main piece of the application is the javascript module not the javascript component.

The concept of module is somewhat more relaxed than components because a module can represent a small fragment in a page or an entire page in itself.

The current trend in many web applications is to create multiple bundles that contain an entire set of applications that are aggregated to create a larger application; this is called micro frontends or module federation depending on the way you approach to it. Webpack call it module federation and the idea is to reduce bunlde size by declared shared bundles and minimize server requests to speed up the application. However, micro frontends combined with systemjs follows a different approach that allows us to progressively load javascript modules as they are needed. The former is the approach we initially followed here. 

However, here are some challenges we faced:

1) The challenge is how to handle inter-module communication. As a first approache we did that using observers. You can create observers and have modules to subscribe to them so they can react upon the observe updates.
2) How to handle shared dependencies on this we are explorying the possibility to create a hybrid application that combine webpack module federation approach and micro front-ends.
3) To tweak the application to provide an optimal user experience for the user to not "feel" the application slow since it will be loaded in small fragments (modules). In this sense, there are two important pieces, first define small modules and second leverage the browser cache.

Another goal of this project is to use as much as possible the browser native APIs. With the exception of jquery to manipulate the DOM most of the modules are implemented in plain HTML, CSS and JavaScritp.

The end result is a compact & consisten codebase, with a performant web application.

requires node > 10.0.0

see

-> https://github.com/systemjs/systemjs-examples
-> https://www.syncfusion.com/blogs/post/what-is-webpack-module-federation-and-why-does-it-matter.aspx
-> https://blog.bitsrc.io/module-federation-vs-single-spa-47da53b67ed0
-> https://medium.com/@rkhasawneh/single-spa-with-module-federation-in-systemjs-446f0de4832b
