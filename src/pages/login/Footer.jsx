import React from "react";
import "font-awesome/css/font-awesome.css";
import "../login/Footer.css";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const FooterApp = () => {
  return (
    <>
      <div className="footer__container">
        <Row className="FooterRow ">
          <Col className="FooterColMail col-md-12">
            <a className="text-dark" href="">
              Copyright © 2022 All rights reserved | ®Billscompany |
              billscompany22@gmail.com
            </a>
          </Col>

          <Col className="FooterColIcon col-md-12">
            <div className="social__media--wrap">
              <div className="button">
                <NavLink to="/*">
                  <div className="icon tI">
                    <i className="fa fa-instagram"></i>
                  </div>
                  <span>Instagram</span>
                </NavLink>
              </div>

              <div className="button ">
                <NavLink to="/*">
                  <div className="icon tI">
                    <i className="fa fa-facebook-f"></i>
                  </div>
                  <span>Facebook</span>
                </NavLink>
              </div>

              <div className="button">
                <NavLink to="/*">
                  <div className="icon tI">
                    <i className="fa fa-twitter"></i>
                  </div>
                  <span>Twitter</span>
                </NavLink>
              </div>

          
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default FooterApp;
