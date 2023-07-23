import { Product } from "../App";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { productName, image, price } = product;
  return (
    <div className="card mt-9" style={{ width: "18rem" }}>
      <img
        src={image.url}
        className="card-img-top"
        alt={image.attributes.imageAltText}
      />
      <div className="card-body">
        <p className="card-text">{productName}</p>
        <p className="card-text">£{price.priceIncTax}</p>
      </div>
    </div>
  );
};

export default ProductCard;
