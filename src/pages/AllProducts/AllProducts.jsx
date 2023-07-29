import React, { useEffect, useState } from "react";
import "./AllProducts.css";
import { ProductCard } from "../../common/ProductCard/ProductCard";
import { Col, Container, Row } from "react-bootstrap";
import { getAllProducts } from "../../services/apicalls";

export const AllProducts = () => {

    const [products, setProducts] = useState([]);
    
    useEffect(()=>{
        if(products.length === 0){
            getAllProducts()
                .then((response)=>{
                    setProducts(response.data.data)
                })
        }
    },[products])

    return(
        <div className="allProductsDesign">
            <Container>
                <Row className="d-flex justify-content-around align-items-center">
                    {products.length > 0

                        ? products.map((product)=>(
                            <Col key={product.id} className="allProductsCardHeight d-flex justify-content-around align-items-center h-100 mt-5 mb-5">
                                <ProductCard
                                    image = {product.image}
                                    name = {product.name}
                                    price = {product.price}
                                    id = {product.id}
                                />
                            </Col>
                        ))
                        
                        :null
                    }
                </Row>
            </Container>
        </div>
    )

}