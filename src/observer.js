define(function() {

    var listenIds = 0;

    /**
     * An Observable mixin for use with EventEmitter
     * @param {Object} that
     * @exports streamhub-sdk/observer
     */
    function Observer(that) {
        that = that || {};
        that._listeningTo = {};
        that.listenTo = listenTo;
        that.stopListening = stopListening;
        return that;
    };

    /**
     * Listen to the event on the provided object
     * @param {EventEmitter} obj
     * @param {string} name
     * @param {function()} callback
     */
    function listenTo(obj, name, callback) {
        var id = obj._listenId || (obj._listenId = listenIds++ + '');

        // TODO: simplify
        this._listeningTo[id] = this._listeningTo[id] || {};
        this._listeningTo[id].obj = obj;
        this._listeningTo[id].listeners = this._listeningTo[id].listeners || {};
        this._listeningTo[id].listeners[name] = this._listeningTo[id].listeners[name] || [];
        this._listeningTo[id].listeners[name].push(callback);

        obj.on(name, callback);
    }

    /**
     * Stop listening to the provided object
     * @param {?EventEmitter} obj
     */
    function stopListening(obj) {
        if (obj) {
            removeListenersForObj.call(this, obj._listenId);
            return;
        }
        // TODO: name/callback granularity
        for (var id in this._listeningTo) {
            if (!this._listeningTo.hasOwnProperty(id)) {
                continue;
            }
            removeListenersForObj.call(this, id)
        }
    }

    function removeListenersForObj(id) {
        if (!this._listeningTo[id]) {
            return;
        }

        var obj = this._listeningTo[id].obj;
        var listeners = this._listeningTo[id].listeners;
        var callbacks;
        for (var name in listeners) {
            if (!listeners.hasOwnProperty(name)) {
                continue;
            }

            callbacks = listeners[name];
            for (var i = 0; i < callbacks.length; i++) {
                obj.removeListener(name, callbacks[i]);
            }
        }
        delete this._listeningTo[id];
    }

    return Observer;
});
