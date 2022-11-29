import { Button, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import "../home/home.css";

const Bills = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(
        "https://billscompany.herokuapp.com/api/bills/getbills"
      );
      setBillsData(data);
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
    getAllBills();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Nombre del cliente",
      dataIndex: "customerName",
    },
    {
      title: "Teléfono de contacto",
      dataIndex: "customerPhone",
    },
    {
      title: "Dirección del cliente",
      dataIndex: "customerAddress",
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
    },
    {
      title: "IVA",
      dataIndex: "tax",
    },
    {
      title: "Monto total:",
      dataIndex: "totalAmount",
    },
    {
      title: "Ver",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            className="cart-edit eye"
            onClick={() => {
              setSelectedBill(record);
              setPopModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="Hidden">
      <Layout>
        <h2>Mis presupuestos</h2>
        <div className="ContainerTabla">
          <Table dataSource={billsData} columns={columns} bordered />
        </div>

        {popModal && (
          <Modal
            title="Presupuesto Detallado"
            width={400}
            pagination={false}
            visible={popModal}
            onCancel={() => setPopModal(false)}
            footer={false}
          >
            <div className="card" ref={componentRef}>
              <div className="cardHeader">
                <h2 className="logo">Bill$</h2>
                <span>
                  Número: <b>+549381/0000000</b>
                </span>
                <span>
                  Dirección: <b>Gral. Paz 576 - Tucuman </b>
                </span>
              </div>
              <div className="cardBody">
                <div className="group">
                  <span>Nombre el cliente:</span>
                  <span>
                    <b>{selectedBill.customerName}</b>
                  </span>
                </div>
                <div className="group">
                  <span>Teléfono del cliente:</span>
                  <span>
                    <b>{selectedBill.customerPhone}</b>
                  </span>
                </div>
                <div className="group">
                  <span>Dirección del cliente:</span>
                  <span>
                    <b>{selectedBill.customerAddress}</b>
                  </span>
                </div>
                <div className="group">
                  <span>Fecha del pedido:</span>
                  <span>
                    <b>{selectedBill.createdAt.toString().substring(0, 10)}</b>
                  </span>
                </div>
                <div className="group">
                  <span>Monto Total</span>
                  <span>
                    <b>${selectedBill.totalAmount}</b>
                  </span>
                </div>
              </div>
              <div className="cardFooter">
                <h4>Tu pedido</h4>
                {selectedBill.cartItems.map((product) => (
                  <>
                    <div className="footerCard">
                      <div className="group">
                        <span>Producto:</span>
                        <span>
                          <b>{product.name}</b>
                        </span>
                      </div>
                      <div className="group">
                        <span>Cantidad:</span>
                        <span>
                          <b>{product.quantity}</b>
                        </span>
                      </div>
                      <div className="group">
                        <span>Precio:</span>
                        <span>
                          <b>${product.price}</b>
                        </span>
                      </div>
                    </div>
                  </>
                ))}
                <div className="footerCardTotal">
                  <div className="group">
                    <h3>Total:</h3>
                    <h3>
                      <b>${selectedBill.totalAmount}</b>
                    </h3>
                  </div>
                </div>
                <div className="footerThanks">
                  <span>¡Gracias por elegirnos!</span>
                </div>
              </div>
            </div>
            <div className="bills-btn-add">
              <Button
                onClick={handlePrint}
                htmlType="submit"
                className="add-new"
              >
                Generar Presupuesto
              </Button>
            </div>
          </Modal>
        )}
      </Layout>
    </div>
  );
};

export default Bills;
