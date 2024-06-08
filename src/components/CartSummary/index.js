import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import 'reactjs-popup/dist/index.css'
import './index.css'

const Newfolder = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, disp, changeDisp} = value
      let sum = 0
      const list = cartList.map(item => {
        const {quantity, price} = item
        sum += price * quantity
        return item
      })
      console.log(list)
      const len = cartList.length
      const onClickCheck = () => {
        changeDisp()
      }

      return (
        <div className="con-summary">
          <p className="p-sum">
            Order Total: <h1 className="head-sum">Rs {sum}/-</h1>
          </p>
          <p>{len} Items in cart</p>
          <div className="popup-container">
            <Popup
              modal
              trigger={
                <button className="login-button" type="button">
                  Checkout
                </button>
              }
            >
              <div>
                <p className="p-sum">
                  Order Total: <span className="head-sum">Rs {sum}/-</span>
                </p>
                <p>{len} Items in cart</p>
                <select>
                  <option disabled>Card</option>
                  <option disabled>Net Banking</option>
                  <option disabled>UPI</option>
                  <option disabled>Wallet</option>
                  <option selected>Cash on Delivery</option>
                </select>
                <button
                  className="login-button"
                  type="button"
                  onClick={onClickCheck}
                >
                  Confirm Order
                </button>
                {disp && <h1>Your order has been placed successfully</h1>}
              </div>
            </Popup>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Newfolder
