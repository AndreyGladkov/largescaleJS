define(function() {
    class _Events {
        constructor() {
            const listeners = [];
            this.on = this.on.bind(this, listeners);
            this.trigger = this.trigger.bind(this, listeners);
        }
        
        on(listeners, name, cb) {
            if (!listeners[name]) {
                listeners[name] = [];
            }
            
            listeners[name].push(cb);
        }
        
        trigger(listeners, name, data) {
            if (listeners[name]) {
                listeners[name].forEach(
                    cb => cb(data)
                );
            }
        }
    }
    
    return _Events;
});
