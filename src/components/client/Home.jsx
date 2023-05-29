import React from "react";
import Slider from "./components/Slider";
import image_1 from "./../../assets/images/doc.png";

import doc from "./../../assets/pdms_doc/PDMS.pdf";
import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <>
      {/* <Slider /> */}

      <div className="container my-2">
        <div className="row pt-5">
          <div className=" col-md-4 col-12 text-center">
            <div>
              <img src={image_1} alt="" className=" w-100" />
            </div>
          </div>

          <div className="col-md-8 col-12 mt-3 ">
            <div>
              <h3>Personal Document Management System (PDMS)</h3>
              <h5 className="my-3">Features of PDMS :</h5>
              <ul>
                <li className="mt-2">
                  <b>Document storage:</b> The system allows users to store
                  digital documents in a centralized location. This eliminates
                  the need to store documents in multiple locations, making it
                  easier to keep track of them.
                </li>
                <li className="mt-2">
                  <b>Document categorization:</b> The system enables users to
                  categorize their documents based on parameters such as type,
                  date, or topic. This makes it easy to locate specific
                  documents quickly.
                </li>
                <li className="mt-2">
                  <b>Search capabilities:</b> The system allows users to search
                  for particular documents by entering keywords or other search
                  parameters. This makes it easy to find documents quickly and
                  efficiently.
                </li>

                <li className="mt-2">
                  <b>Security:</b> The system provides robust security features,
                  including data encryption and user authentication. This
                  ensures that users' documents are secure and protected from
                  unauthorized access
                </li>
                <li className="mt-2">
                  <b>Sharing:</b> The system allows users to share documents
                  with other users or groups. This feature can be useful in a
                  collaborative work environment where multiple users need
                  access to the same documents.
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-5">
            <p>
              A Personal Document Management System (PDMS) is a digital system
              that allows you to store and manage your documents in one
              centralized location. With PDMS, you can easily categorize your
              documents based on parameters like type, date, or topic, making it
              easy to locate specific documents quickly. Its advanced search
              functions save you time and effort when looking for documents.
              PDMS also provides robust security features, including data
              encryption and user authentication, and allows for easy document
              sharing. By eliminating the need for physical storage space, PDMS
              can save you money on storage costs while improving document
              organization and enhancing security.
            </p>
          </div>
          <div className="my-4">
            <h5 className="my-4">
              Using a PDMS offers several benefits, including:
            </h5>

            <ul>
              <li className="mt-2">
                <b>Improved document organization:</b> A PDMS enables users to
                organize their documents more effectively, making finding and
                retrieving them easier.
              </li>
              <li className="mt-2">
                <b> Time savings:</b> With a PDMS, users can access their
                documents quickly and efficiently, saving time and effort.
              </li>
              <li className="mt-2">
                <b> Enhanced security:</b> A PDMS provides robust security
                features, protecting users' documents from unauthorized access
                or theft.
              </li>
              <li className="mt-2">
                <b>Cost savings:</b> By eliminating the need for physical
                storage space, a PDMS can save users money on storage costs.
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mb-5">
          <p>know more about PDMS</p>

          <Button variant="primary" href={doc} download>
            Download
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
