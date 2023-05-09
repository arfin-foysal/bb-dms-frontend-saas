import React, { useCallback, useMemo, useState } from "react";

import MaterialReactTable from "material-react-table";

import { FaEdit, FaTrash } from "react-icons/fa";
import { confirmHandel } from "../../../../../utils/Alert";
import avatar from "../../../../../assets/images/profile-picture.png";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";

import PageTopHeader from "../../../common/PageTopHeader";

import CategoryModal from "../category/CategoryModal";
import { useDeleteCategoryMutation } from "../../../../../services/categoryApi";
import {
  useAdminDocumentPublishMutation,
  useAdminUnpublishDocumentListQuery,
} from "../../../../../services/publishApi";
import { BsFillEyeFill, BsFillTrashFill, BsXCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { DocumentPublish, deleteHandel } from "../../../../../utils/Document";
import { useDeleteDocumentMutation } from "../../../../../services/documentApi";
import { RiUploadCloud2Fill } from "react-icons/ri";

const UnpublishDocumentList = () => {
  const res = useAdminUnpublishDocumentListQuery();
  const [deleteDocument] = useDeleteDocumentMutation();
  const [adminDocumentPublish] = useAdminDocumentPublishMutation();
  const { data, isSuccess, isFetching, isError, error } = res;

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

      <PageTopHeader title="Unpublish Document List" />
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-between ">
          <div>Unpublish Document List</div>
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
                        to={`/dashboard/document-view/${row?.row?.original?.id}`}
                      >
                        <BsFillEyeFill color="black" size={20} />
                      </Link>

                      <button
                        style={{ "border-style": "none" }}
                        onClick={() =>
                          deleteHandel(deleteDocument, row?.row?.original?.id)
                        }
                      >
                        <BsFillTrashFill color="red" size={17} />
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
