import React, { useState } from "react";
import Modal from "react-modal";

function ModalAbout({ setModalIsOpen, modalIsOpen }) {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal-about"
      >
        <h2 className="modal-about-title">About us</h2>
        <p className="modal-about-content">
          Food ordering system is a web application developed to manage food and
          customer orders. This software helps shoppers eat the food they want
          just through the app without having to move much while minimizing the
          need to remember orders during the process of operating a restaurant.
          Foodies is a website that shares culinary experiences for everyone.
          Here, you can find articles, photos, and videos about cuisine from
          members around the world. Foodies provides an extremely rich and
          diverse treasure of culinary knowledge. You can find information about
          dishes, restaurants, places to eat, culinary tourism,... from all over
          the world. Foodies is also a playground for members to share their
          passion for food. You can join food communities, groups, or forums on
          Foodies to connect with people with similar interests.
        </p>
        <span className="modal-about-btn" onClick={() => setModalIsOpen(false)}>
          <i class="fa-solid fa-xmark"></i>
        </span>
      </Modal>
    </div>
  );
}
export default ModalAbout;
