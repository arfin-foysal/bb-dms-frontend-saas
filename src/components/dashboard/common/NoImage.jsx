import React from "react";
import { Card } from "react-bootstrap";
import csv from "./../../../assets/images/fileimage/csv.png"
import doc from "./../../../assets/images/fileimage/doc.png"
import docx from "./../../../assets/images/fileimage/docx.png"
import xls from "./../../../assets/images/fileimage/xls.png"
import xlsx from "./../../../assets/images/fileimage/xlsx.png"
import ppt from "./../../../assets/images/fileimage/ppt.png"
import pptx from "./../../../assets/images/fileimage/pptx.png"
import xlx from "./../../../assets/images/fileimage/xlx.jpg"

const NoImage = ({ item }) => {
  return (
    <>
      {item?.file?.split(".")?.pop()?.toLowerCase() === "pdf" && (
        <div className="text-center">
          <embed
            src={`${import.meta.env.VITE_DOC_FILE_URL}${item?.file}`}
            width="100%"
            height="150px"
            type="application/pdf"
          />
        </div>
      )}

      {item?.file?.split(".").pop().toLowerCase() === "doc" && (
         <Card.Img
         className="m-1 pointer  "
         height="150px"
         width="100%"
         variant="top"
         src={doc}
         alt={item.name}
       />
      )}
      {item?.file?.split(".").pop().toLowerCase() === "docx" && (
        <div className="text-center">
           <Card.Img
         className="m-1 pointer  "
         height="150px"
         width="100%"
         variant="top"
         src={docx}
         alt={item.name}
       />
        </div>
      )}
      {item?.file?.split(".").pop().toLowerCase() === "xlx" && (
        <div className="text-center">
           <Card.Img
         className="m-1 pointer  "
         height="150px"
         width="100%"
         variant="top"
         src={xlx}
         alt={item.name}
       />
        </div>
      )}
      {item?.file?.split(".").pop().toLowerCase() === "xls" && (
        <div className="text-center">
           <Card.Img
         className="m-1 pointer  "
         height="150px"
         width="100%"
         variant="top"
         src={xls}
         alt={item.name}
       />
        </div>
      )}
      {item?.file?.split(".").pop().toLowerCase() === "xlsx" && (
        <div className="text-center">
             <Card.Img
         className="m-1 pointer  "
         height="150px"
         width="100%"
         variant="top"
         src={xlsx}
         alt={item.name}
       />
        </div>
      )}
      {item?.file?.split(".").pop().toLowerCase() === "ppt" && (
        <div className="text-center">
              <Card.Img
         className="m-1 pointer  "
         height="150px"
         width="100%"
         variant="top"
         src={ppt}
         alt={item.name}
       />
        </div>
      )}
      {item?.file?.split(".").pop().toLowerCase() === "pptx" && (
        <div className="text-center">
               <Card.Img
         className="m-1 pointer  "
         height="150px"
         width="100%"
         variant="top"
         src={pptx}
         alt={item.name}
       />
        </div>
      )}
      {item?.file?.split(".").pop().toLowerCase() === "txt" && (
        <div className="text-center">
          <embed
            src={`${import.meta.env.VITE_DOC_FILE_URL}${item?.file}`}
            width="100%"
            height="150px"
            type="text/plain"
          />
        </div>
      )}
      {item?.file?.split(".").pop().toLowerCase() === "csv" && (
        <div className="text-center">
          <Card.Img
          className="m-1 pointer  "
          height="150px"
          width="100%"
          variant="top"
          src={csv}
          alt={item.name}
        />
        </div>
      )}

      {item?.file?.split(".").pop().toLowerCase() === "jpg" && (
        <Card.Img
          className="m-1 pointer  "
          height="150px"
          width="100%"
          variant="top"
          src={`${import.meta.env.VITE_DOC_FILE_URL}${item?.file}`}
          alt={item.name}
        />
      )}
      {item?.file?.split(".").pop().toLowerCase() === "png" && (
        <Card.Img
          className="m-1 pointer  "
          height="150px"
          width="100%"
          variant="top"
          src={`${import.meta.env.VITE_DOC_FILE_URL}${item?.file}`}
          alt={item.name}
        />
      )}
      {item?.file?.split(".").pop().toLowerCase() === "jpeg" && (
        <Card.Img
          className="m-1 pointer  "
          height="150px"
          width="100%"
          variant="top"
          src={`${import.meta.env.VITE_DOC_FILE_URL}${item?.file}`}
          alt={item.name}
        />
      )}

      {item?.file?.split(".").pop().toLowerCase() === "svg" && (
        <Card.Img
          className="m-1 pointer  "
          height="150px"
          width="100%"
          variant="top"
          src={`${import.meta.env.VITE_DOC_FILE_URL}${item?.file}`}
          alt={item.name}
        />
      )}
      {item?.file?.split(".").pop().toLowerCase() === "gif" && (
        <Card.Img
          className="m-1 pointer  "
          height="150px"
          width="100%"
          variant="top"
          src={`${import.meta.env.VITE_DOC_FILE_URL}${item?.file}`}
          alt={item.name}
        />
      )}
    </>
  );
};

export default NoImage;
