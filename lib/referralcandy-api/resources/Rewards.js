'use-strict'

const base = require('../base')

/**
 *
 * Wrapper around RC's `rewards.json` endpoint
 *
 */
function Rewards(referralcandy) {
  this.referralcandy = referralcandy

  this.key = 'rewards'
}

// Rewards.prototype.create = base.create
Rewards.prototype.read = base.read

module.exports = Rewards
