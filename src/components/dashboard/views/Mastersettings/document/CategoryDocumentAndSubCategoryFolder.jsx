import React, { useState } from "react";
import PageTopHeader from "../../../common/PageTopHeader";

import Loader from "./../../../common/Loader";
import { Link, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import folder from "./../../../../../assets/images/File/file-folder.png";


import {
  useCateDocByCateIdQuery,
  useDeleteDocumentMutation,
  useDocumentpublishMutation,
  useSubCateFolderByCateIdQuery,
} from "../../../../../services/documentApi";
import {
  BsFillArrowDownCircleFill,
  BsFillCheckCircleFill,
  BsFillEyeFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsXCircleFill,
} from "react-icons/bs";
import { RiUploadCloud2Fill } from "react-icons/ri";
import {AiFillWarning} from "react-icons/ai"
import {
  DocumentPublish,
  deleteHandel,
  download,
} from "../../../../../utils/Document";
import NoImage from "../../../common/NoImage";
import QuickUploadModal from "./QuickUploadModal";
import { useSelector } from "react-redux";

export const CategoryDocumentAndSubCategoryFolder = () => {
  const authUser = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const res = useSubCateFolderByCateIdQuery(id);
  const { data, isFetching, isSuccess, isError } = res;
  const cateDocRes = useCateDocByCateIdQuery(id);
  const [documentpublish] = useDocumentpublishMutation();
  const [deleteDocument] = useDeleteDocumentMutation();

  const {
    data: cateDocData,
    isFetching: cateDocIsFetching,
    isSuccess: cateDocIsSuccess,
    isError: cateDocIsError,
  } = cateDocRes;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <QuickUploadModal show={show} handleClose={handleClose} />
      <PageTopHeader title="Documents" />
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-between ">
          <div>Documents</div>
          <div className="mt-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
              }}
            >
              Uploade Document
            </button>
          </div>
        </div>

        <div class="card-body ">
          {isFetching && <Loader />}

          {data?.length === 0 && (
            <div className="d-flex justify-content-center">
              <p className="text-center">No Data Found :)</p>
            </div>
          )}
          {isError && (
            <div className="d-flex justify-content-center">
              <p> Something went wrong (:</p>
            </div>
          )}

          {isSuccess && (
            <div className="d-flex flex-wrap ">
              {data.map((category, i) => (
                <div className="mx-1" key={i}>
                  <Link
                

                    to={
                      (authUser?.user_type === "Admin" &&
                      `/dashboard/sub-category-document-and-third-sub-category-folder/${category.id}`) ||
                      (authUser?.user_type === "User" &&
                      `/dashboard/user/sub-category-document-and-third-sub-category-folder/${category.id}`)
                    }
                    className=" m-2 "
                  >
                    <Card style={{ width: "7rem" }} className=" border-0">
                      <Card.Img
                        className="m-1 pointer "
                        variant="top"
                        src={folder}
                        alt={category.name}
                      />
                      <Card.Body className="p-0 m-0 ">
                        <Card.Title
                          style={{ fontSize: "100%" }}
                          className="text-center text-dark font-weight-bold"
                        >
                          {category.name}
                        </Card.Title>
                        <Card.Text> </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {cateDocIsFetching && <Loader />}

          {cateDocData?.data?.length === 0 && (
            <div className="d-flex justify-content-center">
              <p className="text-center">No Data Found :)</p>
            </div>
          )}
          {cateDocIsError && (
            <div className="d-flex justify-content-center">
              <p> Something went wrong (:</p>
            </div>
          )}

          <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
            {cateDocIsSuccess &&
              cateDocData.map((item, i) => (
                <div className="mx-1 m-2 " key={i}>
                  {/* <Link
                    // to={`/documents/document_category_view/${category.id}`}
                    className=" "
                  > */}
                  <Card style={{ width: "15rem" }} className=" border-0">
                    <NoImage item={item} />
                    <Card.Body className=" px-2 text-dark">
                      <div className=" d-flex">
                        <div className="mb-1">

                          {item.admin_status === "Pending" && (
                            <span>
                              <AiFillWarning className="mx-1" color="orange" />
                              {item.admin_status}
                            </span>
                          )}
                          {item.admin_status === "Active" && (
                            <span>
                              <BsFillCheckCircleFill className="mx-1" color="green"  />
                              Published
                            </span>
                          )}
                          {item.admin_status === "Cancel" && (
                            <span>
                              <BsXCircleFill className="mx-1" color="red"  />
                              Canceled
                            </span>
                          )}


                        </div>
                      </div>

                      <Card.Title className="m-0 p-0 h6">
                        <b>{item.name.slice(0, 15)}</b>
                      </Card.Title>
                      <Card.Text
                        className="m-0 p-0"
                        style={{ fontSize: "11px" }}
                      >
                        Author by: {item?.user?.name}
                      </Card.Text>
                    </Card.Body>

                    <div className="text-center  py-2 shadow text-dark ">
                      <div>
                        <Link
                        

                          to={
                            (authUser?.user_type === "Admin" &&
                            `/dashboard/document-view/${item.id}`) ||
                            (authUser?.user_type === "User" &&
                            `/dashboard/user/document-view/${item.id}`)
                          }
                        
                        >
                          <BsFillEyeFill color="blue" size={22} />
                        </Link>
                        <span className="pointer ml-3 ms-3">
                          <BsFillArrowDownCircleFill
                            onClick={(e) => download(e, item)}
                          />
                        </span>
                        <Link
                          className="px-3"

                          to={
                            (authUser?.user_type === "Admin" &&
                            `/dashboard/edit-document/${item.id}`) ||
                            (authUser?.user_type === "User" &&
                            `/dashboard/user/edit-document/${item.id}`)
                          }
                        >
                          <BsPencilSquare size={18} color="blue" />
                        </Link>
                        <BsFillTrashFill
                          className="pointer mx-1"
                          color="red"
                          size={17}
                          onClick={() => deleteHandel(deleteDocument, item.id)}
                        />
                        {item.status === "Pending" && (
                          <RiUploadCloud2Fill
                            className="pointer mx-1  "
                            color="Teal"
                            size={22}
                            onClick={(e) =>
                              DocumentPublish(documentpublish, item.id)
                            }
                          />
                        )}
                      </div>
                    </div>
                  </Card>
                  {/* </Link> */}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
