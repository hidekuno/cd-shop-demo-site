'use strict'

import {CHANGE_ITEM_LIST} from '../reducers/shopReducer'

export const changeItemList = (jsonfile) => ({
  type: CHANGE_ITEM_LIST,
  payload: {jsonfile},
})
