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
  const [selectedSubject, setSelectedSubject] = useState<Product | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<Product[]>([]);

  const onAddTabbedPage = (product: Product) => {
    product.images.length > 0 &&
      (setPageType("detail"),
      setSelectedSubject(product),
      setSelectedSubjects([...selectedSubjects, product])); //**add to the array
  };

  const handleCallIndex = () => {
    setPageType("list");
  };

  const removeTabbedPage = (product: Product) => {
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
    //then we need to remove the product from the array
    const filteredArray = selectedSubjects.filter((item) => product !== item);
    setSelectedSubjects(filteredArray);
  };

  const handleClosePage = (product: Product) => {
    removeTabbedPage(product);
  };
  const handleCloseTab = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    product: Product
  ) => {
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
          handleSubjectSelect={onAddTabbedPage}
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
