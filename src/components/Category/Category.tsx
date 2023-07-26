import { Product } from "../../App";
import { CgNotes } from "react-icons/cg";
import "./Category.css";
import { useEffect, useState } from "react";

interface Props {
  products: Product[];
  foundProducts: Product[] | undefined;
  heading: string;
  handleClick: (product: Product) => void;
  clickedItem: string | undefined;
}

const Category = ({
  products,
  foundProducts,
  heading,
  handleClick,
  clickedItem,
}: Props) => {
  const [clickedTitle, setClickedTitle] = useState<string>("uncleTomCobbley");
  const [isMovingRight, setIsMovingRight] = useState(false);

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
              ? "found moving-element" +
                (clickedTitle === item.title ? " clicked-element" : "")
              : "moving-element" +
                (clickedItem === item.title ? " clicked-element" : "")
          }
          //add some interactivity to the clicked element, to feedback to user that their click was registered
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleClick(item);
            setClickedTitle(item.title);
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
