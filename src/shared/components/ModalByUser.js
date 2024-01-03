import React, { useEffect, useState } from "react";
import Modal from "react-modal";
const ModalByUser = (props) => {
  const { modalIsOpen2, setModalIsOpen2 } = props;
  const users = JSON.parse(localStorage.getItem("users"));
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const cart_items = JSON.parse(localStorage.getItem("cart_items"));
  let producsBuyUserLogin;
  users.filter((item) => {
    if (userLogin) {
      if (item.email === userLogin.email)
        producsBuyUserLogin = item.purchasedProduct;
    }
    return true;
  });
  let totalProductIncart = 0;
  if (producsBuyUserLogin) {
    totalProductIncart = producsBuyUserLogin.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );
  }
  console.log(producsBuyUserLogin);
  console.log(totalProductIncart);
  return (
    <div>
      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={() => setModalIsOpen2(false)}
        className="modal-by-user"
      >
        <h2 className="modal-by-user-title">order history</h2>
        {producsBuyUserLogin ? (
          producsBuyUserLogin.map((item) => {
            return (
              <div className="item">
                <div className="img">
                  <img style={{ width: 100 }} src={item.strMealThumb} alt="" />
                </div>
                <div className="desc">
                  <div className="name">{item.strMeal}</div>
                  <div><i class="fas fa-times"></i>{item.qty}</div>
                </div>
                <div className="price">{item.price}$</div>
              </div>
            );
          })
        ) : (
          <div class="notFound">Sorry, You don't have any orders yet</div>
        )}
        {producsBuyUserLogin ? (
          <div className=" done">
            <div>
              <i
                style={{ color: "#ca5568" }}
                className="fa-solid fa-dollar-sign"
              />
              &nbsp;Total money: <span>{totalProductIncart}$</span>
            </div>
          </div>
        ) : (
          false
        )}

        <button
          className="modal-by-user-btn"
          onClick={() => setModalIsOpen2(false)}
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </Modal>
    </div>
  );
};
export default ModalByUser;
