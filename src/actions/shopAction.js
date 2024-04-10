'use strict'

import {CHANGE_ITEM_LIST, SIGNIN_USERNAME} from '../reducers/shopReducer'

export const changeItemList = (jsonfile) => ({
  type: CHANGE_ITEM_LIST,
  payload: {jsonfile},
})
export const signinUsername = (username) => ({
  type: SIGNIN_USERNAME,
  payload: {username},
})
