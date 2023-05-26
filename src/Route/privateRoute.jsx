import { Navigate } from "react-router-dom";
import { getPath } from "./utils";
import DashboardHomePage from "../components/dashboard/views/dashboardHomePage/DashboardHomePage";
import CategoryList from "../components/dashboard/views/Mastersettings/category/CategoryList";
import SubCategoryList from "../components/dashboard/views/Mastersettings/subCategory/SubCategoryList";
import ThirdSubCategoryList from "../components/dashboard/views/Mastersettings/thirdSubCategory/ThirdSubCategoryList";
import UserList from "../components/dashboard/views/Mastersettings/user/UserList";
import UploadDocument from "../components/dashboard/views/Mastersettings/document/UploadDocument";
import { Document } from "../components/dashboard/views/Mastersettings/document/Document";
import { CategoryDocumentAndSubCategoryFolder } from "../components/dashboard/views/Mastersettings/document/CategoryDocumentAndSubCategoryFolder";
import DocumentView from "../components/dashboard/views/Mastersettings/document/DocumentView";
import EditDocument from "../components/dashboard/views/Mastersettings/document/EditDocument";
import { SubCategoryDocumentAndThirdSubCategoryFolder } from "../components/dashboard/views/Mastersettings/document/SubCategoryDocumentAndThirdSubCategoryFolder";
import UnpublishDocumentList from "../components/dashboard/views/Mastersettings/unpublishDocument/UnpublishDocumentList";
import GroupList from "../components/dashboard/views/Mastersettings/group/GroupList";
import { GroupWiseDocument } from "../components/dashboard/views/Mastersettings/group/GroupWiseDocument";
import GroupDocumentView from "../components/dashboard/views/Mastersettings/group/GroupDocumentView";
import AllDocumentList from "../components/dashboard/views/Mastersettings/document/AllDocumentList";
import { ThirdSubCategoryDocument } from './../components/dashboard/views/Mastersettings/document/ThirdSubCategoryDocument';
import Profile from "../components/dashboard/views/Mastersettings/Profile/Profile";
import SystemadninPage from "../components/dashboard/views/dashboardHomePage/SystemadninPage";
import CompanyList from "../components/dashboard/views/Mastersettings/company/CompanyList";
import SuperadminList from "../components/dashboard/views/Mastersettings/superadmin/SuperadminList";











