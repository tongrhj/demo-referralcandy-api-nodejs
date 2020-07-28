# ReferralCandy API Node.js Library

Provides convenient access to the [ReferralCandy API](https://www.referralcandy.com/api) from applications written in server-side JavaScript

## Usage

See `signup.js` for example usage.

This package needs to be configured with your ReferralCandy account's access ID and secret key, available on your [RC Dashboard](https://my.referralcandy.com/settings).

```
import ReferralCandy from './lib/referralcandy-api'

const referralcandy = new ReferralCandy({
  accessId: `samplef34by8gh...`,
  secretKey: `samplevb439ufa...`,
  apiVersion: 'v1'
})

(async () => {
  const response = await referralcandy.portal.create({
    first_name,
    last_name,
    email
  })
  console.log(response.referral_link)
})
```

### ReferralCandy(options)

#### Options

- `accessId`: Required; `string`
- `secretKey`: Required; `string`
- `apiVersion`: Required; `'v1'`

## More information

* [ReferralCandy API](https://www.referralcandy.com/api)
