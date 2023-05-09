import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateUser from './CreateUser';
import EditUser from "./EditUser";


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
          {clickValue === "Add New User" && (
            <CreateUser handleClose={handleClose} />
          )}
          {clickValue === "Edit User" && (
            <EditUser  handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(UserModal);
