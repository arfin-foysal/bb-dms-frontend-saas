import React, { useCallback, useState } from "react";
import PageTopHeader from "../../../common/PageTopHeader";
import Loader from "../../../common/Loader";
import { Link, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import avater from "../../../../../assets/images/profile-picture.png";

import { useDocumentpublishMutation } from "../../../../../services/documentApi";
import {
  BsFillArrowDownCircleFill,
  BsFillCheckCircleFill,
  BsFillEyeFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsXCircleFill,
} from "react-icons/bs";
import { RiUploadCloud2Fill } from "react-icons/ri";
import {
  DocumentPublish,
  deleteHandel,
  groupdownload,
} from "../../../../../utils/Document";
import {
  useGroupDeleteDocumentMutation,
  useGroupDocumentQuery,
  useSingalGroupQuery,
} from "../../../../../services/groupApi";
import NoImage from "../../../common/NoImage";
import { useSelector } from "react-redux";
import QuickUploadGroupModal from "./QuickUploadGroupModal";

export const GroupWiseDocument = () => {
  const { id } = useParams();
  const res = useGroupDocumentQuery(id);

  const authUser = useSelector((state) => state.auth.user);
  const [groupDeleteDocument] = useGroupDeleteDocumentMutation();
  const [documentpublish] = useDocumentpublishMutation();
  const { data, isFetching, isSuccess, isError } = res;
  const { data: singalData, isSuccess: singalDataSuccess } =
    useSingalGroupQuery(id);

  const [show, setShow] = useState(false);
  const [clickValue, setClickValue] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [paramId, setParamId] = useState(null);
  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  return (
    <>
      {isFetching && <Loader />}
      <QuickUploadGroupModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />
      <PageTopHeader title="Document" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between">
          <div>
            Group Document ||
            {singalDataSuccess &&
              singalData.data.user.map((item) => (
                <span>
                  <img
                    width={20}
                    alt={item.name}
                    className="rounded-circle pb-1 "
                    variant="top"
                    src={
                      item.image
                        ? `${import.meta.env.VITE_FILE_URL}${item.image}`
                        : avater
                    }
                  />
                </span>
              ))}
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              handleShow();
              handelClickValue("Add New Document");
              setParamId(id);
            }}
          >
            Add New Document
          </button>
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

          <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
            {isSuccess &&
              data?.map((item, i) => (
                <div className="mx-1 m-2 " key={i}>
                  <Card style={{ width: "15rem" }} className=" border-0">
                    <Link
                      className="mx-2"
                      to={
                        (authUser?.user_type === "Admin" &&
                          `/dashboard/group-singal-document-view/${item?.id}`) ||
                        (authUser?.user_type === "User" &&
                          `/dashboard/user/group-singal-document-view/${item?.id}`) ||
                        (authUser?.user_type === "Superadmin" &&
                          `/dashboard/superadmin/group-singal-document-view/${item?.id}`)
                      }
                    >
                      <NoImage item={item} />
                    </Link>

                    <Card.Body className=" px-2 text-dark">
                      <div className=" d-flex">
                        <div className="mb-1">
                          {item.status === "Pending" ? (
                            <span>
                              <BsXCircleFill className="mx-1" color="red" />
                              {item.status}
                            </span>
                          ) : (
                            <span>
                              <BsFillCheckCircleFill
                                className=" mx-1"
                                color="green"
                              />
                              Published
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
                          className="mx-2"
                          to={
                            (authUser?.user_type === "Admin" &&
                              `/dashboard/group-singal-document-view/${item?.id}`) ||
                            (authUser?.user_type === "User" &&
                              `/dashboard/user/group-singal-document-view/${item?.id}`) ||
                            (authUser?.user_type === "Superadmin" &&
                              `/dashboard/superadmin/group-singal-document-view/${item?.id}`)
                          }
                        >
                          <BsFillEyeFill color="blue" size={22} />
                        </Link>

                        <span className="pointer ml-3 mx-2">
                          <BsFillArrowDownCircleFill
                            onClick={(e) => groupdownload(e, item)}
                          />
                        </span>

                        {item?.is_shared === "no" &&
                          authUser?.id === item?.user_id && (
                            <Link
                              to="#"
                              onClick={() => {
                                handleShow();
                                handelClickValue("Edit Document");
                                setParamId(item);
                              }}
                              className="px-2"
                            >
                              <BsPencilSquare size={18} color="blue" />
                            </Link>
                          )}

                        {authUser?.id === item?.user_id && (
                          <BsFillTrashFill
                            className="pointer mx-1"
                            color="red"
                            size={17}
                            onClick={() =>
                              deleteHandel(groupDeleteDocument, item?.id)
                            }
                          />
                        )}

                        {item.status === "Pending" && (
                          <RiUploadCloud2Fill
                            className="pointer mx-2  "
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
