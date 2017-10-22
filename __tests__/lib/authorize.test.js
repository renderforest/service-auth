const authorize = require('../../__mock__/lib/authorize.mock')

test('test authorize middleware', async () => {
  const array = []
  array['authorization'] = 'hash'
  const req = {
    headers: array
  }
  const result = await authorize.authorize(req, '', res => res)

  expect(result).toBe('done')
  const req1 = {
    headers: 'not_authorization'
  }
  try {
    const result1 = await authorize.authorize(req1, '', res => res)
  } catch (error) {
    expect(error).toEqual({ error: 'Invalid authorization key!' })
  }
})
