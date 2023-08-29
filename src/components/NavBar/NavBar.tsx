import { AiOutlineClose } from "react-icons/ai";
import { Product } from "../../App";
import "./NavBar.css";
interface Props {
  viewPage: (product: Product | undefined) => void;
  goToHome: () => void;
  tabs: Product[];
  currentPage: Product | null;
  closeTab: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    product: Product
  ) => void;
}

const NavBar = ({ viewPage, goToHome, tabs, closeTab, currentPage }: Props) => {
  return (
    <div style={{ display: "flex" }}>
      <div className="navbar-item" onClick={() => goToHome()}>
        Index
      </div>
      {tabs.map((subject) => (
        <div
          className={
            subject.title === currentPage?.title
              ? "navbar-item selected"
              : "navbar-item "
          }
          onClick={() => viewPage(subject)}
          key={subject.slug}
        >
          {subject.title}

          <div className="close-button">
            <AiOutlineClose
              color="black"
              size="1rem"
              onClick={(event) => closeTab(event, subject)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavBar;
