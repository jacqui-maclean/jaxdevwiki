import "./modal.css";

interface Props {
  handleClose: () => void;
  image: string | undefined;
  show: boolean;
}

const Modal = ({ handleClose, show, image }: Props) => {
  let showHideClassName = show
    ? "customModal display-block"
    : "customModal display-none";
  return (
    <div style={{ zIndex: "3" }} className={showHideClassName}>
      <section className="customModal-main gradientModal">
        <img src={image} width="500px" height="700" />
        <button type="button" onClick={handleClose} className="btn btn-primary">
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
