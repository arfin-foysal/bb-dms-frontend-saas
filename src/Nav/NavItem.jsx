import { AiOutlineCloudServer, AiOutlineUserAdd } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { MdOutlineUploadFile } from "react-icons/md";
import { BsFiletypeDoc } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsFolder2 } from "react-icons/bs";

import {
  HiOutlineDocumentDuplicate,
  HiOutlineDocumentDownload,
} from "react-icons/hi";

export const navItem = [
 

  //admin route start
  {
    title: "All Publish Documents",
    link: "all-document-list",
    role: "admin",
    icon: <AiOutlineCloudServer />,
  },
  {
    title: "Documents",
    role: "admin",
    icon: <HiOutlineDocumentDuplicate />,
    children: [
      {
        title: "Upload Documents",
        link: "upload-documents",
        role: "admin",
        icon: <MdOutlineUploadFile />,
      },
      {
        title: "Folder",
        link: "documents",
        role: "admin",
        icon: <BsFolder2 />,
        
      },
    ],
  },

  {
    title: "Groups",
    link: "group-list",
    role: "admin",
    icon: <HiOutlineUserGroup />,
  },
  {
    title: "Unpublish Documents",
    link: "unpublish-document",
    role: "admin",
    icon: <HiOutlineDocumentDownload />,
  },

  {
    title: "Master Settings",
    role: "admin",
    icon: <RiUserSettingsLine />,
    children: [
      {
        title: "Category",
        link: "category-list",
        role: "admin",
        icon: <BiCategory />,
      },
      {
        title: "Sub Category",
        link: "sub-category-list",
        role: "admin",
        icon: <BiCategory />,
      },
      {
        title: "Third Sub Category",
        link: "third-sub-category-list",
        role: "admin",
        icon: <BiCategory />,
      },

      // {
      //   title: "User List",
      //   link: "user-list",
      //   role: "admin",
      //   icon: <AiOutlineUserAdd />,
      // },
    ],
  },
//admin route end

 //super admin route start
 {
  title: "All Publish Documents",
  link: "superadmin/all-document-list",
  role: "superadmin",
  icon: <AiOutlineCloudServer />,
},
{
  title: "Documents",
  role: "superadmin",
  icon: <HiOutlineDocumentDuplicate />,
  children: [
    {
      title: "Upload Documents",
      link: "superadmin/upload-documents",
      role: "superadmin",
      icon: <MdOutlineUploadFile />,
    },
    {
      title: "Folder",
      link: "superadmin/documents",
      role: "superadmin",
      icon: <BsFolder2 />,
      
    },
  ],
},

{
  title: "Groups",
  link: "superadmin/group-list",
  role: "superadmin",
  icon: <HiOutlineUserGroup />,
},
{
  title: "Unpublish Documents",
  link: "superadmin/unpublish-document",
  role: "superadmin",
  icon: <HiOutlineDocumentDownload />,
},

{
  title: "Master Settings",
  role: "superadmin",
  icon: <RiUserSettingsLine />,
  children: [
    {
      title: "Category",
      link: "superadmin/category-list",
      role: "superadmin",
      icon: <BiCategory />,
    },
    {
      title: "Sub Category",
      link: "superadmin/sub-category-list",
      role: "superadmin",
      icon: <BiCategory />,
    },
    {
      title: "Third Sub Category",
      link: "superadmin/third-sub-category-list",
      role: "superadmin",
      icon: <BiCategory />,
    },

    {
      title: "User List",
      link: "superadmin/user-list",
      role: "superadmin",
      icon: <AiOutlineUserAdd />,
    },
  ],
},

//Super admin route end


  //user route start


  {
    title: "All Publish Documents",
    link: "user/all-document-list",
    role: "user",
    icon: <AiOutlineCloudServer />,
  },
  {
    title: "Documents",
    role: "user",
    icon: <HiOutlineDocumentDuplicate />,
    children: [
      {
        title: "Upload Documents",
        link: "user/upload-documents",
        role: "user",
        icon: <MdOutlineUploadFile />,
      },
      {
        title: "Folder",
        link: "user/documents",
        role: "user",
        icon: <BsFolder2 />,
        // icon: <BsFiletypeDoc />,
      },
    ],
  },

  {
    title: "Groups",
    link: "user/group-list",
    role: "user",
    icon: <HiOutlineUserGroup />,
  },


  {
    title: "Master Settings",
    role: "user",
    icon: <RiUserSettingsLine />,
    children: [
      {
        title: "Category",
        link: "user/category-list",
        role: "user",
        icon: <BiCategory />,
      },
      {
        title: "Sub Category",
        link: "user/sub-category-list",
        role: "user",
        icon: <BiCategory />,
      },
      {
        title: "Third Sub Category",
        link: "user/third-sub-category-list",
        role: "user",
        icon: <BiCategory />,
      },


    ],
  },
  //user route end

  {
    title: "System Settings",
    role: "systemadmin",
    icon: <RiUserSettingsLine />,
    children: [
      {
        title: "Company",
        link: "systemadmin/company-list",
        role: "systemadmin",
        icon: <BiCategory />,
      },
      {
        title: "SuperAdimn List",
        link: "systemadmin/superadmin-list",
        role: "systemadmin",
        icon: <BiCategory />,
      },
    ]
  }



  
];
