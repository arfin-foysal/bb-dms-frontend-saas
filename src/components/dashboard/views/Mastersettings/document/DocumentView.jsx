import React, { useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import {
  BsArrowLeftCircleFill,
  BsFillCheckCircleFill,
  BsFillInfoCircleFill,
  BsXCircleFill,
} from "react-icons/bs";
import {
  useDocumentpublishMutation,
  useViewDocumentQuery,
} from "../../../../../services/documentApi";
import { useNavigate, useParams } from "react-router-dom";
import downloade from "./../../../../../assets/images/File/download.png";
import shareDoc from "./../../../../../assets/images/File/shere_ic.png";
import cloud from "./../../../../../assets/images/File/cloud.png";
import shere_ic from "./../../../../../assets/images/File/shere_ic.png";
import { DocumentPublish, download } from "../../../../../utils/Document";

import { toast } from "react-toastify";
import {
  useShareDocumentMutation,
  useUserWiseGroupViewQuery,
} from "../../../../../services/groupApi";
import Loader from "../../../common/Loader";

const DocumentView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const res = useViewDocumentQuery(id);
  const { data, isFetching, isSuccess, isError } = res;
  const [documentpublish] = useDocumentpublishMutation();
  const [shareDocument] = useShareDocumentMutation();
  const { data: userData, isSuccess: userSuccess } =
    useUserWiseGroupViewQuery();

  const [smShow, setSmShow] = useState(false);
  const [group_id, setGroupId] = useState();

  const [share, setShare] = useState({
    name: "",
    description: "",
    file: "",
    doc_id: "",
  });






  const shareDocHandler = (doc) => {


    setShare({
      name: doc.name,
      description: doc.description,
      file: doc.file,
      doc_id: doc.id,

    });
  };

  const shareHandler = async () => {
    try {
      const result = await shareDocument({
        name: share.name,
        description: share.description,
        file: share.file,
        group_id: group_id,
        doc_id: share?.doc_id,
      }).unwrap();
      setSmShow(false);
      toast.success(result.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-xs">
            <img width={35} src={shere_ic} alt="" />
            Share Document
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-group">
            <Form.Control
              as="select"
              className="mb-3 "
              name="group_id"
              onChange={(e) => setGroupId(e.target.value)}
            >
              <option>Select Group</option>
              {userSuccess &&
                userData.data?.map((item, i) => (
                  <option key={i} value={item?.group?.id}>
                    {item?.group?.name}
                  </option>
                ))}
            </Form.Control>
            <div className="text-end">
              <Button
                onClick={() => shareHandler()}
                type="submit"
                className="btn btn-primary btn-sm"
              >
                Share now
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <div>
              <Card.Title as="h5">Document </Card.Title>
            </div>

            <div>
              <span className="me-auto pointer">
                <div
                  onClick={() => navigate(-1)}
                >
                  <BsArrowLeftCircleFill color="black" size={"20px"} />
                </div>
              </span>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
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
            <Row>
              <Col>
                <Row>
                  <Col md={3}>
                    <Card className=" border-0 shadow">
                      <div className="d-flex flex-wrap justify-content-start">
                        <div>
                          <img
                            onClick={(e) => download(e, data?.data)}
                            className="btn"
                            width={60}
                            src={downloade}
                            alt=""
                          />
                        </div>
                        <div>
                          {data?.data?.admin_status === "Pending" && data?.data?.status !=="Active" &&(
                            <img
                              onClick={(e) =>
                                DocumentPublish(documentpublish, data?.data?.id)
                              }
                              className="btn"
                              width={60}
                              src={cloud}
                              alt=""
                            />
                          )}
                        </div>

                        <div>
                          <img
                            onClick={() => {
                              setSmShow(true);
                              shareDocHandler(data?.data);
                            }}
                            className="btn"
                            width={60}
                            src={shareDoc}
                            alt=""
                          />
                        </div>
                      </div>

                      <div className=" mx-3 ">
                        <div>
                          <hr />
                          <h5>
                            {" "}
                            <BsFillInfoCircleFill />
                            INFORMATION
                          </h5>
                          <hr />
                        </div>
                        <div className=" py-2">
                          <b>Document Name:</b> <br />
                          <p className="text-primary ">
                            <b>{data?.data?.name}</b>
                          </p>
                        </div>
                        <div className=" py-2">
                          <b>Category Name:</b> <br />{" "}
                          <p className="text-primary ">
                            <b> {data?.data?.catagory?.name}</b>
                          </p>
                        </div>

                        <div className=" py-2">
                          <b>Status:</b> <br />
                          {data?.data?.status === "Active" ? (
                            <BsFillCheckCircleFill color="green" />
                          ) : (
                            <BsXCircleFill color="red" />
                          )}
                          {data?.data?.status}
                        </div>
                        <div className=" py-2">
                          <b>Created By:</b> <br />
                          <p className="text-primary ">
                            <b> {data?.data?.user?.name} </b>{" "}
                          </p>
                        </div>
                        {/* <div className=" py-2">
                        <b>Created at :</b> <br />
                        Time: <DayJS format="h:mm A">{data?.data?.created_at}</DayJS>
                        <br />
                        Date:{" "}
                        <DayJS format="YYYY-MM-DD">{data?.data?.created_at}</DayJS>
                      </div> */}
                        {/* <div className=" py-2">
                        <b>Last Updated :</b> <br />
                        Time: <DayJS format="h:mm A ">{data?.data?.updated_at}</DayJS>
                        <br />
                        Date:{" "}
                        <DayJS format="YYYY-MM-DD">{data?.data?.updated_at}</DayJS>
                      </div> */}
                      </div>
                    </Card>
                  </Col>
                  <Col md={9}>
                    <Card width="1000px" height="500px">
                      <div>
                        {data?.data?.file?.split(".").pop().includes("docx") ||
                        data?.data?.file?.split(".").pop().includes("xls") ||
                        data?.data?.file?.split(".").pop().includes("xlsx") ||
                          data?.data?.file?.split(".").pop().includes("csv") ||
                          data?.data?.file?.split(".").pop().includes("ppt") ||
                          data?.data?.file?.split(".").pop().includes("pptx") ||
                          data?.data?.file?.split(".").pop().includes("doc") ||
                          data?.data?.file?.split(".").pop().includes("xlx") 
                          
                        
                          ? (
                            <div class="alert alert-warning" role="alert">
                              This Document is Not Viewable, Please Download this Document 👉<img
                            onClick={(e) => download(e, data?.data)}
                            className="btn"
                            width={50}
                            src={downloade}
                            alt=""
                          />
                        
                          </div>
                        ) : (
                          <embed
                            width="100%"
                            height="600px"
                            alt={data?.data?.name}
                            src={`${import.meta.env.VITE_DOC_FILE_URL}${
                              data?.data?.file
                            }`}
                          />
                        )}
                      </div>

                      <Card.Header>
                        <Card.Title as="h5">Description</Card.Title>
                      </Card.Header>
                      <Card.Body className="p-0 m-2">
                        <p className="  ">
                          {data?.data?.description === "undefined" ? (
                            "No Description"
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: data?.data?.description,
                              }}
                            />
                          )}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default DocumentView;
