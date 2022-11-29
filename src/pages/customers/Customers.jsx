import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import "../home/home.css";

const Customers = () => {
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);

  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/bills/getbills");
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
      title: "Cliente",
      dataIndex: "customerName",
    },
    {
      title: "Contacto",
      dataIndex: "customerPhone",
    },
    {
      title: "Dirección",
      dataIndex: "customerAddress",
    },
  ];

  return (
    <Layout>
      <div className="Hidden">
        <h2>Clientes </h2>

        <div className="ContainerTabla ">
          <Table dataSource={billsData} columns={columns} bordered />
        </div>
      </div>
    </Layout>
  );
};

export default Customers;
