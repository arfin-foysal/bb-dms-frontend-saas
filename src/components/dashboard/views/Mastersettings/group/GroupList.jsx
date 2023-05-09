import React, { useCallback, useMemo, useState } from "react";

import MaterialReactTable from "material-react-table";

import { FaEdit, FaTrash } from "react-icons/fa";
import { confirmHandel } from "../../../../../utils/Alert";
import avatar from "../../../../../assets/images/profile-picture.png";
import group from "../../../../../assets/images/File/group.png";

import { toast } from "react-toastify";
import Loader from "../../../common/Loader";

import PageTopHeader from "../../../common/PageTopHeader";

import CategoryModal from "./GroupModal";
import { useDeleteCategoryMutation } from "../../../../../services/categoryApi";
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import {
  useDeleteGroupMutation,
  useUserWiseGroupViewQuery,
} from "../../../../../services/groupApi";
import { deleteHandel } from "../../../../../utils/Document";
import { useSelector } from "react-redux";

const GroupList = () => {
  const res = useUserWiseGroupViewQuery();
  const [deleteGroup] = useDeleteGroupMutation();
  const auth = useSelector((state) => state.auth.user);

  const authUser = useSelector((state) => state.auth.user);

  const { data, isSuccess, isFetching, isError, error } = res;
  const [clickValue, setClickValue] = useState(null);
  const [paramId, setParamId] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  return (
    <>
      {isFetching && <Loader />}
      <CategoryModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />
      <PageTopHeader title="Groups" />
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-between ">
          <div>Groups</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Group");
              }}
            >
              Add New Group
            </button>
          </div>
        </div>

        <div class="card-body ">
          {isFetching && <Loader />}

          {isError && (
            <div className="d-flex justify-content-center">
              <p> Something went wrong (:</p>
            </div>
          )}

          {data?.data?.length === 0 && (
            <div className="d-flex justify-content-center">
              <p className="text-center">No Group Found:)</p>
            </div>
          )}

          <div className="d-flex flex-wrap justify-content-center justify-content-md-start ">
            {isSuccess &&
              data.data?.map((item, i) => (
                <Card key={i} className=" mx-2 shadow border-0 my-2">
                  <div className="d-flex ">
                    <div>
                      <Link
                        className="text-center"
                        to={`/groups/group_document/${item.group.id}`}
                      >
                        <Card.Img
                          className="mt-3 m-2 pointer rounded-circle "
                          variant="top"
                          src={
                            item?.group?.image
                              ? `${import.meta.env.VITE_FILE_URL}${
                                  item?.group?.image
                                }`
                              : group
                          }
                          style={{ width: "50px", height: "50px" }}
                        />
                      </Link>
                    </div>
                    <div className="mx-3 " style={{ width: "100px" }}>
                      <Card.Title
                        style={{ fontSize: "100%" }}
                        className="font-weight-bold m-0 mt-4 "
                      >
                        {item?.group?.name.slice(0, 12)}
                      </Card.Title>
                      <Card.Text>
                        {/* <img
                className=" rounded-circle mb-1 mr-1"
                width={15}
                 src={
                   item?.group?.group_creator?.image
                    ? `${import.meta.env.VITE_FILE_UR}${item?.group?.group_creator?.image}`
                    : `${avatar}`
                 }
                alt=""
              /> */}
                        {item?.group?.group_creator?.name}
                      </Card.Text>
                    </div>

                    <div>
                      <div
                        className=" text-center p-2  my-3  px-4 "
                        style={{ width: "200px" }}
                      >
                        <div>
                          <Link
                            to={
                              (authUser?.user_type === "Admin" &&
                                `/dashboard/group-document-view/${item?.group?.id}`) ||
                              (authUser?.user_type === "User" &&
                                `/dashboard/user/group-document-view/${item?.group?.id}`)
                            }
                          >
                            <BsFillEyeFill color="blue" size={22} />
                          </Link>
                          {auth.id === item?.group?.group_creator?.id && (
                            <Link
                              to="#"
                              className="px-3"
                              onClick={() => {
                                handleShow();
                                handelClickValue("Edit Group");
                                setParamId(item);
                              }}
                            >
                              <BsPencilSquare color="green" size={18} />
                            </Link>
                          )}
                          {auth.id === item?.group?.group_creator?.id && (
                            <Link
                              to="#"
                              style={{ "border-style": "none" }}
                              onClick={() =>
                                deleteHandel(deleteGroup, item.group.id)
                              }
                            >
                              <BsFillTrashFill color="red" size={17} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupList;
