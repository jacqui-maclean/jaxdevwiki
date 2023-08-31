import { Product } from "../../App";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import "./SubjectDetail.css";

interface Props {
  currentPage: Product | null;
  goToHome: () => void;
  closePage: (product: Product) => void;
  clearTabs: () => void;
}

const SubjectDetail = ({
  currentPage,
  goToHome,
  closePage,
  clearTabs,
}: Props) => {
  return (
    currentPage && (
      <div className="text-color">
        <div className="icon-wrapper">
          <AiOutlineHome
            color="black"
            size="2rem"
            onClick={goToHome}
            style={{ paddingTop: "4px" }}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={clearTabs}
          >
            Clear Tabs
          </button>
          <AiOutlineClose
            color="black"
            size="1.75rem"
            onClick={() => closePage(currentPage)}
          />
        </div>
        <h3>{currentPage?.title}</h3>
        <p>{currentPage?.extraText}</p>
        {currentPage?.images.map((img, index) => (
          <img key={index} src={img} alt={`Image ${index}`} />
        ))}
      </div>
    )
  );
};

export default SubjectDetail;
