import React from "react";
import { Modal } from "react-bootstrap";
import UploadDocument from "./UploadDocument";

const QuickUploadModal = ({show, handleClose}) => {
  return (
    <div>
      <>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header
            closeButton
            className=" text-white"
            style={{ backgroundColor: "#3f4d67" }}
          >
            <Modal.Title>Quick Upload</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UploadDocument handleClose={handleClose} />
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default QuickUploadModal;
