import { Product } from "../../App";
import "./Category.css";

interface Props {
  products: Product[] | undefined;
  foundProducts: Product[] | undefined;
  heading: string;
}

const Category = ({ products, foundProducts, heading }: Props) => {
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
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default Category;
