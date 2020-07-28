'use strict';

const fetch = require('node-fetch')
const md5 = require('md5')
const { URL } = require('url');
const resources = require('./resources');

const REQUIRED_CONFIG_PROPERTIES = [
  'apiVersion',
  'accessId',
  'secretKey'
]

/**
 * Generic catch all error
 */
// TODO: Handle errors with callback
class ReferralCandyAPIError extends Error {}

function ReferralCandy(config) {
  if (!(this instanceof ReferralCandy)) {
    return new ReferralCandy(config);
  }

  const isObject = config === Object(config) && !Array.isArray(config);

  if (!isObject) {
    throw new Error('Config must be an object');
  }

  const values = REQUIRED_CONFIG_PROPERTIES.filter(
    (value) => !Object.keys(config).includes(value)
  )

  if (values.length) {
    throw new Error(`Missing required config: ${values}`)
  }

  if (!config.accessId.length) {
    throw new Error('Missing access id')
  };

  if (!config.secretKey.length) {
    throw new Error('Missing secret key')
  };

  if (config.apiVersion !== 'v1') {
    throw new Error('Unrecognized API Version')
  };

  this.accessId = config.accessId
  this.secretKey = config.secretKey
  this.apiVersion = config.apiVersion
  this.baseUrl = "https://my.referralcandy.com/api/v1"

  this._registerAll()
}

ReferralCandy.prototype = {
  _registerAll() {
    for (const name in resources) {
      this[name] = new resources[name](this)
    }
  }
}

ReferralCandy.prototype._generateSignature = function(fullData) {
  const sortedData = Object.keys(fullData).sort(function(a, b) {
    const nameA = a.toUpperCase()
    const nameB = b.toUpperCase()
    if (nameA < nameB) {
      return - 1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })

  const dataString = sortedData.reduce(function(prev, curr) {
    return prev + `${curr}=${fullData[curr]}`
  }, `${this.secretKey}`)

  return md5(dataString)
}

ReferralCandy.prototype.request = async function(method, key, data) {
  const requestStart = Math.floor(Date.now() / 1000)
  const fullData = {
    ...data,
    accessID: this.accessId,
    timestamp: requestStart
  }

  const fullPath = new URL(`${this.baseUrl}/${key}.json`)

  const signedData = JSON.stringify({
    ...fullData,
    signature: this._generateSignature(fullData)
  })

  const res = await fetch(fullPath.href, {
    method,
    body: signedData,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let response = ''

  try {
    response = await res.json()
  } catch(e) {
    throw new ReferralCandyAPIError({
      message: 'Invalid JSON received from ReferralCandy API',
      response,
      exception: e
    })
  }

  if (!response || typeof response !== 'object') {
    throw new ReferralCandyAPIError({
      message: 'No response from ReferralCandy Servers',
      response
    })
  }

  if (response.message === 'Invalid Credentials') {
    throw new ReferralCandyAPIError({
      message: 'Invalid Credentials',
      response
    })
  }

  return response
}

module.exports = ReferralCandy;

module.exports.ReferralCandy = ReferralCandy;

module.exports.default = ReferralCandy;
