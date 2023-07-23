import "./modal.css";

interface Props {
  handleClose: () => void;
  image: string;
  show: boolean;
}

const Modal = ({ handleClose, show, image }: Props) => {
  let showHideClassName = show
    ? "customModal display-block"
    : "customModal display-none";
  return (
    <div style={{ zIndex: "1" }} className={showHideClassName}>
      <section className="customModal-main">
        <img src={image} width="300px" height="500" />
        <button type="button" onClick={handleClose} className="btn btn-primary">
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
