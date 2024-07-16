const ReferralCandy = require('../lib/referralcandy-api')
const util = require('util')

const referralcandy = new ReferralCandy({
  accessId: process.env.accessId,
  secretKey: process.env.secretKey,
  apiVersion: 'v2'
})

module.exports = async (req, res) => {
  let params = null
  try {
    params = req.query
  } catch(e) {
    return res.status(400).json({ error: `Malformed params` })
  }
  if (!params?.email) {
    return res.status(500).json({ error: `Missing params` })
  }

  const { email } = params

  try {
    const response = await referralcandy.rewards.read({
      email
    })

    return res.status(200).json({
      rewards: response.rewards
    })
  } catch(err) {
    return res.status(500).json({
      error: JSON.stringify(err, Object.getOwnPropertyNames(err))
  });
  }
}
