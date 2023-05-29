import React, { useCallback, useMemo, useState } from "react";

import MaterialReactTable from "material-react-table";

import { FaEdit, FaTrash } from "react-icons/fa";
import { confirmHandel } from "../../../../../utils/Alert";
import avatar from "../../../../../assets/images/profile-picture.png";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";

import PageTopHeader from "../../../common/PageTopHeader";


import CategoryModal from "./SuperadminModal";

import { useDeleteUserMutation } from "../../../../../services/userApi";
import { useAllClientListQuery } from "../../../../../services/clientInfoApi";

const ClientList = () => {

  const res = useAllClientListQuery();
  const [deleteUser] = useDeleteUserMutation();
  const { data, isSuccess, isFetching, isError, error } = res;
  const [clickValue, setClickValue] = useState(null);
  const [paramId, setParamId] = useState(null);
  const [show, setShow] = useState(false);




  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const handelDelete = async (id) => {
    const result = await deleteUser(id).unwrap();
    toast.success(result.message);
  };

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) =>
          row?.company_logo
          ? (
            <>
              <img
                className="img-fluid rounded-circle shadow"
                style={{ width: "40px", height: "40px" }}
                src={`${import.meta.env.VITE_FILE_URL}${row?.company_logo
                }`}
                alt=""
              ></img>
            </>
          ) : (
            <img
              className="img-fluid rounded-circle shadow"
              style={{ width: "40px", height: "40px" }}
              src={avatar}
              alt=""
            ></img>
          ),

        id: "company_logo",
        header: "C Logo",
        size: 10,
      },
      {
        accessorFn: (row) =>
          row?.company_user_image
          ? (
            <>
              <img
                className="img-fluid rounded-circle shadow"
                style={{ width: "40px", height: "40px" }}
                src={`${import.meta.env.VITE_FILE_URL}${row?.company_user_image
                }`}
                alt=""
              ></img>
            </>
          ) : (
            <img
              className="img-fluid rounded-circle shadow"
              style={{ width: "40px", height: "40px" }}
              src={avatar}
              alt=""
            ></img>
          ),

        id: "company_user_image",
        header: "User Photo",
        size: 10,
      },

      {
        accessorKey: "company_name", //access nested data with dot notation
        header: "C Name",
        size: 10,
      },


      {
        accessorKey: "company_address", //normal accessorKey
        header: "C Address",
        size: 10,
      },
      {
        accessorKey: "company_phone", //normal accessorKey
        header: "C phone",
        size: 10,
      },
      {
        accessorKey: "company_email", //normal accessorKey
        header: "C email",
        size: 10,
      },
      {
        accessorKey: "company_website", //normal accessorKey
        header: "C Website",
        size: 10,
      },
      {
        accessorKey: "company_country", //normal accessorKey
        header: "C Country",
        size: 10,
      },
      {
        accessorKey: "company_user_name", //normal accessorKey
        header: "C User Name",
        size: 10,
      },
      {
        accessorKey: "company_user_email", //normal accessorKey
        header: "C User Email",
        size: 10,
      },
      {
        accessorKey: "company_user_phone", //normal accessorKey
        header: "C User Phone",
        size: 10,
      },
      {
        accessorKey: "company_user_gender", //normal accessorKey
        header: "C User Gender",
        size: 10,
      },

      {
        //accessorFn function that combines multiple data together
        accessorFn: (row) =>
          row?.status === "Active" ? (
            <>
              <span className="badge bg-info">Active</span>
            </>
          ) : (
            <span className="badge bg-danger">Inactive</span>
          ),

        id: "Status",
        header: "Status",
        size: 10,
      },
    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}
      <CategoryModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />
      <PageTopHeader title="Super Admin List" />
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-between ">
          <div> Super Admin List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Super Admin");
              }}
            >
              Add New Super Admin
            </button>
          </div>
        </div>

        <div class="card-body p-0">
          <MaterialReactTable
            columns={columns}
            data={isSuccess && data?.data}
            // enableRowActions
            // enableColumnActions
            positionActionsColumn="last"
            muiTopToolbarProps={{
              style: {
                backgroundColor: "#3f4d67",
              },
            }}
            // enablePagination="true"
            renderRowActions={(row, index) => (
              <>
                <div className="d-flex ">
                  <div className="mr-1">
                    {/* <Link
                  to="#"
                    className="btn btn-info btn-sm d-flex align-items-center"
                  onClick={() => {
                    handleShow();
                    handelClickValue("Branch Information");
                    setParamId(row?.row?.original);
                  
                  }}
                >
                  <div className="mr-1"><BsFillEyeFill color="black" size={18} /></div>
                  <div>Details</div>
                  
                  
                </Link> */}
                  </div>

                  {/* <div className="mx-2">
                    <button
                      title=""
                      className="px-2 d-flex align-items-center btn btn-primary btn-sm"
                      onClick={() => {
                        handleShow();
                        handelClickValue("Edit Super Admin");
                        setParamId(row?.row?.original);
                      }}
                    >
                      <div>
                        <FaEdit size={16} />
                      </div>
                      <div> Edit</div>
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        confirmHandel(
                          "error",
                          "Delete",
                          "#FF0000",
                          row?.row?.original?.id,
                          handelDelete
                        )
                      }
                      className="px-2 d-flex align-items-center btn btn-danger btn-sm"
                    >
                      <div> Delete</div>
                      <div>
                        <FaTrash size={13} />
                      </div>
                    </button>
                  </div> */}
                </div>
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ClientList;
