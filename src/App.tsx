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
  const [selectedSubject, setSelectedSubject] = useState<Product | null>();
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
    const filteredArray = selectedSubjects.filter((item) => product !== item);
    setSelectedSubjects(filteredArray);
    setSelectedSubject(null);
  };
  const handleCloseTab = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    product: Product | undefined
  ) => {
    event.stopPropagation();
    let originalIndex = selectedSubjects.findIndex(
      (item) => item.slug === product?.slug
    );
    // then we need to set the new selectedSubject to the one ahead of it
    if (selectedSubjects.length > 1) {
      setSelectedSubject(selectedSubjects[originalIndex + 1]);
    } else {
      setSelectedSubject(null);
      setPageType("list");
    }
    //then we need to remove the product from the array
    const filteredArray = selectedSubjects.filter((item) => product !== item);
    setSelectedSubjects(filteredArray);
  };

  const handleNavBarClick = (product: Product | undefined) => {
    console.log("handleNavBarClick called");
    setPageType("detail");
    product &&
      (setSelectedSubject(product),
      selectedSubjects.includes(product)
        ? null
        : setSelectedSubjects([...selectedSubjects, product])); //**if this is a product that is not already in the array then add to the array
  };

  return (
    <>
      <NavBar
        onNavClick={handleNavBarClick}
        onIndexClick={() => setPageType("list")}
        selectedSubjects={selectedSubjects}
        onCloseTab={handleCloseTab}
      />
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
    </>
  );
}

export default App;
