import { Product } from "../../App";
import { BsArrowLeftSquare } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
import { SlArrowLeft } from "react-icons/sl"; //

import "./SubjectDetail.css";

interface Props {
  selectedSubject: Product | null;
  onCallIndex: () => void;
  onClosePage: (product: Product) => void;
}

const SubjectDetail = ({
  selectedSubject,
  onCallIndex,
  onClosePage,
}: Props) => {
  return (
    selectedSubject && (
      <>
        <div className="icon-wrapper">
          <SlArrowLeft
            color="black"
            size="1.75rem"
            onClick={onCallIndex}
            style={{ paddingTop: "4px" }}
          />
          <AiOutlineClose
            color="black"
            size="2rem"
            onClick={() => onClosePage(selectedSubject)}
          />
        </div>
        <h3 style={{ color: "#adb5bd" }}>{selectedSubject?.title}</h3>
        <p style={{ color: "#adb5bd" }}>{selectedSubject?.extraText}</p>
        {selectedSubject?.images.map((img, index) => (
          <img key={index} src={img} alt={`Image ${index}`} />
        ))}
      </>
    )
  );
};

export default SubjectDetail;
