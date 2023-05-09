import React from "react";
import PageTopHeader from "../../../common/PageTopHeader";

import Loader from "../../../common/Loader";
import { Link, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import folder from "./../../../../../assets/images/File/file-folder.png";
import file from "./../../../../../assets/images/File/file.png";
import {
  useCateDocByCateIdQuery,
  useDeleteDocumentMutation,
  useDocumentpublishMutation,
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
import {
  DocumentPublish,
  deleteHandel,
  download,
  groupdownload,
} from "../../../../../utils/Document";
import {
  useGroupDeleteDocumentMutation,
  useGroupDocumentQuery,
  useSingalGroupQuery,
} from "../../../../../services/groupApi";
import NoImage from "../../../common/NoImage";

export const GroupWiseDocument = () => {
  const { id } = useParams();
  const res = useGroupDocumentQuery(id);
  const [groupDeleteDocument] = useGroupDeleteDocumentMutation();
  const [documentpublish] = useDocumentpublishMutation();

  const { data, isFetching, isSuccess, isError } = res;
  const { data: singalData, isSuccess: singalDataSuccess } = useSingalGroupQuery(id);

 

  return (
    <>
      <PageTopHeader title="Documnet" />
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-start ">
          <div>Group Document ||</div>
          {singalDataSuccess &&
                singalData.data.user.map((item) => (
                  <span>
                    <img
                      width={20}
                      alt={item.name}
                      className="rounded-circle pb-1 "
                      variant="top"
                      src={item.image?`${import.meta.env.VITE_FILE_URL}${item.image}` :"l"}
                    />
                  </span>
                ))}
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
                  {/* <Link
                    // to={`/documents/document_category_view/${category.id}`}
                    className=" "
                  > */}
                  <Card style={{ width: "15rem" }} className=" border-0">
                  <NoImage item={item} />
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
                          to={`/dashboard/group-singal-document-view/${item?.id}`}
                        >
                          <BsFillEyeFill color="blue" size={22} />
                        </Link>
                        <span className="pointer ml-3 ms-3">
                          <BsFillArrowDownCircleFill
                            onClick={(e) => groupdownload(e, item)}
                          />
                        </span>
                        {/* <Link
                          to={`/dashboard/edit-document/${item?.id}`}
                          className="px-3"
                        >
                          <BsPencilSquare size={18} color="blue" />
                        </Link> */}
                        <BsFillTrashFill
                          className="pointer mx-1"
                          color="red"
                          size={17}
                          onClick={() =>
                            deleteHandel(groupDeleteDocument, item?.id)
                          }
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
