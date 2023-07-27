import { useState } from "react";
import data from "./assets/data.json";
import "./App.css";
import SubjectDetail from "./components/SubjectDetail/SubjectDetail";
import FileList from "./components/FileList";
import NavBar from "./components/NavBar/NavBar";

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
  const [selectedSubject, setSelectedSubject] = useState<Product>();
  const [selectedSubjects, setSelectedSubjects] = useState<Product[]>([]);

  const onSubjectSelection = (product: Product) => {
    product.images.length > 0 &&
      (setPageType("detail"),
      setSelectedSubject(product),
      setSelectedSubjects([...selectedSubjects, product])); //**add to the array
  };

  const handleCallIndex = () => {
    setPageType("list");
  };
  const handleClosePage = (product: Product | undefined) => {
    setPageType("list");
    //remove the selected product from the array of selected products
    const filteredArray = selectedSubjects.filter((item) => product !== item);
    setSelectedSubjects(filteredArray);
  };
  //just the title of the selected subject is passed in
  const handleNavBarClick = (product: Product | undefined) => {
    setPageType("detail");
    product &&
      (setSelectedSubject(product),
      //we need to check if this product is already in the array of selectedItems
      //if it is, then we don't want to add it again
      //if it is not, then we want to add it
      selectedSubjects.includes(product)
        ? null
        : setSelectedSubjects([...selectedSubjects, product])); //**if there is a product that is not already in the array then add to the array
  };

  //currently we pass in the just the title of the one selected subject
  //we will need to pass in an array of titles, so that we can have multiple subjects selected
  //so here we will be pushing to an array in state called selectedSubjects

  return (
    <>
      <NavBar
        onNavClick={handleNavBarClick}
        selectedSubject={selectedSubject}
        onIndexClick={() => setPageType("list")}
        selectedSubjects={selectedSubjects}
      />
      <div className="navigation-bar">
        {pageType === "list" ? (
          <FileList
            categories={data.categories}
            handleSubjectSelect={onSubjectSelection}
          />
        ) : (
          <SubjectDetail
            selectedSubject={selectedSubject}
            onCallIndex={handleCallIndex}
            onClosePage={handleClosePage}
          />
        )}
      </div>
    </>
  );
}

export default App;
