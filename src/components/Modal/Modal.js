import { Modal } from "react-bootstrap";
import "./modal.scss";

const CustomModal = (props) => {
  return (
    <>
      <Modal
        show={props.show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>{props.title}</Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;
