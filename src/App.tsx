import { useState } from "react";
import data from "./assets/data.json";
import "./App.css";
import SubjectDetail from "./components/SubjectDetail/SubjectDetail";
import FileList from "./components/FileList";

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

  const handleClick = (product: Product) => {
    product.images.length > 0 && setPageType("detail");
    setSelectedSubject(product);
  };

  const handleSubjectClose = () => {
    setPageType("list");
  };

  return (
    <div className="identifier">
      {pageType === "list" ? (
        <FileList categories={data.categories} onClick={handleClick} />
      ) : (
        <SubjectDetail
          selectedSubject={selectedSubject}
          onSubjectClose={handleSubjectClose}
        />
      )}
    </div>
  );
}

export default App;
