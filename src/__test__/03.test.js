'use strict'

import React from 'react'
import '@testing-library/jest-dom'
import {waitFor} from '@testing-library/react'
import {cartReducer, DEL_POINT} from '../reducers/cartReducer'
import {shopReducer} from '../reducers/shopReducer'
import {testRender} from './common'

export const response = class {
  constructor() {
    this.status = 400
  }
}
global.fetch = jest.fn(() => new response())

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
  test('fetch error test', async () => {
    await waitFor(() => { testRender() })
  })
})
