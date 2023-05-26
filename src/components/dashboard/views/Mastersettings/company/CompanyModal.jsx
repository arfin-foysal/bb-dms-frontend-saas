import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateCompany from './CreateCompany';
import EditCompany from "./EditCompnay";


const CompanyModal = ({ handleClose, show, clickValue, paramId }) => {

  



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
          {clickValue === "Add New Company" && (
            <CreateCompany handleClose={handleClose} />
          )}
          {clickValue === "Edit Company" && (
            <EditCompany  handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(CompanyModal);
