import { useState } from "react";
import reactLogo from "./assets/react.svg";
import data from "./assets/data.json";
import "./App.css";
import CardList from "./components/CardList";
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
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container bg">
      {/* <CardList products={data} /> */}
      <FileList products={data} />
    </div>
  );
}

export default App;
