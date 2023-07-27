import { Product } from "../../App";
import { CgNotes } from "react-icons/cg";
import "./Category.css";
import { useState } from "react";

interface Props {
  products: Product[];
  foundProducts: Product[] | undefined;
  onSubjectSelect: (product: Product) => void;
  clickedItem: string | undefined;
  header: string;
}

const Category = ({
  products,
  foundProducts,
  onSubjectSelect,
  header,
}: Props) => {
  const [clickedProduct, setClickedProduct] = useState<Product | null>(null);

  return (
    <div className="card mt-9">
      <h2 className="card-header">{header}</h2>
      {products?.map((item: Product) => (
        <div
          key={item.slug}
          //check to see if the item is in the foundProducts array
          className={
            item.title === //if current item title matches the title of an item in the foundProducts array
            foundProducts?.find(
              //foundProducts?.find will return the whole item if there is a match
              (foundProduct) => foundProduct.title === item.title
            )?.title //then we extract the title with dot notation so we can match it to the item.title
              ? "found " + (clickedProduct === item ? " glow " : "unglow")
              : " " + (clickedProduct === item ? " glow " : "unglow")
          }
          //add some interactivity to the clicked element, to feedback to user that their click was registered even though there is no data to display
          style={{ cursor: "pointer" }}
          onClick={() => {
            onSubjectSelect(item);
            setClickedProduct(item);
            // Remove the "clicked" class after a short delay (500ms)
            setTimeout(() => {
              setClickedProduct(null);
            }, 500);
          }}
        >
          {item.title}
          {item.images.length > 0 && <CgNotes />}
        </div>
      ))}
    </div>
  );
};

export default Category;
