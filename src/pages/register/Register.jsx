import { Button, Form, Input, message, Row } from "antd";
import FormItem from "antd/lib/form/FormItem";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import logo6 from "../../assets/logo6.png";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (value) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post(
        "https://billscompany.herokuapp.com/api/usuarios",
        value
      );
      message.success("Registro Exitoso!");
      navigate("/login");
      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      message.error("Error!");
      console.log(error);
    }
  };

  return (
    <Row className="ContainerR">
      <div className="formRegistro">
        <div className="form formRt">
          <div className="form-group formRu">
            <Form
              layout="vertical"
              onFinish={handlerSubmit}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Row>
                <img src={logo6} alt="logo" className="logoR" />
                <h1> Registro de Usuario</h1>
              </Row>
              <FormItem
                className="imp"
                name="nombre"
                label="Nombre"
                style={{ fontWeight: "bold" }}
                rules={[
                  {
                    required: true,

                    message: "Introduzca su nombre",
                  },
                  {
                    max: 20,
                    message: "El nombre no debe contener más de 20 caracteres",
                  },
                ]}
                hasFeedback
              >
                <Input className="ItemR " />
              </FormItem>

              <FormItem
                className="imp"
                name="email"
                label="Correo Electrónico"
                style={{ fontWeight: "bold" }}
                rules={[
                  {
                    required: true,

                    message: "Introduzca su correo electrónico",
                  },
                  { type: "email", message: "Introduzca un correo válido" },
                  {
                    max: 25,
                    message: "El correo no debe contener más de 25 caracteres",
                  },
                ]}
                hasFeedback
              >
                <Input className="ItemR" />
              </FormItem>

              <FormItem
                className="imp"
                name="password"
                label="Contraseña"
                style={{ fontWeight: "bold" }}
                rules={[
                  {
                    max: 10,
                    message:
                      "El contraseña no debe contener más de 10 caracteres",
                  },

                  {
                    required: true,
                    pattern: new RegExp(/^(?=.*\d).{6,10}$/i),
                    message:
                      "La contraseña debe contener de seis a diez caracteres y al menos un número",
                  },
                ]}
                hasFeedback
              >
                <Input.Password className="ItemR" />
              </FormItem>

              <FormItem
                className="imp"
                name="confirmPassword"
                label="Confirmar contraseña"
                style={{ fontWeight: "bold" }}
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Vuelva a introducir la contraseña.",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Las contraseñas no coinciden.");
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password className="ItemR" />
              </FormItem>

              <div className="form-btn-add btnR">
                <Button
                  htmlType="submit"
                  className="add-new"
                  style={{ fontWeight: "bold" }}
                >
                  Registro
                </Button>
                <Link
                  className="form-other textR"
                  to="/login"
                  style={{ fontWeight: "bold" }}
                >
                  Iniciar sesión aquí!
                </Link>
                <br />
                <br />
                <Link
                  className="form-other textR"
                  to="/login"
                  style={{ fontWeight: "bold" }}
                >
                  Volver
                </Link>
              </div>
              <br />
            </Form>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default Register;
