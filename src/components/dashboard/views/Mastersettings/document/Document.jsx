import React, { useState } from "react";
import PageTopHeader from "../../../common/PageTopHeader";
import { useAllCategoryQuery } from "../../../../../services/categoryApi";
import Loader from "./../../../common/Loader";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import folder from "./../../../../../assets/images/File/file-folder.png";
import QuickUploadModal from "./QuickUploadModal";
import { useSelector } from "react-redux";

export const Document = () => {
  const res = useAllCategoryQuery();
  const { data, isFetching, isSuccess, isError } = res;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const authUser = useSelector((state) => state.auth.user);
  return (
    <>
      <QuickUploadModal show={show} handleClose={handleClose} />
      <PageTopHeader title="Documents" />
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-between ">
          <div className="mt-2">Documents</div>
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
                        `/dashboard/category-document-and-sub-category-folder/${category.id} `) ||
                      (authUser?.user_type === "User" &&
                        `/dashboard/user/category-document-and-sub-category-folder/${category.id}`) ||
                      (authUser?.user_type === "Superadmin" &&
                        `/dashboard/superadmin/category-document-and-sub-category-folder/${category.id} `)
                      
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
        </div>
      </div>
    </>
  );
};
