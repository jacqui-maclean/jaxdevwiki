import { Product } from "../App";
import { useState } from "react";
import SearchInput from "./SearchInput";
import Category from "./Category/Category";
import CardGrid from "./CardGrid";
import Card from "./CardSimple";
import Modal from "./Modal/Modal";

interface Props {
  products: Product[];
  onClick: (product: Product) => void;
}

const FileList = ({ products, onClick }: Props) => {
  const [foundItems, setFoundItems] = useState<Product[]>();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [clickedItem, setClickedItem] = useState<string>();
  const handleSearch = (searchTerm: string) => {
    let searchResult = products?.filter((item) =>
      item.tags.includes(searchTerm)
    );
    if (searchResult.length > 0) {
      setFoundItems(searchResult);
    } else {
      setFoundItems([]);
    }
  };

  const handleModal = (product: Product) => {
    console.log("product is", product.title);
    console.log("product images", product.images);
    product.images.length > 0
      ? (setShowModal(true), setSelectedProduct(product))
      : setClickedItem(product.title);
  };
  //if there are any entries in foundItems, then separate the data into two arrays found/not found
  //inputData will be mutated so that any items that are found will be removed from the inputData array
  let inputData: Product[] | undefined = foundItems
    ? products?.filter(
        (product) =>
          product.title !==
          foundItems.find((item) => item.title === product.title)?.title
        //find the item in the foundItems array that matches the product title
        //find will return the entire item if there is a match, use dot notation to extract the title
        //if it matches then filter it out of the inputData array
      )
    : products;

  return (
    <>
      <SearchInput onSearch={handleSearch} />
      <div className="d-flex flex-wrap justify-content-around align-items-center">
        {foundItems
          ? foundItems.map((product: Product) => {
              return (
                <div
                  key={product.slug}
                  style={{
                    color: "dodgerblue",
                  }}
                >
                  {product.title}
                </div>
              );
            })
          : null}
      </div>
      <CardGrid>
        <Card>
          <Category
            heading="array"
            products={products}
            foundProducts={foundItems}
            handleClick={onClick}
            clickedItem={clickedItem}
          />
        </Card>
        <Card>
          <Category
            heading="functions"
            products={products}
            foundProducts={foundItems}
            handleClick={onClick}
            clickedItem={clickedItem}
          />
        </Card>
        <Card>
          <Category
            heading="objects"
            products={products}
            foundProducts={foundItems}
            handleClick={onClick}
            clickedItem={clickedItem}
          />
        </Card>
        <Card>
          <Category
            heading="variables"
            products={products}
            foundProducts={foundItems}
            handleClick={onClick}
            clickedItem={clickedItem}
          />
        </Card>
      </CardGrid>
      <main>
        <Modal
          image={selectedProduct?.images[0]}
          images={selectedProduct?.images}
          extraText={selectedProduct?.extraText}
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      </main>
    </>
  );
};

export default FileList;
