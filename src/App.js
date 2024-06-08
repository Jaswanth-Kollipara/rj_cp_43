import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    disp: false,
  }

  changeDisp = () => {
    this.setState({disp: true})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCart = cartList.filter(item => item.id !== id)
    this.setState({cartList: updatedCart})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCart = cartList.map(item => {
      if (item.id === id) {
        let {quantity} = item
        quantity += 1
        return {...item, quantity}
      }
      return item
    })
    this.setState({cartList: updatedCart})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const result = cartList.find(item => item.id === id)
    if (result.quantity > 1) {
      const updatedCart = cartList.map(item => {
        if (item.id === id) {
          let {quantity} = item
          quantity -= 1
          return {...item, quantity}
        }
        return item
      })
      this.setState({cartList: updatedCart})
    } else {
      this.removeCartItem(id)
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const result = cartList.find(item => item.id === product.id)
    if (result !== undefined) {
      const updatedCart = cartList.map(item => {
        if (item.id === product.id) {
          let {quantity} = item
          quantity += 1
          return {...item, quantity}
        }
        return item
      })
      this.setState({cartList: updatedCart})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  render() {
    const {cartList, disp} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          disp,
          changeDisp: this.changeDisp,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
