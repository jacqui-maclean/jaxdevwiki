import { useState } from "react";
import data from "./assets/data.json";
import FileList from "./components/FileList/FileList";
import NavBar from "./components/NavBar/NavBar";
import SubjectDetail from "./components/SubjectDetail/SubjectDetail";
import "./App.css";
//TODO: add test suite
//TODO: find out about porting the data via a database/api...started Django course

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
  const [selectedSubject, setSelectedSubject] = useState<Product | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<Product[]>([]);
  const [foundItems, setFoundItems] = useState<Product[]>();

  const addTabbedPage = (product: Product) => {
    if (!selectedSubjects.includes(product)) {
      setSelectedSubjects([...selectedSubjects, product]);
    }
  };

  const onPageRequest = (product: Product) => {
    if (product.images.length > 0) {
      setPageType("detail");
      setSelectedSubject(product);
      addTabbedPage(product);
    }
  };

  const handleCallIndex = () => {
    setPageType("list");
  };
  const removeSubjectfromArray = (product: Product) => {
    const filteredArray = selectedSubjects.filter((item) => product !== item);
    setSelectedSubjects(filteredArray);
  };

  const removeTabbedPage = (product: Product) => {
    //if the page is being removed from the tabs but is not currently open then we should stay on the open page and remove the tab
    //that would mean remove the item from the array but do not change the selectedSubject
    if (product === selectedSubject) {
      let originalIndex = selectedSubjects.findIndex(
        (item) => item.slug === product?.slug
      );
      //if its the last in the array then we need to go back one
      let newIndex =
        originalIndex + 1 == selectedSubjects.length
          ? originalIndex - 1
          : originalIndex + 1;

      if (newIndex !== -1) {
        setSelectedSubject(selectedSubjects[newIndex]);
      } else {
        setSelectedSubject(null);
        setPageType("list");
      }
    }
    removeSubjectfromArray(product);
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

  const handleNavBarClick = (product: Product | undefined) => {
    setPageType("detail");
    product &&
      (setSelectedSubject(product),
      selectedSubjects.includes(product)
        ? null
        : setSelectedSubjects([...selectedSubjects, product])); //**if this is a product that is not already in the array then add to the array
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

  return (
    <>
      <NavBar
        onNavClick={handleNavBarClick}
        onIndexClick={() => setPageType("list")}
        selectedSubjects={selectedSubjects}
        onCloseTab={handleCloseTab}
        selectedSubject={selectedSubject}
      />
      {pageType === "list" ? (
        <FileList
          categories={data.categories}
          handleSubjectSelect={onPageRequest}
          foundItems={foundItems}
          handleSearch={handleSearch}
        />
      ) : (
        <SubjectDetail
          selectedSubject={selectedSubject}
          onCallIndex={handleCallIndex}
          onClosePage={handleClosePage}
        />
      )}
    </>
  );
}

export default App;
