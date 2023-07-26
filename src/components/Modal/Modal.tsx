import "./modal.css";

interface Props {
  handleClose: () => void;
  image: string | undefined;
  show: boolean;
  images: string[] | undefined;
}

const Modal = ({ handleClose, show, image, images }: Props) => {
  let showHideClassName = show
    ? "customModal display-block"
    : "customModal display-none";
  return (
    <div style={{ zIndex: "3" }} className={showHideClassName}>
      <section className="customModal-main gradientModal">
        <div content-container>
          {images?.map((img) => (
            <img src={img} width="500px" height="700" />
          ))}
        </div>

        <button type="button" onClick={handleClose} className="btn btn-primary">
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
