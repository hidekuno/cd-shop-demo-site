/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

import '@testing-library/jest-dom'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import { cartReducer, DEL_POINT } from '../reducers/cartReducer'
import { shopReducer } from '../reducers/shopReducer'
import { testRender } from './common'

export const Response = class {
  constructor () {
    this.status = 400
  }
}
global.fetch = jest.fn(() => new Response())
AbortSignal.timeout = jest.fn().mockReturnValue({ timeout: 5000 })
jest.spyOn(console, 'error').mockImplementation(x => x)

describe('unit test etc', () => {
  test('exception  test', async () => {
    const action = {
      type: 'TEST',
      payload: null
    }
    expect(() => shopReducer('dummy', action)).toThrow(new Error('No such action type'))
  })
  test('exception  test', async () => {
    const action = {
      type: 'TEST',
      payload: null
    }
    expect(() => cartReducer('dummy', action)).toThrow(new Error('No such action type'))
  })
  test('cart test zero eq', async () => {
    const action = {
      type: DEL_POINT,
      payload: { point: 10 }
    }
    const rec = cartReducer({ point: 0, cart: 10 }, action)
    expect(rec.point).toEqual(0)
  })
  test('fetch error test', async () => {
    await waitFor(() => { testRender() })
    expect(console.error).toBeCalled()

    await waitFor(() => {
      const button = screen.getByTestId('CloseIcon')
      fireEvent.click(button)
    })
  })
})
