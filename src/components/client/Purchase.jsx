import React from "react";
import reg from "./../../assets/images/reg.png";
import { Link } from "react-router-dom";

const Purchase = () => {
  return (
    <div className="container mb-5">
      <div className="row pt-5 text-center ">
        <div className=" py-3 bg-info text-white">
          <h3>Please provide your Company and User information</h3>
        </div>

        <div className="col-md-8 co-12 col-12 mt-5 pt-3  shadow-lg border border-1 ">
          <h5>Company Information</h5>
          <div className="row">
            <div className="col-6 mt-2">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Company Name</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
          
              </div>
            </div>

            <div className="col-6 mt-2">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
          
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Unique id</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Unique id"
                />
          
              </div>
            </div>

            <div className="col-6 mt-2">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Phone"
                />
        
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Country</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Country"
                />
        
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Photo</label>
                <input
                  type="file"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Phone"
                />
              </div>
   
            </div>
            <div className="col-12 pt-2">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Address</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
      
              </div>
            </div>
            <div className="mt-4">
              <h5>User Information</h5>
            </div>

            <div className="col-12">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                />
                <small id="emailHelp" className="form-text text-muted"></small>
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email"
                />
                <small id="emailHelp" className="form-text text-muted"></small>
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Number"
                />
                <small id="emailHelp" className="form-text text-muted"></small>
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Gender</label>
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>--select--</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>

                <small id="emailHelp" className="form-text text-muted"></small>
              </div>
            </div>

            <div className="col-6 mt-2">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Photo</label>
                <input
                  type="file"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Number"
                />
                <small id="emailHelp" className="form-text text-muted"></small>
              </div>
            </div>

            <div className="col-12 my-5">
              <button type="submit" className="btn btn-primary">
                Submit
                          </button>
                          <br /> 
                          <div className="text-success mt-2">
                              * Submit your information and Contact us to Activation your account !
                              <Link className=" text-primary" to="/contact">Contact us</Link>
                          </div>
                          
                      </div>
                      
          </div>
        </div>

              <div className="col-md-4 col-12 mt-md-5 pt-md-5">
                  <div className="mt-5 pt-5">
                    <img  src={reg} alt="" className="mt-md-5 w-100" />  
                  </div>
            
        </div>
      </div>
    </div>
  );
};

export default Purchase;
