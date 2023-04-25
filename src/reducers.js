export const ADD_ITEM = "ADD_ITEM"
export const DEL_ITEM = "DEL_ITEM"

const getItem = (cart, id) => cart.find((item) => item.id === id)
const deleteItem = (cart, id) => cart.filter((item) => item.id !== id)
const existsItem = (cart, id) =>  cart.some((item) => item.id === id)
const initialState = { cart: [] }

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:

            let newCart = []
            if (existsItem(state.cart, action.payload.id)) {

                const item = getItem(state.cart, action.payload.id)
                newCart = [
                    {
                        ...item,
                        stock: item.stock + 1,
                        totalPrice: item.price * (item.stock + 1),
                    },
                    ...deleteItem(state.cart, action.payload.id),
                ]
            } else {
                const { id, title, price, imageUrl } = action.payload
                newCart = [
                    {
                        id,
                        title,
                        price,
                        imageUrl,
                        stock: 1,
                        totalPrice: price,
                    },
                    ...state.cart,
                ]
            }
            return {
                ...state,
                cart: newCart,
            }
        case DEL_ITEM:
          const item = getItem(state.cart, action.payload.id)
          const stock = item.stock - 1

          if (stock === 0) {
              return {
                  ...state,
                  cart: deleteItem(state.cart, action.payload.id),
              }
          }
          const cart = [
              {
                  ...item,
                  stock: stock,
                  totalPrice: item.price * stock,
              },
              ...deleteItem(state.cart, action.payload.id),
          ]
          return {
              ...state,
              cart: cart,
          }
        default:
            return state
    }
}
export default cartReducer
