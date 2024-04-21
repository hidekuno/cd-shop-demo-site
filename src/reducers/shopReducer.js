/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

export const CHANGE_ITEM_LIST = 'CHANGE_ITEM_LIST'
export const SIGNIN_USERNAME = 'SIGNIN_USERNAME'
export const ADD_ORDER = 'ADD_ORDER'

const makeOrder = (order) => {
  const random = (min,max,digit) => (Math.floor( Math.random() * (max + min))).toString().padStart(digit, '0')

  let detail = []
  for(const i in order.detail) {
    detail.push({title: order.detail[i].title, price: order.detail[i].price, qty: order.detail[i].qty})
  }
  const d = new Date()
  const orderDatetime =  d.toLocaleDateString('sv-SE') + ' ' + d.toLocaleTimeString('sv-SE')
  const orderno = random(1,1000,3) + '-'+ random(1,10000000,7) + '-' + random(1,10000000,7)
  return {orderno, orderDatetime, total: order.total, payment: order.payment, detail}
}
export const shopReducer = (state, action) => {
  switch (action.type) {
  case CHANGE_ITEM_LIST:
    return { ...state, jsonfile: action.payload.jsonfile, }

  case SIGNIN_USERNAME:
    return { ...state, username: action.payload.username, }

  case ADD_ORDER:
    return {
      ...state,
      order: [
        makeOrder(action.payload.order),
        ...state.order,
      ]
    }
  default:
    throw new Error('No such action type')
  }
}
