import { useState } from "react";
import { Product } from "../App";
import Modal from "./Modal/Modal";
import CustomImage from "./CustomImage";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { title, images } = product;
  return (
    <div className="card mt-9" style={{ width: "12rem" }}>
      <img
        src={images[0]}
        className="card-img-top"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer", height: "150px", width: "100px" }}
      />

      <div className="card-body">
        <p className="card-text">{title}</p>
      </div>
      <main>
        <Modal
          image={images[0]}
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      </main>
    </div>
  );
};

export default ProductCard;
