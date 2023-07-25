import Card from "./Card/Card";
import { Product } from "../App";
import { useState } from "react";
import SearchInput from "./SearchInput";

interface Props {
  products: Product[];
}

const CardList = ({ products }: Props) => {
  const [found, setFound] = useState<Product[]>();
  const handleSearch = (searchTerm: string) => {
    let foundItems = products?.filter((item) => item.tags.includes(searchTerm));
    if (foundItems.length > 0) {
      setFound(foundItems);
    }
  };
  let inputData: Product[] | undefined = found
    ? products?.filter(
        (product) =>
          product.title !==
          found.find((item) => item.title === product.title)?.title
      )
    : products;

  return (
    <>
      <SearchInput onSearch={handleSearch} />
      <div className="d-flex flex-wrap justify-content-around align-items-center">
        {found
          ? found.map((product: Product) => {
              return (
                <div
                  key={product.slug}
                  style={{
                    borderColor: "dodgerblue",
                    borderStyle: "solid",
                    borderWidth: "3px",
                    borderRadius: "5px",
                  }}
                >
                  <Card product={product} />
                </div>
              );
            })
          : null}
        {inputData.map((product: Product) => {
          return (
            <div key={product.slug}>
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CardList;
