/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { BsPhoneFill } from "react-icons/bs";
import { MdMarkEmailUnread } from "react-icons/md";

function Contact() {
  return (
    <>
      <div className="container my-2">
        <div className="text-center my-5">
          <h3>Tell us how we can help you ?</h3>
        </div>

        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5476925322973!2d90.42833757603036!3d23.76350358827194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c78ab9d83ac9%3A0x66e9c1251c18fc2!2sBacBon%20Limited!5e0!3m2!1sen!2sbd!4v1685356542739!5m2!1sen!2sbd"
            width="100%"
            height="450"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="row my-5 gx-5">
          <div className="col p-3 shadow-lg border border-1 p-4 m-2">
            <div>
              <h3>
                <BiCurrentLocation/>
                Location
              </h3>
              <div class="text ">
                <p>
                  House #13(5th Floor), Block-C, <br /> Main Road, Banasree,
                  Rampura, Dhaka-1219.
                </p>
              </div>
            </div>
          </div>
          <div className="col shadow-lg border border-1 p-4 m-2">
            <div>
              <h3>
                <BsPhoneFill/>
                Phone Number</h3>
              <div class="text ">
                <p>
                  +88 01836 14 9699 <br /> +88 02 8396601
                </p>
              </div>
            </div>
          </div>
          <div className="col shadow-lg border border-1 p-4  m-2">
            <div>
              <h3>
                
                <MdMarkEmailUnread/>
                E-Mail Us</h3>
              <div class="text ">
                <p>info@bacbonltd.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
