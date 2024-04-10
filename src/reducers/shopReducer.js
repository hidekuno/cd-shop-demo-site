'use strict'

export const CHANGE_ITEM_LIST = 'CHANGE_ITEM_LIST'
export const SIGNIN_USERNAME = 'SIGNIN_USERNAME'

export const shopReducer = (state, action) => {
  switch (action.type) {
  case CHANGE_ITEM_LIST:
    return { jsonfile: action.payload.jsonfile, username: state.username }
  case SIGNIN_USERNAME:
    return { jsonfile: state.jsonfile, username: action.payload.username }
  default:
    throw new Error('No such action type')
  }
}
