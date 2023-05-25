import React from "react";
import { Modal } from "react-bootstrap";
import UploadGroupDocument from "./UploadGroupDocument";
import EditGroupDocument from "./EditGroupDocument";


const QuickUploadGroupModal = ({ handleClose, show, clickValue, paramId }) => {


  return (
    <div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header
          closeButton
          className=" text-white"
          style={{ backgroundColor: "#3f4d67" }}
        >
          <Modal.Title>{clickValue}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clickValue === "Add New Documnet" && (
            <UploadGroupDocument handleClose={handleClose} param={paramId}/>
          )}
          {clickValue === "Edit Documnet" && (
            <EditGroupDocument  handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
   
    </div>
  );
};

export default QuickUploadGroupModal;
