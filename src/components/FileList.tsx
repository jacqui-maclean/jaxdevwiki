import { Product, Categories } from "../App";
import { useState } from "react";
import SearchInput from "./SearchInput";
import Category from "./Category/Category";
import CardGrid from "./CardGrid";
import Card from "./CardSimple";
import Modal from "./Modal/Modal";

interface Props {
  //   products: Product[];
  onClick: (product: Product) => void;
  categories: Categories;
}
//TODO get rid of console error
const FileList = ({ onClick, categories }: Props) => {
  const [foundItems, setFoundItems] = useState<Product[]>();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [clickedItem, setClickedItem] = useState<string>();

  const handleSearch = (searchTerm: string) => {
    for (const categoryKey in categories) {
      const products = categories[categoryKey];
      console.log(`Category: ${categoryKey}`);
      let searchResult = products?.filter((item) =>
        item.tags.includes(searchTerm)
      );
      if (searchResult.length > 0) {
        setFoundItems(searchResult);
      } else {
        setFoundItems([]);
      }
    }
  };

  const handleModal = (product: Product) => {
    console.log("product is", product.title);
    console.log("product images", product.images);
    product.images.length > 0
      ? (setShowModal(true), setSelectedProduct(product))
      : setClickedItem(product.title);
  };

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
        <div>
          {Object.keys(categories).map((categoryName) => (
            <div key={categoryName} className="identifier">
              <h2>{categoryName}</h2>
              <Card>
                <Category
                  products={categories[categoryName]}
                  foundProducts={foundItems}
                  handleClick={onClick}
                  clickedItem={clickedItem}
                />
              </Card>
            </div>
          ))}
        </div>
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
