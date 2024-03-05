import CartContext from '../../context/CartContext'
import './index.css'

const Newfolder = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let sum = 0
      const list = cartList.map(item => {
        const {quantity, price} = item
        sum += price * quantity
        return item
      })
      const len = cartList.length

      return (
        <div>
          <h1>
            Order Total: <p>Rs {sum}/-</p>
          </h1>
          <p>{len} Items in cart</p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Newfolder
