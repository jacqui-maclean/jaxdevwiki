import { Product } from "../../App";
import "./NavBar.css";
//pass in the just the title of the selected subject
//pass back the title on click
interface Props {
  selectedSubject: Product | undefined;
  onNavClick: (product: Product | undefined) => void;
  onIndexClick: () => void;
  selectedSubjects: Product[];
}

const NavBar = ({
  selectedSubject,
  onNavClick,
  onIndexClick,
  selectedSubjects,
}: Props) => {
  console.log("selectedSubjectTitle passed to navbar", selectedSubject);
  return (
    <div style={{ display: "flex" }}>
      <div className="navbar-item" onClick={() => onIndexClick()}>
        Index
      </div>
      {/* <div className="navbar-item" onClick={() => onNavClick(selectedSubject)}>
        {selectedSubject?.title}
      </div> */}
      {selectedSubjects.map((subject) => (
        <div className="navbar-item" onClick={() => onNavClick(subject)}>
          {subject.title}
        </div>
      ))}
    </div>
  );
};

export default NavBar;
