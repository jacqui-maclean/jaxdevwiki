import { Product } from "../../App";
import { BsArrowLeftSquare } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
import { SlArrowLeft } from "react-icons/sl"; //
//TODO find a home icon
import "./SubjectDetail.css";

interface Props {
  currentPage: Product | null;
  goToHome: () => void;
  closePage: (product: Product) => void;
}

const SubjectDetail = ({ currentPage, goToHome, closePage }: Props) => {
  return (
    currentPage && (
      <div className="text-color">
        <div className="icon-wrapper">
          <SlArrowLeft
            color="black"
            size="1.75rem"
            onClick={goToHome}
            style={{ paddingTop: "4px" }}
          />
          <AiOutlineClose
            color="black"
            size="2rem"
            onClick={() => closePage(currentPage)}
          />
        </div>
        {/* TODO - make sure that the animations still work if we use className instead of inline styles*/}
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
