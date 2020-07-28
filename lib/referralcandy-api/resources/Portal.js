'use-strict'

const base = require('../base')

/**
 *
 * Wrapper around RC's `signup.json` endpoint
 *
 */
function Portal(referralcandy) {
  this.referralcandy = referralcandy

  this.key = 'signup'
}

Portal.prototype.create = base.create
Portal.prototype.get = base.create

module.exports = Portal
