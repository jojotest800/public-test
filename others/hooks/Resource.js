const emitter = require('../../modules/events')

module,exports = {
    afterCreate : (resource) => {
        return emitter.emit('newResource', { d: resource.id })
    },
    beforeBulkCreate: (options) => {
        options.individualHooks = true
    }
}