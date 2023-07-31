import { Product, Categories } from "../App";
import { useState } from "react";
import SearchInput from "./SearchInput";
import Category from "./Category/Category";
import CardGrid from "./CardGrid";
import Card from "./CardSimple";

interface Props {
  handleSubjectSelect: (product: Product) => void;
  categories: Categories;
  handleSearch: (searchTerm: string) => void;
  foundItems: Product[] | undefined;
}
const FileList = ({
  handleSubjectSelect,
  categories,
  handleSearch,
  foundItems,
}: Props) => {
  const [clickedItem, setClickedItem] = useState<string>();

  return (
    <>
      <SearchInput onSearch={handleSearch} />
      <div className=" foundItemsDiv d-flex flex-wrap justify-content-around align-items-center">
        {foundItems
          ? foundItems.map((product: Product) => {
              return (
                <div
                  onClick={() => {
                    handleSubjectSelect(product);
                  }}
                  key={product.slug}
                  style={{
                    color: "dodgerblue",
                    cursor: "pointer",
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
