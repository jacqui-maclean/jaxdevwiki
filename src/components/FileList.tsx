import { Product } from "../App";
import { useState } from "react";
import SearchInput from "./SearchInput";
import { CgNotes } from "react-icons/cg";
import Category from "./Category/Category";
import CardGrid from "./CardGrid";
import Card from "./CardSimple";

interface Props {
  products: Product[];
}

const FileList = ({ products }: Props) => {
  const [foundItems, setFoundItems] = useState<Product[]>();
  const handleSearch = (searchTerm: string) => {
    let searchResult = products?.filter((item) =>
      item.tags.includes(searchTerm)
    );
    if (searchResult.length > 0) {
      setFoundItems(searchResult);
    }
  };
  //separate the data into two arrays found/not found so we can display them separately
  let inputData: Product[] | undefined = foundItems
    ? products?.filter(
        (product) =>
          product.title !==
          foundItems.find((item) => item.title === product.title)?.title
        //find the item in the foundItems array that matches the product title
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
            products={products}
            foundProducts={foundItems}
            heading="array"
          />
        </Card>
        <Card>
          <Category
            products={products}
            foundProducts={foundItems}
            heading="functions"
          />
        </Card>
        <Card>
          <Category
            products={products}
            foundProducts={foundItems}
            heading="objects"
          />
        </Card>
        <Card>
          <Category
            products={products}
            foundProducts={foundItems}
            heading="variables"
          />
        </Card>
      </CardGrid>
    </>
  );
};

export default FileList;
