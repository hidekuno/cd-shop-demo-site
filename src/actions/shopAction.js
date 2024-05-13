/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

import { SIGNIN_USERNAME, ADD_ORDER } from '../reducers/shopReducer'

export const signinUsername = (username) => ({
  type: SIGNIN_USERNAME,
  payload: { username }
})
export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: { order }
})
