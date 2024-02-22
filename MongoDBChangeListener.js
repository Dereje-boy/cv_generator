const EventEmitter = require('events');

class MongoConnectionWatcher extends EventEmitter {
    constructor() {
        super();
        this.value = null;
    }

    setConnected(value) {
        this.value = value;
        this.emit('change', value);
    }

    setDisconnected() {
        this.emit('change', value);
    }
}