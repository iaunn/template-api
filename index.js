/* no-global-assign Promise */
const mongoose = require('mongoose')
const util = require('util')

// config should be consted before importing any other file
const config = require('./config/config')
const app = require('./config/express')

const debug = require('debug')('template-api:index')

// make bluebird default Promise
Promise = require('bluebird') // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise

// connect to mongo db
const mongoUri = config.mongo.host
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, config.bindIp, () => {
    console.info(`server started on port ${config.bindIp}:${config.port} (${config.env})`)
  })
}

module.exports = app
