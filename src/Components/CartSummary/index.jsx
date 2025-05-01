import {Component} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

class CartSummary extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          let totalAmount = 0
          cartList.forEach(eachItem => {
            totalAmount += eachItem.price * eachItem.quantity
          })
          return (
            <div className="cart-summary-card">
              <div className="inner-sub-container">
                <div className="Head-container">
                  <h1 className="summary-head">Order Total: </h1>
                  <h1 className="summary-amount">Rs {totalAmount}/-</h1>
                </div>
                <p className="summary-para">{cartList.length} Items in cart</p>
                <button type="button" className="checkout-button">
                  Checkout
                </button>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
