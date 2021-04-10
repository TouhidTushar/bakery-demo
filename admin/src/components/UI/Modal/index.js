import "./style.css";

const Modal = (props) => {
  if (!props.show) {
    return null;
  } else {
    document.body.style.overflow = "hidden";
    return (
      <>
        <div className="modalOverlay">
          <div className="modalWrapper">
            <div className="modalHeader">
              <i
                className="fas fa-times"
                id="modalCloseBtn"
                onClick={() => {
                  props.modalClose();
                  props.clearState();
                  document.body.style.overflow = "unset";
                }}
              ></i>
              <h3 className="modalTitle">{props.modalTitle}</h3>
            </div>
            <div className="modalBody">{props.children}</div>
          </div>
        </div>
      </>
    );
  }
};

export default Modal;