export const privateRoute = [
  {
    path: "*",
    element: <Navigate replace to={getPath()} />,
    role: "all",
  },
  {
    path: "/dashboard",
    element: <Navigate replace to={getPath()} />,
    role: "all",
  },

  // admin route start

  {
    path: "admin",
    element: <DashboardHomePage />,
    role: "admin",
  },
  {
    path: "category-list",
    element: <CategoryList />,
    role: "admin",
  },
  {
    path: "sub-category-list",
    element: <SubCategoryList />,
    role: "admin",
  },
  {
    path: "third-sub-category-list",
    element: <ThirdSubCategoryList />,
    role: "admin",
  },
  {
    path: "user-list",
    element: <UserList/>,
    role: "admin",
  },

  //docs
  {
    path: "upload-documents",
    element: <UploadDocument/>,
    role: "admin",
  },
  {
    path: "edit-document/:id",
    element: <EditDocument/>,
    role: "admin",
  },
  {
    path: "documents",
    element: <Document/>,
    role: "admin",
  },
  {
    path: "category-document-and-sub-category-folder/:id",
    element: <CategoryDocumentAndSubCategoryFolder/>,
    role: "admin",
  },
  {
    path: "sub-category-document-and-third-sub-category-folder/:id",
    element: <SubCategoryDocumentAndThirdSubCategoryFolder/>,
    role: "admin",
  },
  {
    path: "third-sub-category-document/:id",
    element: <ThirdSubCategoryDocument/>,
    role: "admin",
  },
  {
    path: "document-view/:id",
    element: <DocumentView/>,
    role: "admin",
  },
  {
    path: "unpublish-document",
    element: <UnpublishDocumentList/>,
    role: "admin",
  },
  {
    path: "group-list",
    element: <GroupList/>,
    role: "admin",
  },
  {
    path: "group-document",
    element: <GroupList/>,
    role: "admin",
  },
  {
    path: "group-document-view/:id",
    element: <GroupWiseDocument/>,
    role: "admin",
  },
  {
    path: "group-singal-document-view/:id",
    element: <GroupDocumentView/>,
    role: "admin",
  },
  {
    path: "all-document-list",
    element: <AllDocumentList/>,
    role: "admin",
  },
  {
    path: "admin/profile-view/:id",
    element: <Profile />,
    role: "admin",
  },


  // admin route end

  // super admin route start


 {
  path: "superadmin",
  element: <DashboardHomePage />,
  role: "superadmin",
},
{
  path: "superadmin/category-list",
  element: <CategoryList />,
  role: "superadmin",
},
{
  path: "superadmin/sub-category-list",
  element: <SubCategoryList />,
  role: "superadmin",
},
{
  path: "superadmin/third-sub-category-list",
  element: <ThirdSubCategoryList />,
  role: "superadmin",
},
{
  path: "superadmin/user-list",
  element: <UserList/>,
  role: "superadmin",
},

//docs
{
  path: "superadmin/upload-documents",
  element: <UploadDocument/>,
  role: "superadmin",
},
{
  path: "superadmin/edit-document/:id",
  element: <EditDocument/>,
  role: "superadmin",
},
{
  path: "superadmin/documents",
  element: <Document/>,
  role: "superadmin",
},
{
  path: "superadmin/category-document-and-sub-category-folder/:id",
  element: <CategoryDocumentAndSubCategoryFolder/>,
  role: "superadmin",
},
{
  path: "superadmin/sub-category-document-and-third-sub-category-folder/:id",
  element: <SubCategoryDocumentAndThirdSubCategoryFolder/>,
  role: "superadmin",
},
{
  path: "superadmin/third-sub-category-document/:id",
  element: <ThirdSubCategoryDocument/>,
  role: "superadmin",
},
{
  path: "superadmin/document-view/:id",
  element: <DocumentView/>,
  role: "superadmin",
},
{
  path: "superadmin/unpublish-document",
  element: <UnpublishDocumentList/>,
  role: "superadmin",
},
{
  path: "superadmin/group-list",
  element: <GroupList/>,
  role: "superadmin",
},
{
  path: "superadmin/group-document",
  element: <GroupList/>,
  role: "superadmin",
},
{
  path: "superadmin/group-document-view/:id",
  element: <GroupWiseDocument/>,
  role: "superadmin",
},
{
  path: "superadmin/group-singal-document-view/:id",
  element: <GroupDocumentView/>,
  role: "superadmin",
},
{
  path: "superadmin/all-document-list",
  element: <AllDocumentList/>,
  role: "superadmin",
  },
  {
    path: "superadmin/profile-view/:id",
    element: <Profile />,
    role: "superadmin",
  },
  // super admin route end

  //user route start

  {
    path: "user",
    element: <DashboardHomePage />,
    role: "user",
  },
  {
    path: "user/category-list",
    element: <CategoryList />,
    role: "user",
  },
  {
    path: "user/sub-category-list",
    element: <SubCategoryList />,
    role: "user",
  },
  {
    path: "user/third-sub-category-list",
    element: <ThirdSubCategoryList />,
    role: "user",
  },


  //docs
  {
    path: "user/upload-documents",
    element: <UploadDocument/>,
    role: "user",
  },
  {
    path: "user/edit-document/:id",
    element: <EditDocument/>,
    role: "user",
  },
  {
    path: "user/documents",
    element: <Document/>,
    role: "user",
  },
  {
    path: "user/category-document-and-sub-category-folder/:id",
    element: <CategoryDocumentAndSubCategoryFolder/>,
    role: "user",
  },
  {
    path: "user/sub-category-document-and-third-sub-category-folder/:id",
    element: <SubCategoryDocumentAndThirdSubCategoryFolder/>,
    role: "user",
  },
  {
    path: "user/third-sub-category-document/:id",
    element: <ThirdSubCategoryDocument/>,
    role: "user",
  },
  {
    path: "user/document-view/:id",
    element: <DocumentView/>,
    role: "user",
  },

  {
    path: "user/group-list",
    element: <GroupList/>,
    role: "user",
  },
  {
    path: "user/group-document",
    element: <GroupList/>,
    role: "user",
  },
  {
    path: "user/group-document-view/:id",
    element: <GroupWiseDocument/>,
    role: "user",
  },
  {
    path: "user/group-singal-document-view/:id",
    element: <GroupDocumentView/>,
    role: "user",
  },
  {
    path: "user/all-document-list",
    element: <AllDocumentList/>,
    role: "user",
  },
  {
    path: "user/profile-view/:id",
    element: <Profile />,
    role: "user",
  },



  //system admin route start
  {
    path: "systemadmin",
    element: <SystemadninPage />,
    role: "systemadmin",
  },

  {
    path: "systemadmin/company-list",
    element: <CompanyList />,
    role: "systemadmin",
  },
  {
    path: "systemadmin/superadmin-list",
    element: <SuperadminList />,
    role: "systemadmin",
  },

  {
    path: "systemadmin/profile-view/:id",
    element: <Profile />,
    role: "systemadmin",
  },
];
