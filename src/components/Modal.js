import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout } from "framer-motion";
import { useProductsContext } from "../context/products_context";
import { useHistory, useParams } from "react-router";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const modal = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    originX: 0.5,
    transition: { delay: 0.2 },
  },
};

const Modal = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    hideModal,
    fetchSingleProduct,
    single_product,
    updateCart,
    updateSelect,
    option_selected,
    modal_error,
    quantity,
  } = useProductsContext();
  const category = single_product.category;

  const back = () => {
    history.push("/products");
    hideModal();
  };

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);

  return (
    <motion.div
      className="backdrop"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div className="modal" variants={modal} exit={{ scale: 0 }}>
        <button onClick={back} className="modal-cross-btn">
          <ImCross />
        </button>
        <img src={single_product.image && single_product.image[0].url} alt="" />
        <h3>{single_product.name}</h3>
        <hr style={{ marginTop: "1rem" }} />
        <div className="modal-price-layout">
          <div>
            {category === "Pizza" ? (
              <p>small</p>
            ) : (
              category === "Dessert" && <p>one slice(s)</p>
            )}
            <p>{single_product.priceS}$</p>
          </div>
          <div>
            {category === "Pizza" ? (
              <p>medium</p>
            ) : (
              category === "Dessert" && <p>two slice(s)</p>
            )}
            {single_product.priceM}$
          </div>
          <div>
            {category === "Pizza" ? (
              <p>large</p>
            ) : (
              category === "Dessert" && <p>three slice(s)</p>
            )}
            {single_product.priceL}$
          </div>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0.5rem 0.6rem",
          }}
        >
          <p>Please select</p>
          {category === "Pizza" ? (
            <select name="option_selected" onChange={(e) => updateSelect(e)}>
              <option value="select">select</option>
              <option value={single_product.priceS}>small</option>
              <option value={single_product.priceM}>medium</option>
              <option value={single_product.priceL}>large</option>
            </select>
          ) : (
            <select name="option_selected" onChange={(e) => updateSelect(e)}>
              <option value="select">select</option>
              <option value={single_product.priceS}>OneSlice(s)</option>
              <option value={single_product.priceM}>TwoSlice(s)</option>
              <option value={single_product.priceL}>ThreeSlice(s)</option>
            </select>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0.5rem 0.6rem",
          }}
        >
          <p>Quantity</p>
          <input
            name="quantity"
            type="number"
            max="10"
            min="1"
            defaultValue="1"
            onChange={(e) => updateSelect(e)}
            style={{ width: "3rem", textAlign: "center" }}
          />
        </div>
        <hr />
        <div className="modal-footer">
          {modal_error && (
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { style: "tween", duration: 0.5 },
              }}
              style={{ color: "#e31837" }}
            >
              {modal_error}
            </motion.p>
          )}
          <ModalBtn
            onClick={() =>
              updateCart(
                single_product.name,
                option_selected,
                quantity,
                history
              )
            }
          >
            Order Now
          </ModalBtn>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ModalBtn = styled.button`
  margin-top: 0.5rem;
  font-size: 1rem;
  padding: 0.5rem 2rem;
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

export default Modal;
