'use strict'

import '@testing-library/jest-dom'
import {cartReducer, DEL_POINT} from '../reducers/cartReducer'
import {shopReducer} from '../reducers/shopReducer'

describe('unit test etc', () => {
  test('exception  test', async () => {
    let action = {
      type: 'TEST',
      payload: null,
    }
    expect(() => shopReducer('dummy' , action)).toThrow(new Error('No such action type'))
  })
  test('exception  test', async () => {
    let action = {
      type: 'TEST',
      payload: null,
    }
    expect(() => cartReducer('dummy' , action)).toThrow(new Error('No such action type'))
  })
  test('cart test zero eq', async () => {
    let action = {
      type: DEL_POINT,
      payload: {point: 10},
    }
    let rec = cartReducer({point: 0, cart:10}, action)
    expect(rec.point).toEqual(0)
  })
})
