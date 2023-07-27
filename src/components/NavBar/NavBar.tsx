import "./NavBar.css";

interface Props {
  selectedSubject: string | null;
  onPageSelect: (subject: string | null) => void;
}

const NavBar = ({ selectedSubject, onPageSelect }: Props) => {
  return (
    <div style={{ display: "flex" }}>
      <div className="navbar-item" onClick={() => onPageSelect("index")}>
        Index
      </div>
      <div
        className="navbar-item"
        onClick={() => onPageSelect(selectedSubject)}
      >
        {selectedSubject}
      </div>
    </div>
  );
};

export default NavBar;
