import { Product } from "../../App";
import "./Category.css";
import { CgNotes } from "react-icons/cg";

interface Props {
  products: Product[] | undefined;
  foundProducts: Product[] | undefined;
  heading: string;
  handleClick: (product: Product) => void;
  selectedProduct: Product | undefined;
}

const Category = ({
  products,
  foundProducts,
  heading,
  handleClick,
  selectedProduct,
}: Props) => {
  let renderedHeading = heading.toUpperCase();
  let items = products?.filter((item) => item.category == heading);
  return (
    <div className="card mt-9">
      <div>{renderedHeading}</div>
      {items?.map((item: Product) => (
        <div
          key={item.slug}
          //check to see if the item is in the foundProducts array
          className={
            item.title ===
            foundProducts?.find(
              (foundProduct) => foundProduct.title === item.title
            )?.title
              ? "found"
              : ""
          }
          onClick={() => handleClick(item)}
        >
          {item.title}
          {item.images.length > 0 ? <CgNotes /> : null}
          {selectedProduct?.title === item.title ? <p>"no notes yet"</p> : null}
        </div>
      ))}
    </div>
  );
};

export default Category;
