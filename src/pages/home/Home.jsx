import React, { useState, useEffect } from "react";
import axios from "axios";
import LayoutApp from "../../components/Layout";
import { Row, Col } from "antd";
import Product from "../../components/Product";
import { useDispatch } from "react-redux";
import "../home/home.css";
const Home = () => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("accesorios");
  const categories = [
    {
      name: "accesorios",
      imageUrl:
        "https://img.freepik.com/vector-gratis/ilustracion-icono-auriculares_53876-5571.jpg?w=740&t=st=1661901109~exp=1661901709~hmac=08a66e97667c749c7955a68212bf55a220c8d1462913f101b3cf13d428691122",
    },
    {
      name: "celulares",
      imageUrl:
        "https://img.freepik.com/vector-gratis/memos-voz_24877-51912.jpg?w=740&t=st=1661900953~exp=1661901553~hmac=c3e896b0948ea6f70d15db4d2a2f06e7936d8d03ea53095316c87cee44c4dd26",
    },
    {
      name: "herramientas",
      imageUrl:
        "https://img.freepik.com/vector-gratis/coleccion-herramientas-diseno-plano_1234-41.jpg?w=740&t=st=1661901218~exp=1661901818~hmac=b24a3110d0d9994192eb304989db6d276dd555ce67742c0604996005b84cffe8",
    },
  ];

  useEffect(() => {
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
        console.log(error);
      }
    };

    getAllProducts();
  }, [dispatch]);

  return (
    <div className="Hidden">
      <LayoutApp>
        <div className="category ">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`categoryFlex ${
                selectedCategory === category.name && "category-active"
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <h3 className="categoryName">{category.name}</h3>
              <img
                src={category.imageUrl}
                alt={category.name}
                height={60}
                width={60}
              />
            </div>
          ))}
        </div>
        <Row className="prod">
          {productData
            .filter((i) => i.category === selectedCategory)
            .map((product) => (
              <Col xs={24} sm={6} md={12} lg={6}>
                <Product key={product.id} product={product} />
              </Col>
            ))}
        </Row>
      </LayoutApp>
    </div>
  );
};

export default Home;
