import { Button, Form, Input, message, Row } from "antd";
import Col from "antd/es/grid/col";
import FormItem from "antd/lib/form/FormItem";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import Footer from "../login/Footer";
import CardsR from "./CardsR";
import TextHome from "./TextHome";
import "../home/home.css";
import "../login/login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (value) => {
    //console.log(value);
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const res = await axios.post(
        "https://billscompany.herokuapp.com/api/auth/login",
        value
      );
      dispatch({
        type: "HIDE_LOADING",
      });
      message.success("Login Exitoso!");
      localStorage.setItem("token", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      message.error("Correo o contraseña invalidos");
      console.log(error);
    }
  };

  return (
    <div className="ContainerL">
      <>
        <Row className="ContainerT">
          <Col>
            <TextHome />
          </Col>
          <br />
          <Col className="formLogin">
            <div className="form">
              <br />

              <div className="form-group">
                <Form layout="vertical" onFinish={handlerSubmit}>
                  <h1>Iniciar sesión</h1>

                  <FormItem
                    className="Items"
                    name="email"
                    label="Correo electrónico"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      {
                        required: true,

                        message: "Introduzca su correo electrónico",
                      },
                      { type: "email", message: "Introduzca un correo válido" },
                      {
                        max: 25,
                        message:
                          "El correo no debe contener más de 25 caracteres",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input />
                  </FormItem>
                  <FormItem
                    className="ItemsA"
                    name="password"
                    label="Contraseña"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      {
                        required: true,
                        message: "Introduzca una contraseña.",
                      },
                      {
                        max: 20,
                        message:
                          "La contraseña no debe contener más de 20 caracteres",
                      },
                    ]}
                  >
                    <Input.Password />
                  </FormItem>
                  <div className="BL form-btn-add">
                    <Button htmlType="submit" className=" add-new">
                      Enviar
                    </Button>
                    <Link
                      className="form-otherL"
                      to="/register"
                      style={{ fontWeight: "bold" }}
                    >
                      ¡Registrate aquí!
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
        <CardsR />
        <AboutUs />
        <Contact />
        <Footer />
      </>
    </div>
  );
};

export default Login;
