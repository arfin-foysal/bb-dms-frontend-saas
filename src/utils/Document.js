import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import fileDownload from 'js-file-download';
import Swal from 'sweetalert2';
export const download = (e,doc) => {
    e.preventDefault();
    axios({
      url: `${import.meta.env.VITE_API_URL}download/${doc.id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get("dms_user_token")}`,
      },
      responseType: 'blob'
    })
      .then((response) => {
        fileDownload(response.data, `${doc.name}.${response.data.type.split('/').pop()}`);
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
};
  
export const DocumentPublish = async (documentpublish,Pid) => {
    Swal.fire({
      title: 'You want to Publish this Document?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      confirmButtonColor: 'green',
      cancelButtonColor: '#4e4e4e',
      confirmButtonText: 'Yes, Publish it!',
      width: 200,
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        documentpublish(Pid);
        Swal.fire('Publish!', 'Your file has been Publish.', 'success');
      }
    });
};
  
export const deleteHandel = async (deleteDocument,Did) => {
    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'error',
      confirmButtonColor: '#d33 ',
      cancelButtonColor: ' #4e4e4e',
      confirmButtonText: 'Yes, delete it!',
      width: 200,
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDocument(Did);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  export const groupdownload = (e, item) => {
    e.preventDefault();
    axios({
      url: `${import.meta.env.VITE_API_URL}download_file/${item.id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('dms_user_token')}`
      },
      responseType: 'blob'
    })
      .then((response) => {
        fileDownload(response.data, `${item.name}.${response.data.type.split('/').pop()}`);
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
  };