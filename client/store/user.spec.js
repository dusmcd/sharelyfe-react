import userReducer from './user'

const GET_USER = 'GET_USER'

describe('User reducer function', () => {
  let frank
  before(() => {
    frank = {
      firstName: 'Frank',
      lastName: 'Reagan',
      email: 'frank@bluebloods.com',
    }
  })
  it('returns the correct user state', () => {
    const newState = userReducer({}, { type: GET_USER, user: frank })
    expect(newState).to.be.an('object')
    expect(newState.firstName).to.equal(frank.firstName)
    expect(newState.lastName).to.equal(frank.lastName)
    expect(newState.email).to.equal(frank.email)
  })
  it('returns the given state if no action given', () => {
    const defaultState = userReducer()
    expect(defaultState).to.be.an('object')
    expect(defaultState).to.equal({})
  })
})
