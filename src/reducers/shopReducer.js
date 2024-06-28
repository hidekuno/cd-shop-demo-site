/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

export const SIGNIN_USERNAME = 'SIGNIN_USERNAME'
export const ADD_ORDER = 'ADD_ORDER'
export const ADD_VIEWED = 'ADD_VIEWED'

const getNow = () => {
  const d = new Date()
  return d.toLocaleDateString('sv-SE') + ' ' + d.toLocaleTimeString('sv-SE')
}

const makeOrder = (order) => {
  const random = (min, max, digit) => (Math.floor(Math.random() * (max + min))).toString().padStart(digit, '0')

  const orderno = random(1, 1000, 3) + '-' + random(1, 10000000, 7) + '-' + random(1, 10000000, 7)
  return { orderno, orderDatetime:getNow(), total: order.total, payment: order.payment, detail: order.detail }
}
export const shopReducer = (state, action) => {
  switch (action.type) {
  case SIGNIN_USERNAME:
    return { ...state, username: action.payload.username }

  case ADD_ORDER:
    return {
      ...state,
      order: [
        makeOrder(action.payload.order),
        ...state.order
      ]
    }

  case ADD_VIEWED:
    return {
      ...state,
      views: [
        {datetime: getNow(), item: action.payload},
        ...state.views,
      ]
    }
  default:
    throw new Error('No such action type')
  }
}
