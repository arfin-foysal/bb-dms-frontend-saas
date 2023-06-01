import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateSuperadmin from "./CreateSuperadmin";
import EditSuperadmin from "./EditSuperadmin";



const UserModal = ({ handleClose, show, clickValue, paramId }) => {

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header
          closeButton
          className=" text-white"
          style={{ backgroundColor: "#3f4d67" }}
        >
          <Modal.Title>{clickValue}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clickValue === "Add New Super Admin" && (
            <CreateSuperadmin handleClose={handleClose} />
          )}
          {clickValue === "Edit Super Admin" && (
            <EditSuperadmin  handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(UserModal);
