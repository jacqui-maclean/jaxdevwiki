import { useState } from "react";
import data from "./assets/data.json";
import "./App.css";
import SubjectDetail from "./components/SubjectDetail/SubjectDetail";
import FileList from "./components/FileList";

interface Data {
  data: Product[];
}
export interface Product {
  images: string[];
  extraText: string;
  tags: string[];
  slug: string;
  title: string;
  category: string;
}

function App() {
  const [pageType, setPageType] = useState("list");
  const [selectedSubject, setSelectedSubject] = useState<Product>();

  const handleClick = (product: Product) => {
    console.log("from handleClick in App.tsx ", product.title);
    if (product.images.length > 0) {
      setPageType("detail");
      setSelectedSubject(product);
    } else {
      console.log("no images for " + product.title);
    }
  };

  const handleSubjectClose = () => {
    setPageType("list");
  };

  return (
    <div className="container">
      {/* <CardList products={data} /> */}
      {pageType === "list" ? (
        <FileList products={data} onClick={handleClick} />
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
