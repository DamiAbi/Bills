import React from "react";
import "./NotFound.css";
import not from "../assets/not.jpg";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "antd";

export default function NotFound() {
  return (
    <>
      <Row>
        <Col>
          <div className="containerNF">
            <div className="div404">
              
              <Image
                className="img404 animate__animated animate__rubberBand"
                src={not}
                alt="Image404"
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="form-btn-add">
            <Button htmlType="submit" className="add-new boton404">
              <Link to="/login"> Volver </Link>
            </Button>
            <Link className="form-other" to="/"></Link>
          </div>
        </Col>
      </Row>
    </>
  );
}
