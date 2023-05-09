import React from "react";
import { Card, Col, Row } from "react-bootstrap";
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
import { useParams } from "react-router-dom";
import downloade from "./../../../../../assets/images/File/download.png";
import shareDoc from "./../../../../../assets/images/File/shere_ic.png";
import cloud from "./../../../../../assets/images/File/cloud.png";
import { DocumentPublish, download, groupdownload } from "../../../../../utils/Document";
import { useGroupSingalDocumnetQuery } from "../../../../../services/groupApi";
import Loader from "../../../common/Loader";

const GroupDocumentView = () => {
  const { id } = useParams();
  const res = useGroupSingalDocumnetQuery(id);
  const { data, isFetching, isSuccess, isError } = res;





  return (
    <>
      

      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <div>
              <Card.Title as="h5">Documnet </Card.Title>
            </div>

            <div>
              <span className="me-auto pointer">
                <div
                //   nClick={() => history.goBack()}
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
                            onClick={(e) => groupdownload(e, data)}
                            className="btn"
                            width={60}
                            src={downloade}
                            alt=""
                          />
                        </div>


                      </div>

                      <div className=" mx-1 ">
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
                            <b>{data?.name}</b>
                          </p>
                        </div>
                        <div className=" py-2">
                          <b>Group Name:</b> <br />{" "}
                          <p className="text-primary ">
                            <b> {data?.group?.name}</b>
                          </p>
                        </div>

                        <div className=" py-2">
                          <b>Created By:</b> <br />
                          <p className="text-primary ">
                            <b> {data?.user?.name} </b>{" "}
                          </p>
                        </div>
                        {/* <div className=" py-2">
                        <b>Created at :</b> <br />
                        Time: <DayJS format="h:mm A">{data?.created_at}</DayJS>
                        <br />
                        Date:{" "}
                        <DayJS format="YYYY-MM-DD">{data?.created_at}</DayJS>
                      </div> */}
                        {/* <div className=" py-2">
                        <b>Last Updated :</b> <br />
                        Time: <DayJS format="h:mm A ">{data?.updated_at}</DayJS>
                        <br />
                        Date:{" "}
                        <DayJS format="YYYY-MM-DD">{data?.updated_at}</DayJS>
                      </div> */}
                      </div>
                    </Card>
                  </Col>
                  <Col md={9}>
                    <Card width="1000px" height="500px">
                      <div>
                        {data?.file?.split(".").pop().includes("docx") ||
                        data?.file?.split(".").pop().includes("xls") ||
                        data?.file?.split(".").pop().includes("xlsx") ||
                        data?.file?.split(".").pop().includes("csv") ? (
                          <div class="alert alert-warning" role="alert">
                            Pleass Download this Document !!
                          </div>
                        ) : (
                          <embed
                            width="100%"
                            height="600px"
                            alt={data?.name}
                            src={`${import.meta.env.VITE_DOC_FILE_URL}${
                              data?.file
                            }`}
                          />
                        )}
                      </div>

                      <Card.Header>
                        <Card.Title as="h5">Description</Card.Title>
                      </Card.Header>
                      <Card.Body className="p-0 m-3">
                        <p className="  ">
                          {data?.description === "undefined" ? (
                            "No Description"
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: data?.description,
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

export default GroupDocumentView;
