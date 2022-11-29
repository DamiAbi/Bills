import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LayoutApp from "../../components/Layout";
import {
  DeleteOutlined,
  EditOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
  message,
  notification,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import "../home/home.css";

const Products = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  const getAllProducts = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(
        "https://billscompany.herokuapp.com/api/products/getproducts"
      );
      setProductData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const openNotification = (record) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        size="small"
        className="add-new"
        onClick={() => {
          handlerDelete(record);
          notification.close(key);
        }}
      >
        Confirmar
      </Button>
    );
    notification.open({
      message: "¿Seguro desea borrar el producto?",

      icon: <WarningOutlined style={{ color: "#ff7f50" }} />,
      btn,
      key,
    });
  };


  const handlerDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post(
        "https://billscompany.herokuapp.com/api/products/deleteproducts",
        {
          productId: record._id,
        }
      );
      message.success("Producto Eliminado!");
      getAllProducts();
      setPopModal(false);
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


  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
    },
    {
      title: "Imagen",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height={50} width={50} />
      ),
    },
    {
      title: "Precio",
      dataIndex: "price",
    },
    {
      title: "Acción",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <DeleteOutlined
            className="cart-action"
            onClick={() => openNotification(record)}
          />
          <EditOutlined
            className="cart-edit"
            onClick={() => {
              setEditProduct(record);
              setPopModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handlerSubmit = async (value) => {
 
    if (editProduct === false) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post(
          "https://billscompany.herokuapp.com/api/products/addproducts",
          value
        );
        message.success("Producto Agregado!");
        getAllProducts();
        setPopModal(false);
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
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.put(
          "https://billscompany.herokuapp.com/api/products/updateproducts",
          {
            ...value,
            productId: editProduct._id,
          }
        );
        message.success("Product Actualizado!");
        getAllProducts();
        setPopModal(false);
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
    }
  };

  return (
    <div className="Hidden">
      <LayoutApp>
        <h2>Mis Productos</h2>
        <Button className="add-new" onClick={() => setPopModal(true)}>
          Agregar Nuevo
        </Button>
        <Table
          className="ContainerTabla"
          dataSource={productData}
          columns={columns}
          bordered
        />

        {popModal && (
          <Modal
            title={`${
              editProduct !== false ? "Editar producto" : "Agregar Producto"
            }`}
            visible={popModal}
            onCancel={() => {
              setEditProduct(false);
              setPopModal(false);
            }}
            footer={false}
          >
            <Form
              layout="vertical"
              initialValues={editProduct}
              onFinish={handlerSubmit}
            >
              <FormItem
                name="name"
                label="Nombre"
                rules={[
                  {
                    required: true,

                    pattern: new RegExp(/^[A-Za-z0-9 - -]*$/),
                    message: "Por favor ingrese nombre válido.",
                  },
                  {
                    min: 2,
                    max: 25,
                    message: "El nombre debe contener entre 2 y 25 caracteres.",
                  },
                ]}
              >
                <Input
                  placeholder="Ingrese el nombre del producto"
                  className="modalinput"
                />
              </FormItem>
              <Form.Item
                name="category"
                label="Categoría"
                rules={[
                  { required: true, message: "Seleccione una categoría" },
                ]}
              >
                <Select
                  placeholder="Seleccione una categoría"
                  className="modalinput"
                >
                  <Select.Option value="accesorios">Accesorios</Select.Option>
                  <Select.Option value="celulares">Celulares</Select.Option>
                  <Select.Option value="herramientas">
                    Herramientas
                  </Select.Option>
                </Select>
              </Form.Item>
              <FormItem
                name="price"
                label="Precio"
                rules={[
                  {
                    required: true,

                    pattern: /^(\d*[1-9]\d*(\.\d+)?|0*\.\d*[1-9]\d*)$/,

                    message: "Por favor ingrese un precio válido.",
                  },
                  {
                    max: 7,
                    message: "No es posible ingresar mas de 7 caracteres",
                  },
                ]}
              >
                <Input
                  placeholder="Ingrese el precio del producto sin el signo $"
                  className="modalinput"
                />
              </FormItem>
              <FormItem name="image" label="URL Imagen (opcional)">
                <Input
                  placeholder="Ingrese dirección de la imagen de su producto."
                  className="modalinput"
                />
              </FormItem>
              <div className="form-btn-add">
                <Button htmlType="submit" className="add-new">
                  Agregar
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </LayoutApp>
    </div>
  );
};

export default Products;
