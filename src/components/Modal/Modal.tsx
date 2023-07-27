import "./modal.css";

interface Props {
  handleClose: () => void;
  image: string | undefined;
  show: boolean;
  images: string[] | undefined;
  extraText: string | undefined;
}
//TODO get extraText on Modal
//TODO get modal to scroll
//TODO figure out what width etc to put in modal image
const Modal = ({ handleClose, show, image, images, extraText }: Props) => {
  let showHideClassName = show
    ? "customModal display-block"
    : "customModal display-none";
  return (
    <div style={{ zIndex: "3" }} className={showHideClassName}>
      <section className="customModal-main gradientModal">
        {/* <div content-container>
          {images?.map((img) => (
            <img src={img} />
          ))}
          <p className="nocomp">{extraText}</p>
          {extraText ? <p>{extraText}</p> : null}
        </div> */}

        <button type="button" onClick={handleClose} className="btn btn-primary">
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
