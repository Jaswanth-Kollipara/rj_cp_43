import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  disp: false,
  changeDisp: () => {},
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
