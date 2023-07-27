import { Product } from "../../App";
import { BsArrowLeftSquare } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";

interface Props {
  selectedSubject: Product | undefined;
  onCallIndex: () => void;
  onClosePage: (product: Product | undefined) => void;
}

const SubjectDetail = ({
  selectedSubject,
  onCallIndex,
  onClosePage,
}: Props) => {
  return (
    <>
      <div className="content-container bg">
        <div style={{ display: "flex", justifyContent: "spaceBetween" }}>
          <div>
            <MdArrowBackIosNew
              color="white"
              size="3rem"
              onClick={onCallIndex}
            />
          </div>
          <div>
            <AiOutlineClose
              color="white"
              size="3rem"
              onClick={() => onClosePage(selectedSubject)}
            />
          </div>
        </div>
        <h3 style={{ color: "#adb5bd" }}>{selectedSubject?.title}</h3>;
        <p style={{ color: "#adb5bd" }}>{selectedSubject?.extraText}</p>
        {selectedSubject?.images.map((img, index) => (
          <img key={index} src={img} alt={`Image ${index}`} />
        ))}
      </div>
    </>
  );
};

export default SubjectDetail;
