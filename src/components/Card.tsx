import { Product } from "../App";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { title, images } = product;
  return (
    <div className="card mt-9" style={{ width: "18rem" }}>
      <img src={images[0]} className="card-img-top" />
      <div className="card-body">
        <p className="card-text">{title}</p>
      </div>
    </div>
  );
};

export default ProductCard;
