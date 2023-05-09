import React, { useState } from "react";
import PageTopHeader from "../../../common/PageTopHeader";
import { download } from "../../../../../utils/Document";
import {
  BsFillArrowDownCircleFill,
  BsFillCheckCircleFill,
  BsFillEyeFill,
  BsXCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useAllPublishDocumentQuery } from "../../../../../services/publishApi";
import NoImage from "../../../common/NoImage";
import Loader from "../../../common/Loader";
import { useSelector } from "react-redux";

const AllDocumentList = () => {
  const authUser = useSelector((state) => state.auth.user);
  const [search, setSearch] = useState("");
  const { data, isSuccess, isLoading, isFetching, isError } =
    useAllPublishDocumentQuery({
      search: search,
    });

  return (
    <>
      <PageTopHeader title="Published Document" />
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-between ">
          <div>
            <input
              type="search"
              className="form-control "
              name="search"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              id=""
            />
          </div>
          <div className="mt-2">Published Document</div>
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

        <div class="card-body ">
          <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
            {isSuccess &&
              data?.map((item, i) => (
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

export default AllDocumentList;
