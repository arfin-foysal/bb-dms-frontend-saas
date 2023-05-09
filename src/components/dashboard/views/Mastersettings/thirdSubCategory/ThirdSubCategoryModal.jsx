import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateThirdSubCategory from "./CreateThirdSubCategory";
import EditThirdSubCategory from "./EditThirdSubCategory";



const ThirdSubCategoryModal = ({ handleClose, show, clickValue, paramId }) => {

  



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
            <CreateThirdSubCategory handleClose={handleClose} />
          )}
          {clickValue === "Edit Category" && (
            <EditThirdSubCategory  handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(ThirdSubCategoryModal);
