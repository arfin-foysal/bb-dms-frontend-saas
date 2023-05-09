import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateCategory from './CreateGroup';
import EditCategory from "./EditGroup";


const GroupModal = ({ handleClose, show, clickValue, paramId }) => {

  



  return (
    <>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header
          closeButton
          className=" text-white"
          style={{ backgroundColor: "#3f4d67" }}
        >
          <Modal.Title>{clickValue}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clickValue === "Add New Group" && (
            <CreateCategory handleClose={handleClose} />
          )}
          {clickValue === "Edit Group" && (
            <EditCategory  handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(GroupModal);
