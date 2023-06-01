import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateCategory from './CreateCategory';
import EditCategory from "./EditCategory";


const CategoryModal = ({ handleClose, show, clickValue, paramId }) => {

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
          {clickValue === "Add New Category" && (
            <CreateCategory handleClose={handleClose} />
          )}
          {clickValue === "Edit Category" && (
            <EditCategory  handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(CategoryModal);
