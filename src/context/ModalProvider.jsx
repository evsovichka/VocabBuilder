import { useState } from "react";
import { ModalContext } from "./ModalContext.js";

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (name) => setActiveModal(name);
  const closeModal = () => setActiveModal(null);
  const isOpen = (name) => activeModal === name;
  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, isOpen, activeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
