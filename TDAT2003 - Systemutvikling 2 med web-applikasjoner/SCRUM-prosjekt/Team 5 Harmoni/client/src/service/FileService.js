import axios from "axios";
import {authenticationHeader} from "./auth";
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";

/**
 * Class to handle file services
 */
export class FileService {
  /**
   * Method to uploaded a image to the server
   * @param image which will be uploaded
   * @returns {Promise<AxiosResponse<T>>}
   */
  uploadImage(image) {
    const url = "http://" + ipAdress + ":8080/upload";
    const formData = new FormData();
    formData.append("file", image);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization" : authenticationHeader().Authorization
      }
    };
    return axios.post(url, formData, config);
  }

  /**
   * Method to upload a maximum of 5 files to the server
   * @param files to be uploaded
   * @returns {Promise<AxiosResponse<T>>}
   */
  uploadFiles(files) {
    const url = "http://" + ipAdress + ":8080/uploadFiles";
    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization" : authenticationHeader().Authorization
      }
    };
    return axios.post(url, formData, config);
  }

  /**
   * Method to upload one file (word, pdf, txt)
   * @param file to be uploaded
   * @returns {Promise<AxiosResponse<T>>}
   */
  uploadFile(file) {
    const url = "http://" + ipAdress + ":8080/uploadFile";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization" : authenticationHeader().Authorization
      }
    };
    return axios.post(url, formData, config);
  }

  /**
   * Method to return a file
   * @param fileName of the file we want to get
   * @returns {Promise<AxiosResponse<T>>}
   */
  getFile(fileName) {
    const url = "http://" + ipAdress + ":8080/image/" + fileName;
    console.log("URL:");
    console.log(url);
    return axios.get(url);
  }
}
