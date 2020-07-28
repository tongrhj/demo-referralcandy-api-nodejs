'use-strict'

/**
 * Provides methods used by resources
 * Don't use directly
 *
 * @mixin
 */

 const base = {
   create(params) {
     return this.referralcandy.request('POST', this.key, params)
   }
 }

 module.exports = base
