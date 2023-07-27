import { Product } from "../../App";
import { BsArrowLeftSquare } from "react-icons/bs";
interface Props {
  selectedSubject: Product | undefined;
  onSubjectClose: () => void;
}

const SubjectDetail = ({ selectedSubject, onSubjectClose }: Props) => {
  return (
    <>
      <div className="content-container bg">
        <div
          className="header"
          style={{ display: "flex", justifyContent: "spaceBetween" }}
        >
          <BsArrowLeftSquare
            color="white"
            size="3rem"
            onClick={onSubjectClose}
          />
        </div>
        <h3 style={{ color: "#adb5bd" }}>{selectedSubject?.title}</h3>;
        <p style={{ color: "#adb5bd" }}>{selectedSubject?.extraText}</p>
        {selectedSubject?.images.map((img, index) => (
          <img key={index} src={img} />
        ))}
      </div>
    </>
  );
};

export default SubjectDetail;
