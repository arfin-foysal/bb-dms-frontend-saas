import React from "react";
import { Card, Row } from "react-bootstrap";
import avatar from "../../../../../assets/images/user/avatar-2.jpg";
import { useUserProfileQuery } from "../../../../../services/userApi";
import { useParams } from "react-router-dom";
const Profile = () => {
  const { id } = useParams();
  const profileRes = useUserProfileQuery(id);

  console.log(profileRes);

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Profile</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <div class="col-md-4 col-12 py-3">
              <img
                class="img-fluid rounded-circle "
                style={{ width: "200px", height: "200px" }}
                src={
                  profileRes?.data?.data?.image
                    ? `${process.env.REACT_APP_IMAGE_URL}${profileRes?.data?.data?.image}`
                    : avatar
                }
                alt=""
              />
            </div>
            <div class="col-md-4 col-12 py-3">
              <p>
                Name:
                <span class="font-weight-bold text-primary ">
                  {profileRes?.data?.data?.name}
                </span>
              </p>
              <p>
                Email:
                <span class="font-weight-bold text-primary ">
                  {profileRes?.data?.data?.email}{" "}
                </span>
              </p>
              <p>
                Username:
                <span class="font-weight-bold text-primary ">
                  {profileRes?.data?.data?.username}{" "}
                </span>
              </p>

              <p>
                Number:
                <span class="font-weight-bold text-primary">
                  {profileRes?.data?.data?.number}
                </span>
              </p>
              <p>
                Gender:
                <span class="font-weight-bold text-primary">
                  {profileRes?.data?.data?.gender}{" "}
                </span>
              </p>
            </div>
            <div class="col-md-4 col-12 py-3">
              <p>
                company name :
                <span class="font-weight-bold text-primary">
                  {profileRes?.data?.data?.company_name}
                </span>
              </p>
              <p>
                Updated at :<span class="font-weight-bold text-primary"></span>
              </p>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
