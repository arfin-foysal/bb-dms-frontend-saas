import React, { useState } from "react";
import TopBox from "./TopBox";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowRightCircleFill,
  BsFillArrowUpCircleFill,
  BsFillCheckCircleFill,
  BsFillEyeFill,
  BsFillFileEarmarkMedicalFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsStack,
  BsXCircleFill,
} from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { FcApproval } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import {
  useAllPublishDocumentQuery,
  useDashboardDetailsQuery,
  useDashboardPublishDocumentQuery,
} from "../../../../services/publishApi";
import { download } from "../../../../utils/Document";
import QuickUploadModal from "../Mastersettings/document/QuickUploadModal";
import NoImage from "../../common/NoImage";
import Loader from "../../common/Loader";
import PageTopHeader from "../../common/PageTopHeader";

const AdminPage = () => {

  const res = useDashboardPublishDocumentQuery();
  const { data, isFetching, isSuccess, isError } = res;


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <QuickUploadModal show={show} handleClose={handleClose} />

      <div className="row">
        <TopBox
          name="My Documnets"
          color="blue"
          icon={<BsStack color="blue" size={25} />}
          item={data?.myDoc}
        />
        <TopBox
          name="Published Documnets"
          color="red"
          icon={<ImCross color="red" size={25} />}
          item={data?.publishDoc}
        />
        <TopBox
          name="Total Applications"
          color="#FFCC00"
          icon={<GiSandsOfTime color="#FFCC00" size={25} />}
          // item={data?.data?.count_total}
        />

        <div className="col-xl-3">
          <Card className="card-event shadow border-0">
            <Card.Body>
              <div className="row align-items-center justify-content-center">
                <div className="col">
                  <p className="m-0">UPLOADE DOCUMENT</p>
                </div>

                <div className="col-auto"></div>
              </div>
              <h2 className=" f-w-300">
                <div className="d-flex  justify-content-between">
                  <div>
                    <button
                      className="btn btn-primary btn-sm btn-round "
                      onClick={() => {
                        handleShow();
                      }}
                    >
                      <span>UPLOADE</span>
                      <BsFillArrowUpCircleFill
                        className="mx-2 mb-1"
                        size={15}
                      />
                    </button>
                  </div>
                  <div className="text-right">
                    {" "}
                    <BsFillFileEarmarkMedicalFill size={25} className="" />
                  </div>
                </div>
              </h2>
            </Card.Body>
          </Card>
        </div>

        {isFetching && <Loader />}
        {data?.length === 0 && (
          <div className="d-flex justify-content-center">
            <p className="text-center">No Document Found :)</p>
          </div>
            )}
        {isError && (
             <div className="d-flex justify-content-center">
                <p> Something went wrong (:</p>
              </div>
        )}
        
   
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-between border-0">
          <div>Published Document</div>
        </div>

          <div class="card-body ">
        

        <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
          {isSuccess &&
            data?.dashboardPublishDoc?.data.map((item, i) => (
              <div className="mx-1 m-2 " key={i}>
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
                    <Card.Text className="m-0 p-0" style={{ fontSize: "11px" }}>
                      Author by: {item?.user?.name}
                    </Card.Text>
                  </Card.Body>

                  <div className="text-center  py-2 shadow text-dark ">
                    <div>
                      <Link to={`/dashboard/document-view/${item.id}`}>
                        <BsFillEyeFill color="blue" size={22} />
                      </Link>
                      <span className="pointer ml-3 ms-3">
                        <BsFillArrowDownCircleFill
                          onClick={(e) => download(e, item)}
                        />
                      </span>
                    </div>
                  </div>
                </Card>
                {/* </Link> */}
              </div>
            ))}
        </div>
        {data?.dashboardPublishDoc?.data?.length > 9 && (
          <div className="text-end mr-3">
            <Link to={`/dashboard/all-document-list`}>
              <Button className="btn btn-primary btn-sm btn-round">
                See More <BsFillArrowRightCircleFill color="black" />
              </Button>
            </Link>
          </div>
        )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;