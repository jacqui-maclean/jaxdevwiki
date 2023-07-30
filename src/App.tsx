import { useState } from "react";
import data from "./assets/data.json";
import FileList from "./components/FileList";
import NavBar from "./components/NavBar/NavBar";
import SubjectDetail from "./components/SubjectDetail/SubjectDetail";
import "./App.css";
//although not used I like to see the represenation of Data here
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
