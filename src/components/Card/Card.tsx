import { useState } from "react";
import { Product } from "../../App";
import Modal from "../Modal/Modal";
import "./Card.css";
import { CgNotes } from "react-icons/cg";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [advisory, setAdvisory] = useState("");
  const { title, images } = product;
  const handleModal = () => {
    if (images.length > 0) {
      setShowModal(true);
    } else {
      advisory.length > 0
        ? setAdvisory("")
        : setAdvisory("There are no notes for this yet.");
    }
  };
  return (
    <div className="card mt-9 gradient cardsize" style={{ width: "12rem" }}>
      {images.length > 0 ? (
        <CgNotes
          style={{ cursor: "pointer", color: "#fff" }}
          onClick={() => setShowModal(true)}
          title="Click to view notes"
        />
      ) : null}
      {/* <img
        src={images[0]}
        className="card-img-top"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer", height: "150px", width: "100px" }}
      /> */}

      <div
        className="card-body "
        style={{ padding: "0px", cursor: "pointer" }}
        onClick={handleModal}
      >
        <p className="card-text">{title}</p>
        <p
          className="info"
          onClick={() => {
            setAdvisory("");
          }}
        >
          {advisory}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
