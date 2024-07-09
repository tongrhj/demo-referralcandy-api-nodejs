const ReferralCandy = require('../lib/referralcandy-api')
const util = require('util')

const referralcandy = new ReferralCandy({
  accessId: process.env.accessId,
  secretKey: process.env.secretKey,
  apiVersion: 'v1'
})

module.exports = async (req, res) => {
  let body = null
  try {
    body = req.body
  } catch(e) {
    return res.status(400).json({ error: `Malformed params` })
  }
  if (!body?.email || !body?.first_name || !body?.last_name) {
    return res.status(500).json({ error: `Missing params` })
  }

  const { email, first_name, last_name } = body

  try {
    const response = await referralcandy.portal.create({
      first_name,
      last_name,
      email
    })

    return res.status(200).json({
      referral_link: response.referral_link
    })
  } catch(err) {
    return res.status(500).json({
      error: JSON.stringify(err, Object.getOwnPropertyNames(err))
  });
  }
}
