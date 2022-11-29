import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Button, Form, Input, Row, Col } from "antd";
import "../login/Contact.css";
const { TextArea } = Input;

const Contact = () => {
  const form = useRef();
  //envío de email js
  const sendEmail = (e) => {
 
    emailjs
      .send("service_j674jg8", "template_vay33bg", e, "p-NgmvCaKTkomPPlV")
      .then(
        (result) => {
          console.log(result.text);
          alert("Mensaje enviado");
        },

        (error) => {
          error(error.text);
        }
      );
  };

  return (
    <>
      <hr className="hr" />

      <Row>
        <div className="ContainerContactanos">
          <Col offset={0} className="contC">
            <div>
              <h1 span={12} className="H1Contactanos">
                Contáctanos
              </h1>

              <h3 className="H3Contactanos">
                ¿Querés hacer tus tareas más faciles, responder a tus clientes
                al instante y mejorar la dinamica de tu empresa? dejanos tus
                datos y responderemos a la brevedad.
              </h3>
              <h3 className="H3Contactanos textC">
                Personalizamos tu cuenta a tus necesitades!
              </h3>
            </div>
          </Col>
          <Col offset={0} className="contC" id="contC">
            <Form
              className="FormContactanos"
              ref={form}
              onFinish={sendEmail}
              name="basic"
              id="FormContactanos"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
            >
              <Form.Item
                label="Nombre"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Por favor introduzca su nombre",
                  },

                  {
                    type: "regexp",
                    pattern: new RegExp("^[a-zA-Z]*$"),
                    message: "Por favor ingrese un nombre válido",
                  },

                  {
                    min: 2,
                    max: 20,
                    message: "En nombre debe contener entre 2 y 20 Caracteres",
                  },
                  {
                    validator: (_, value) =>
                      value.match(/^[a-zA-Z]+$/)
                        ? Promise.resolve()
                        : Promise.reject(
                            "Por favor ingrese sólo letras en el nombre."
                          ),
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Ingrese su nombre." />
              </Form.Item>
              <Form.Item
                label="Correo electrónico"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Por favor introduzca su correo electrónico.",
                  },
                  {
                    type: "email",
                    message: "Por favor ingrese un correo electrónico válido",
                  },
                  {
                    whitespace: true,
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Ingrese su correo electrónico" />
              </Form.Item>

              <Form.Item
                name="message"
                label="Mensaje"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese un mensaje",
                  },
                  {
                    min: 4,
                    max: 400,
                    message:
                      "Ingrese un mensaje válido, entre 4 y 400 caracteres",
                  },

                  {
                    whitespace: true,
                  },
                ]}
                hasFeedback
              >
                <TextArea
                  name="textarea"
                  cols={100}
                  rows={4}
                  showCount
                  maxLength={400}
                  hasFeedback
                  placeholder="Ingrese su consulta"
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 20,
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  id="botoncontacto"
                  value="Send"
                  class="ant-btn ant-btn-default add-new"
                  className="add-new "
                  style={{ fontWeight: "bold" }}
                >
                  Enviar
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </div>
      </Row>
    </>
  );
};
export default Contact;
