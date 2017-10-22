const setAuth = require('../../__mock__/lib/set-authorization.mock')

test('setAuthorization function test', () => {
  const options = {
    'foo': 'baar',
    'fuzz': 'foo'
  }
  const signKey = 'key'
  const clientid = 10

  expect(setAuth.setAuthorization(options, signKey, clientid)).toEqual(
    { 'foo': 'baar',
      'fuzz': 'foo',
      "headers": {
        "authorization": signKey,
        "clientid": clientid,
        "nonce": "nonce",
        "timestamp": "date" }
    }
  )
})
