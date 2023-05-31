import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import Loader from "../../../common/Loader";
import PageTopHeader from "../../../common/PageTopHeader";
import {IoSyncCircleSharp} from "react-icons/io5"

import {
  useAdminDocumentPublishMutation,
  useAdminUnpublishDocumentListQuery,
} from "../../../../../services/publishApi";
import { BsFillEyeFill, BsXCircleFill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { Link } from "react-router-dom";
import { DocumentPublish, cancelHandel } from "../../../../../utils/Document";
import { useLazyAdminCancelDocumentQuery } from "../../../../../services/documentApi";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

const UnpublishDocumentList = () => {
  const authUser = useSelector((state) => state.auth.user);
  const res = useAdminUnpublishDocumentListQuery();
  const [adminCancelDocument, ress] = useLazyAdminCancelDocumentQuery();
  const [adminDocumentPublish] = useAdminDocumentPublishMutation();
  const { data, isSuccess, isFetching, isError, error } = res;


  const refatchClick = () => {
    res.refetch();
  };

  const columns = useMemo(
    () => [
      // {
      //   accessorFn: (row) =>
      //     row?.image
      //     ? (
      //       <>
      //         <img
      //           className="img-fluid rounded-circle shadow"
      //           style={{ width: "40px", height: "40px" }}
      //           src={`${import.meta.env.VITE_FILE_URL}${row?.image
      //           }`}
      //           alt=""
      //         ></img>
      //       </>
      //     ) : (
      //       <img
      //         className="img-fluid rounded-circle shadow"
      //         style={{ width: "40px", height: "40px" }}
      //         src={avatar}
      //         alt=""
      //       ></img>
      //     ),

      //   id: "Photo",
      //   header: "Photo",
      //   size: 10,
      // },

      {
        accessorKey: "name", //access nested data with dot notation
        header: "Document Name",
        size: 10,
      },

      {
        accessorKey: "user.name", //normal accessorKey
        header: "Created By",
        size: 10,
      },

      {
        //accessorFn function that combines multiple data together
        accessorFn: (row) =>
          row?.admin_status === "Pending" && (
            <>
              <span>
                <BsXCircleFill color="red" />
              </span>
              {row?.admin_status}
            </>
          ),

        id: "Admin Status",
        header: "Admin Status",
      },
    ],
    []
  );

  return (
    <>
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

      <PageTopHeader title="Unpublished Document List" />

      
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-between ">
          <div>Unpublished Document List</div>

          <div className="mt-1">
                <IoSyncCircleSharp
                  className="pointer "
                  color="black"
                  size={25}
                  onClick={() => refatchClick()}
                />
              </div>
        </div>

        <div class="card-body p-0">
          <MaterialReactTable
            columns={columns}
            data={isSuccess && data}
            enableRowActions
            enableColumnActions
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
                    <td>
                      <Link
                        to={
                          (authUser?.user_type === "Admin" &&
                            `/dashboard/document-view/${row?.row?.original?.id}`) ||
                          (authUser?.user_type === "Superadmin" &&
                            `/dashboard/superadmin/document-view/${row?.row?.original?.id}`)
                        }
                      >
                        <BsFillEyeFill color="black" size={20} />
                      </Link>

                      <button
                        className=" btn btn-outline-none"
                        style={{ "border-style": "none" }}
                        onClick={() =>
                          cancelHandel(
                            adminCancelDocument,
                            row?.row?.original?.id
                          )
                        }
                      >
                        <FcCancel color="red" size={20} />
                      </button>

                      {row?.row?.original?.admin_status === "Pending" && (
                        <RiUploadCloud2Fill
                          className="pointer mx-1  "
                          color="Teal"
                          size={20}
                          onClick={() =>
                            DocumentPublish(
                              adminDocumentPublish,
                              row?.row?.original?.id
                            )
                          }
                        />
                      )}
                    </td>
                  </div>
                </div>
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default UnpublishDocumentList;
