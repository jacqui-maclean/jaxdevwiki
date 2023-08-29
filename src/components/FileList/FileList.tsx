import { Product, Categories } from "../../App";
import { useState } from "react";
import SearchInput from "../SearchInput";
import Category from "../Category/Category";
import CardGrid from "../CardGrid";
import Card from "../CardSimple/CardSimple";
import "./FileList.css";

interface Props {
  onOpenPage: (product: Product) => void;
  categories: Categories;
  handleSearch: (searchTerm: string) => void;
  foundItems: Product[] | undefined;
}
const FileList = ({
  onOpenPage,
  categories,
  handleSearch,
  foundItems,
}: Props) => {
  const [clickedProduct, setClickedProduct] = useState<Product | null>();

  return (
    <>
      <SearchInput onSearch={handleSearch} />
      <div className=" foundItemsDiv d-flex flex-wrap justify-content-around align-items-center">
        {foundItems
          ? foundItems.map((product: Product) => {
              return (
                <div
                  className={
                    clickedProduct === product ? " warning-on " : "warning-off"
                  }
                  //add some interactivity to the clicked element, to feedback to user that their click was registered even though there is no data to display
                  onClick={() => {
                    onOpenPage(product);
                    setClickedProduct(product);
                    // Remove the "clicked" class after a short delay (500ms)
                    setTimeout(() => {
                      setClickedProduct(null);
                    }, 500);
                  }}
                  key={product.slug}
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
          //Card (SimpleCard) is purely for styling purposes (as is CardGrid)
          <Card key={categoryName}>
            <Category
              header={categoryName}
              products={categories[categoryName]}
              foundProducts={foundItems}
              handleOpenPage={onOpenPage}
            />
          </Card>
        ))}
      </CardGrid>
    </>
  );
};

export default FileList;
