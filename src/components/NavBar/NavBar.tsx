import { AiOutlineClose } from "react-icons/ai";
import { Product } from "../../App";
import "./NavBar.css";
interface Props {
  onNavClick: (product: Product | undefined) => void;
  onIndexClick: () => void;
  selectedSubjects: Product[];
  onCloseTab: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    product: Product
  ) => void;
}

const NavBar = ({
  onNavClick,
  onIndexClick,
  selectedSubjects,
  onCloseTab,
}: Props) => {
  return (
    <div style={{ display: "flex" }}>
      <div className="navbar-item" onClick={() => onIndexClick()}>
        Index
      </div>
      {selectedSubjects.map((subject) => (
        <div
          className="navbar-item"
          onClick={() => onNavClick(subject)}
          key={subject.slug}
        >
          {subject.title}

          <div className="close-button">
            <AiOutlineClose
              color="black"
              size="1rem"
              onClick={(event) => onCloseTab(event, subject)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavBar;
