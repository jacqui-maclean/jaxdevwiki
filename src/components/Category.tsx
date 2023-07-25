import { Product } from "../App";

interface Props {
  products: Product[];
  heading: string;
}

const Category = ({ products, heading }: Props) => {
  let renderedHeading = heading.toUpperCase();
  let items = products.filter((item) => item.category == heading);
  return (
    <div className="card mt-9">
      <div>{renderedHeading}</div>
      {items.map((item: Product) => (
        <div key={item.slug}>{item.title}</div>
      ))}
    </div>
  );
};

export default Category;
