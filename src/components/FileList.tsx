import { Product, Categories } from "../App";
import { useState } from "react";
import SearchInput from "./SearchInput";
import Category from "./Category/Category";
import CardGrid from "./CardGrid";
import Card from "./CardSimple";

interface Props {
  handleSubjectSelect: (product: Product) => void;
  categories: Categories;
}
const FileList = ({ handleSubjectSelect, categories }: Props) => {
  const [foundItems, setFoundItems] = useState<Product[]>();
  const [clickedItem, setClickedItem] = useState<string>();

  const handleSearch = (searchTerm: string) => {
    let searchResult: Product[] = [];
    for (const categoryKey in categories) {
      //for each array of products in categories
      const products: Product[] = categories[categoryKey];
      //check the array and if any matches are found, add them to the searchResult array
      let results = products?.filter((item) => item.tags.includes(searchTerm));
      searchResult = [...searchResult, ...results];
    }
    if (searchResult.length > 0) {
      setFoundItems(searchResult);
    } else {
      setFoundItems([]);
    }
  };

  return (
    <>
      <SearchInput onSearch={handleSearch} />
      <div className=" foundItemsDiv d-flex flex-wrap justify-content-around align-items-center">
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
        {Object.keys(categories).map((categoryName) => (
          //for each category in categories, create a Category component
          //Card is purely for styling purposes (as is CardGrid)
          <Card key={categoryName}>
            <Category
              header={categoryName}
              products={categories[categoryName]}
              foundProducts={foundItems}
              onSubjectSelect={handleSubjectSelect}
              clickedItem={clickedItem}
            />
          </Card>
        ))}
      </CardGrid>
    </>
  );
};

export default FileList;
