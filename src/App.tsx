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

  const onSubjectSelection = (product: Product) => {
    product.images.length > 0 &&
      (setPageType("detail"), setSelectedSubject(product));
  };

  const handleSubjectClose = () => {
    setPageType("list");
  };

  const handlePageSelect = (subject: string | null) => {
    subject === "index" ? setPageType("list") : setPageType("detail");
    console.log("subject: ", subject);
  };

  let subject: string | null = selectedSubject ? selectedSubject.title : null;

  return (
    <>
      <NavBar onPageSelect={handlePageSelect} selectedSubject={subject} />
      <div className="navigation-bar">
        {pageType === "list" ? (
          <FileList
            categories={data.categories}
            handleSubjectSelect={onSubjectSelection}
          />
        ) : (
          <SubjectDetail
            selectedSubject={selectedSubject}
            onSubjectClose={handleSubjectClose}
          />
        )}
      </div>
    </>
  );
}

export default App;
