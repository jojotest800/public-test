const EventEmitter = require('events')

const emitter = new EventEmitter()


function on(eventToListenTo, data) {
    emitter.on(eventToListenTo, data)    
}


function emit(eventToEmit, data) {
    emitter.emit(eventToEmit, data)
}


module.exports = {
    on, emit
}