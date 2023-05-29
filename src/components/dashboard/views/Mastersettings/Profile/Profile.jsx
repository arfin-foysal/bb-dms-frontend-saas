import React from "react";
import { Card, Row } from "react-bootstrap";
import avatar from "../../../../../assets/images/user/avatar-2.jpg";
import { useUserProfileQuery } from "../../../../../services/userApi";
import { useParams } from "react-router-dom";
const Profile = () => {
  const { id } = useParams();
  const profileRes = useUserProfileQuery(id);



  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Profile</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row className=" border ">
            <div className=" text-center">
              <img
                className="img-fluid rounded-circle "
                style={{ width: "200px", height: "200px" }}
                src={
                  profileRes?.data?.data?.image
                    ? `${import.meta.env.VITE_FILE_URL}${profileRes?.data?.data?.image}`
                    : avatar
                }
                alt=""
              />
            </div>
            <div className=" text-center">
              <p>
                Name:
                <span className="font-weight-bold text-primary ">
                  {profileRes?.data?.data?.name}
                </span>
              </p>
              <p>
                Email:
                <span className="font-weight-bold text-primary ">
                  {profileRes?.data?.data?.email}{" "}
                </span>
              </p>
              <p>
                Username:
                <span className="font-weight-bold text-primary ">
                  {profileRes?.data?.data?.username}{" "}
                </span>
              </p>

              <p>
                Number:
                <span className="font-weight-bold text-primary">
                  {profileRes?.data?.data?.number}
                </span>
              </p>
              <p>
                Gender:
                <span className="font-weight-bold text-primary">
                  {profileRes?.data?.data?.gender}{" "}
                </span>
              </p>
              <p>
                company name :
                <span className="font-weight-bold text-primary">
                  {profileRes?.data?.data?.company_name}
                </span>
              </p>
            </div>
            <div className="col-md-4 col-12 py-3">
          
        
            </div>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
