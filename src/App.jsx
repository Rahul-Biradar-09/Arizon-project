import { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./Components/Home";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import NotFound from "./Components/NotFound";
import CartContext from "./context/CartContext";
import ProductItemDetailsWrapper from "./Components/ProductItemDetailsWrapper";

import "./App.css";

class App extends Component {
  state = {
    cartList: [],
    amount: 0,
  };

  incrementCartItemQuantity = (id) => {
    const { cartList } = this.state;
    const item = cartList.find((eachItem) => eachItem.id === id);
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((eachItem) =>
        eachItem.id === id
          ? { ...eachItem, quantity: eachItem.quantity + 1 }
          : eachItem
      ),
      amount: prevState.amount + item.price,
    }));
  };

  decrementCartItemQuantity = (id) => {
    const { cartList } = this.state;
    const item = cartList.find((eachItem) => eachItem.id === id);
    if (!item) return;

    if (item.quantity > 1) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((eachItem) =>
          eachItem.id === id
            ? { ...eachItem, quantity: eachItem.quantity - 1 }
            : eachItem
        ),
        amount: prevState.amount - item.price,
      }));
    } else {
      const updatedCart = cartList.filter((eachItem) => eachItem.id !== id);
      this.setState((prevState) => ({
        cartList: updatedCart,
        amount: prevState.amount - item.price,
      }));
    }
  };

  removeAllCartItems = () => {
    this.setState({ cartList: [], amount: 0 });
  };

  removeCartItem = (id) => {
    const { cartList } = this.state;
    const item = cartList.find((eachItem) => eachItem.id === id);
    if (!item) return;

    const updatedCart = cartList.filter((eachItem) => eachItem.id !== id);
    this.setState((prevState) => ({
      cartList: updatedCart,
      amount: prevState.amount - item.price * item.quantity,
    }));
  };

  addCartItem = (product) => {
    const { cartList } = this.state;
    const item = cartList.find((eachItem) => eachItem.id === product.id);
    if (!item) {
      this.setState((prevState) => ({
        cartList: [...prevState.cartList, product],
        amount: prevState.amount + product.price * product.quantity,
      }));
    } else {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((eachItem) =>
          eachItem.id === product.id
            ? {
                ...eachItem,
                quantity: eachItem.quantity + product.quantity,
              }
            : eachItem
        ),
        amount: prevState.amount + product.price * product.quantity,
      }));
    }
  };

  render() {
    const { cartList, amount } = this.state;

    return (
      <CartContext.Provider
        value={{
          cartList,
          amount,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductItemDetailsWrapper />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </CartContext.Provider>
    );
  }
}

export default App;
