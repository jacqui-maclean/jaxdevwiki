import { Product } from "../../App";
import { BsArrowLeftSquare } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
import { SlArrowLeft } from "react-icons/sl"; //

import "./SubjectDetail.css";

interface Props {
  selectedSubject: Product | undefined | null;
  onCallIndex: () => void;
  onClosePage: (product: Product | undefined) => void;
}

const SubjectDetail = ({
  selectedSubject,
  onCallIndex,
  onClosePage,
}: Props) => {
  return (
    selectedSubject && (
      <>
        <div className="bg">
          <div className="icon-wrapper">
            <SlArrowLeft
              color="white"
              size="1.75rem"
              onClick={onCallIndex}
              style={{ paddingTop: "4px" }}
            />
            <AiOutlineClose
              color="white"
              size="2rem"
              onClick={() => onClosePage(selectedSubject)}
            />
          </div>
          <h3 style={{ color: "#adb5bd" }}>{selectedSubject?.title}</h3>;
          <p style={{ color: "#adb5bd" }}>{selectedSubject?.extraText}</p>
          {selectedSubject?.images.map((img, index) => (
            <img key={index} src={img} alt={`Image ${index}`} />
          ))}
        </div>
      </>
    )
  );
};

export default SubjectDetail;
