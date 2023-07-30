import React, { useEffect, useState } from "react";
import "./AllProducts.css";
import { ProductCard } from "../../common/ProductCard/ProductCard";
import { Col, Container, Row } from "react-bootstrap";
import {
  getAllProducts,
  getAllProductsFiltered,
  getAllTypes,
} from "../../services/apicalls";

export const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (products.length === 0) {
      getAllProducts().then((response) => {
        setProducts(response.data.data);
      });
    }
  }, [products]);

  const [types, setTypes] = useState([]);

  useEffect(() => {
    getAllTypes().then((response) => {
      setTypes(response.data.data);
    });
  }, [types, products]);

  const [typeSelected, setTypeSelected] = useState("");

  const handleTypeSelected = (event) => {
    setTypeSelected(event.target.value);
  };

  const [name, setName] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const [diamonds, setDiamonds] = useState(false);

  const handleDiamonds = () => {
    setDiamonds((prevState) => !prevState);
  };
  useEffect(() => {
    if (typeSelected != "" || name != "" || diamonds !== false) {
      const bring = setTimeout(() => {
        getAllProductsFiltered(typeSelected, name, diamonds)
          .then((response) => {
            setProducts(response.data.data);
          })
          .catch((error) => console.log(error));
      }, 350);

      return () => clearTimeout(bring);
    } else {
      getAllProducts()
        .then((results) => {
          setProducts(results.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [typeSelected, name, diamonds]);

  return (
    <div className="allProductsDesign">
      <Container>
        <Row className="d-flex justify-content-center align-items-center mt-3 filterNavbar p-2">
          <Col
            xs={10}
            sm={2}
            md={2}
            lg={4}
            className="d-flex justify-content-center "
          >
            <select value={typeSelected} onChange={handleTypeSelected}>
              <option value="">Filtrar por tipo</option>
              {types.length > 0
                ? types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))
                : null}
            </select>
          </Col>
          <Col
            xs={10}
            sm={2}
            md={2}
            lg={4}
            className="d-flex justify-content-center align-items-center"
          >
            <input
              placeholder="Buscar..."
              type="text"
              value={name}
              onChange={handleName}
              className="text-center"
            />
          </Col>
          <Col
            xs={10}
            sm={2}
            md={2}
            lg={4}
            className="d-flex justify-content-center align-items-center"
          >
            <input
              type="checkbox"
              checked={diamonds}
              onChange={handleDiamonds}
            />
            <div className="checkboxText ms-2">
              Solo artículos con diamantes
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-around align-items-center">
          {products.length > 0
            ? products.map((product) => (
                <Col
                  key={product.id}
                  className="allProductsCardHeight d-flex justify-content-around align-items-center h-100 mt-5 mb-5"
                >
                  <ProductCard
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    id={product.id}
                  />
                </Col>
              ))
            : null}
        </Row>
      </Container>
    </div>
  );
};
