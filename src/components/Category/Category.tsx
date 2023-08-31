import { useState, useEffect } from "react";
import { Product } from "../../App";
import { CgNotes } from "react-icons/cg";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import "./Category.css";

interface Props {
  products: Product[];
  foundProducts: Product[] | undefined;
  handleOpenPage: (product: Product) => void;
  header: string;
}

const Category = ({
  products,
  foundProducts,
  handleOpenPage,
  header,
}: Props) => {
  const [clickedProduct, setClickedProduct] = useState<Product | null>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [containsFoundProduct, setContainsFoundProduct] = useState(false);

  const isFoundProduct = (item: Product) => {
    return (
      item.title ===
      foundProducts?.find((foundProduct) => foundProduct.title === item.title) //foundProducts?.find will return the whole item if there is a match     )?.title //then we extract the title with dot notation so we can match it to the item.title
        ?.title
    );
  };

  useEffect(() => {
    console.log("calling useEffect in Category.tsx");
    setContainsFoundProduct(false);
    products?.forEach((item) => {
      if (
        item.title ===
        foundProducts?.find((foundProduct) => foundProduct.title === item.title)
          ?.title
      ) {
        setContainsFoundProduct(true);
        return;
      }
    });
  }, [foundProducts]);

  return (
    <div className="card mt-9">
      <h2
        style={{
          backgroundColor: containsFoundProduct ? "#823fcfd6" : "#5962be",
          color: "white",
        }}
        className={
          containsFoundProduct
            ? "card-header card-header-custom-found"
            : " card-header"
        }
        onClick={() => setCollapsed(!collapsed)}
      >
        {header}
        {collapsed ? (
          <AiFillCaretDown
            color="white"
            size="2rem"
            onClick={() => setCollapsed(!collapsed)}
            style={{ paddingTop: "4px" }}
          />
        ) : (
          <AiFillCaretUp
            color="white"
            size="2rem"
            onClick={() => setCollapsed(!collapsed)}
            style={{ paddingTop: "4px" }}
          />
        )}
      </h2>

      {!collapsed &&
        products?.map((item: Product) => (
          <div
            key={item.slug}
            //adding styling 1.if the item is a found item  && 2.if the item is a clicked item
            className={
              isFoundProduct(item)
                ? "found " + (clickedProduct === item ? " shine " : "unshine")
                : " " + (clickedProduct === item ? " shine " : "unshine")
            }
            //add some interactivity to the clicked element, to feedback to user that their click was registered even though there is no data to display (althought the same styling is applied at all times, the only time the user willm see it is when there is no data yet for this title(otherwise the page will just open and the home page will be unmounted))
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleOpenPage(item);
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
