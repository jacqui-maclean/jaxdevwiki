import { useState } from "react";
import data from "./assets/data.json";
import FileList from "./components/FileList/FileList";
import NavBar from "./components/NavBar/NavBar";
import SubjectDetail from "./components/SubjectDetail/SubjectDetail";
import "./App.css";
//TODO: add test suite
//TODO: find out about porting the data via a database/api...started Django course
//Decided to go with Node.js with MongoDB to deploy to heroku

//although not used I like to see the representation of Data here
interface Data {
  data: Categories;
}

export interface Product {
  images: string[];
  extraText: string;
  tags: string[];
  slug: string;
  title: string;
  category: string;
}

export interface Categories {
  [key: string]: Product[];
}

function App() {
  const [pageType, setPageType] = useState("list");
  const [currentPage, setCurrentPage] = useState<Product | null>(null);
  const [tabs, setTabs] = useState<Product[]>([]);
  const [foundItems, setFoundItems] = useState<Product[]>();

  const addTabbedPage = (product: Product) => {
    if (!tabs.includes(product)) {
      setTabs([...tabs, product]);
    }
  };

  const handleOpenPage = (product: Product) => {
    if (product.images.length > 0) {
      setPageType("detail");
      setCurrentPage(product);
      addTabbedPage(product);
    }
  };

  const handleGoToHome = () => {
    setPageType("list");
  };

  const removeTabfromArray = (product: Product) => {
    const filteredArray = tabs.filter((item) => product !== item);
    setTabs(filteredArray);
  };

  const removeTabbedPage = (product: Product) => {
    if (product === currentPage) {
      //if you are closing the current page then figure out which page to mount in its place
      let originalIndex = tabs.findIndex((item) => item.slug === product?.slug);
      //if its the last in the array then we need to go back one
      let newIndex =
        originalIndex + 1 == tabs.length
          ? originalIndex - 1
          : originalIndex + 1;

      if (newIndex !== -1) {
        setCurrentPage(tabs[newIndex]);
      } else {
        setCurrentPage(null);
        setPageType("list");
      }
    }
    //if the page is not currently open then stay on the current page and remove the tab
    removeTabfromArray(product);
  };

  const handleClosePage = (product: Product) => {
    removeTabbedPage(product);
  };

  const handleCloseTab = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    product: Product
  ) => {
    //stop the event from bubbling up to the parent div and triggering the onNavClick event
    event.stopPropagation();
    removeTabbedPage(product);
  };

  const handleViewPage = (product: Product | undefined) => {
    setPageType("detail");
    product &&
      (setCurrentPage(product),
      tabs.includes(product) ? null : setTabs([...tabs, product])); //**if this is a product that is not already in the array then add to the array
  };

  const handleSearch = (searchTerm: string) => {
    let searchResult: Product[] = [];
    let categories: Categories = data.categories;
    for (const categoryKey in categories) {
      //for each array of products in categories
      const products: Product[] = categories[categoryKey];
      // //check the array and if any matches are found, add them to the searchResult array
      let results = products?.filter((item) => item.tags.includes(searchTerm));
      searchResult = [...searchResult, ...results];
    }
    if (searchResult.length > 0) {
      setFoundItems(searchResult);
    } else {
      setFoundItems([]);
    }
  };

  const handleClearTabs = () => {
    setTabs([]);
    setCurrentPage(null);
    setPageType("list");
  };

  return (
    <div style={{ backgroundColor: "azure", minHeight: "100vh" }}>
      <NavBar
        viewPage={handleViewPage}
        goToHome={() => setPageType("list")}
        tabs={tabs}
        closeTab={handleCloseTab}
        currentPage={currentPage}
      />
      {pageType === "list" ? (
        <FileList
          categories={data.categories}
          onOpenPage={handleOpenPage}
          foundItems={foundItems}
          handleSearch={handleSearch}
        />
      ) : (
        <SubjectDetail
          currentPage={currentPage}
          goToHome={handleGoToHome}
          closePage={handleClosePage}
          clearTabs={handleClearTabs}
        />
      )}
    </div>
  );
}

export default App;
