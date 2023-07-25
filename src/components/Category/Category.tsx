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
  const [clickedFlag, setClickedFlag] = useState(false);
  useEffect(() => {
    console.log("useEffect called with " + clickedItem);
    if (clickedItem) {
      // Add the "clicked" class after a short delay (10ms) to trigger the transition
      const timer = setTimeout(() => {
        console.log("from within the useeffect ", clickedItem);
        setClickedTitle(clickedItem);
      }, 1000);

      // Clear the timer on unmount to avoid memory leaks
      return () => clearTimeout(timer);
    }
  }, [clickedTitle]);
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
              ? "found" + (clickedTitle === item.title ? " fadeIn" : "")
              : "" + (clickedItem === item.title ? " fadeIn" : "")
          }
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
