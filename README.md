![Observers](http://wiki.teamliquid.net/starcraft/images2/d/d3/Observer.png)

[Official sound effects](https://www.youtube.com/watch?v=2e0CRuS14ho)

Observers listen to EventEmitters. This is useful so that when you destroy the observer, it can remove all its listeners.

Inspired by [Backbone.View#listenTo](http://backbonejs.org/#Events-listenTo).

Observer is encouraged to be used as a mixin.

    Observer(someObjectThatListensToThings);

## API

```javascript
var observer = Observer();
observer.listenTo(eventEmitter, 'eventName', callback);
// Stop listening to one emitter
observer.stopListening(eventEmitter);
// Or to everything
observer.stopListening();
```
