import React, { Component } from "react";
import { Card, Col, Row } from "antd";
import "../login/cards-style.css";

class CardsR1 extends Component {
  render() {
    return (
      <div
        className="ContainerC
       site-card-wrapper"
      >
       
        <Row gutter={20} className="CardRow">
          <Col className="CC" span={7}>
            <Card title="Armá tu presupuesto" bordered={false}>
              <Row>
                <p className="Par">
                  Crearás un archivo con todos los detalles de tus productos en
                  sólo unos minutos.{" "}
                </p>
              </Row>
            </Card>
          </Col>
          <Col className="CC" span={7}>
            <Card title="Mandalo al instante" bordered={false}>
              <p className="Par">
                Archivo listo para enviar vía email desde el mismo sitio! todo
                automaticamente!
              </p>
            </Card>
          </Col>
          <Col className="CC" span={7}>
            <Card title="Seguí disfrutando tu día" bordered={false}>
              <p className="Par">
                Presupuestar nunca fue tan rápido y tan fácil. Donde estés
                directo a tus clientes!
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default CardsR1;
