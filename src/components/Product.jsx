import React from "react";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";
import "./layout.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handlerToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 },
    });
  };

  const { Meta } = Card;

  return (
    <div className="CardsA">
      <Card
        hoverable
        style={{ width: 200, marginBottom: 30 }}
        cover={
          <img alt={product.name} src={product.image} style={{ height: 150 }} />
        }
      >
        <Meta title={product.name} description={`$${product.price}`} />
        <div className="product-btn">
          <Button onClick={() => handlerToCart()}>Agregar</Button>
        </div>
      </Card>
    </div>
  );
};

export default Product;
