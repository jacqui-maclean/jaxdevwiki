import { Product } from "../../App";
import { CgNotes } from "react-icons/cg";
import "./Category.css";

interface Props {
  products: Product[];
  foundProducts: Product[] | undefined;
  heading: string;
  handleClick: (product: Product) => void;
}

const Category = ({ products, foundProducts, heading, handleClick }: Props) => {
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
          {item.images.length > 0 && <CgNotes />}
        </div>
      ))}
    </div>
  );
};

export default Category;
