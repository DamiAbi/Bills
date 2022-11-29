import React from "react";
import { Row, Col } from "react-bootstrap";
import "../login/AboutUs.css";

function AboutUs() {
  return (
    <Row className="abC">
      <div className="about">
        <Col className="col colAb">
          <div className="text">
            <h1>¿De qué se trata esto?</h1>
            <h3 className="hA">¡Automatizamos tus presupuestos!</h3>
            <br />
            <h4>
              Desde donde te encuentres envialos al instante! Creá la cuenta de
              tu empresa, cargá tus productos por única vez. Podés modificar y
              agregar los detalles que desees cuando quieras.
            </h4>
            <h4>
              ¿Tenés un pedido? Ingresá, cargalo ¡Y listo! Enviar al cliente!
            </h4>
          </div>
        </Col>
          
        <br />
        <br />
        <br />
        <Col className="col colAb">
          <div>
            <h1>¿Quiénes somos?</h1>
            <h3 className="hA">
              Queremos ayudarte a hacer tu empresa más rapida, eficaz y
              rentable.
            </h3>
            <br />
            <h4>
              Bills está integrado por un equipo de desarrolladores con talento
              creativo y alto conocimiento de la industria de la tecnología.
              Nuestros estándares de calidad estan comprometidos a mejorar los
              procesos que puedan asegurar hacer tu empresa más eficiente.
            </h4>
          </div>
        </Col>
      </div>
    </Row>
  );
}
export default AboutUs;
