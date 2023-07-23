import { useState } from "react";
import reactLogo from "./assets/react.svg";
import data from "./assets/data.json";
import "./App.css";
import CardList from "./components/CardList";

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
    <div className="App">
      {/* <img
        src="/images/arrowFunctionsAndThis.jpg"
        height="400px"
        width="400px"
        alt="Example"
      /> */}
      <CardList products={data} />
      {/* {data.map((item) => (
        <div>
          {item.title}

          <img
            src={item.images[0]}
            height="400px"
            width="400px"
            alt="Example"
          />
         
        </div>
      ))} */}
    </div>
  );
}

export default App;
