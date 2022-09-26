import React from "react";
import { useProductsContext } from "../context/products_context";
import styled from "styled-components";

const Cart = () => {
  const { cart, clearCart } = useProductsContext();

  const totalPrice =
    cart &&
    cart
      .reduce((total, current) => {
        let price = parseFloat(current.price);
        let quantity = parseInt(current.quantity);
        total = price * quantity + total;
        return total;
      }, 0.0)
      .toFixed(2);

  const cartClear = () => {
    localStorage.removeItem("cartItems");
    clearCart();
  };

  return (
    <section className="cart">
      <h2 style={{ marginBottom: ".3rem" }}>Your Basket</h2>
      <hr style={{ marginBottom: ".5rem" }} />
      {!cart ? (
        <h3>Your Basket is Empty</h3>
      ) : (
        cart.map((item) => {
          const { name, price, quantity } = item;
          return (
            <div className="cart-layout">
              <p style={{ textAlign: "start" }}>{name}</p>
              <p style={{ textAlign: "center" }}>{quantity}</p>
              <p style={{ textAlign: "end" }}>{price}$</p>
            </div>
          );
        })
      )}
      <div className="cart-items" style={{ marginTop: "1rem" }}>
        <h3>Total</h3>
        <h3>{totalPrice ? `${totalPrice} $` : "0 $"}</h3>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ModalBtn type="button" onClick={cartClear}>
          Clear Cart
        </ModalBtn>
        <ModalBtn type="button">Proceed</ModalBtn>
      </div>
    </section>
  );
};

const ModalBtn = styled.button`
  margin-top: 0.5rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  text-decoration: none;
  background: #e31837;
  color: #fff;
  border-radius: 0.5rem;
  transition: 0.2 ease-out;
  &:hover {
    background: #ffc500;
    transition: 0.2s ease-out;
    cursor: pointer;
    color: #000;
  }
`;

export default Cart;
