import React, { useEffect } from "react";
import styled from "styled-components";
import { useProductsContext } from "../context/products_context";
import { uniqueCategories } from "../helpers";
import { Navbar } from ".";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Products = ({ heading }) => {
  const history = useHistory();
  const { pathname } = history.location;
  const str = pathname.slice(-17);
  const { products, filter_products, setCategory, showModal } =
    useProductsContext();
  let categories;
  if (products) {
    categories = uniqueCategories(products);
  }

  useEffect(() => {
    if (str.length > 9 && str.startsWith("rec")) {
      showModal();
    }
  }, [pathname]);

  return (
    <section style={{ background: "#150f0f" }}>
      <Navbar />
      <div style={{ width: "80vw", margin: "0 auto", paddingTop: "8rem" }}>
        <ProductsHeading style={{ color: "#fff" }}>{heading}</ProductsHeading>
        <ProductsContainer>
          <div>
            <h1>Categories</h1>
            {categories &&
              categories.map((c, index) => {
                return (
                  <div key={index}>
                    <button
                      className="category-btn"
                      type="button"
                      name="category"
                      key={index}
                      onClick={(e) => setCategory(e)}
                    >
                      {c}
                    </button>
                  </div>
                );
              })}
            <Cart />
          </div>
          <ProductWrapper>
            {filter_products &&
              filter_products.map((product) => {
                const { id, name, url, recipe } = product;
                return (
                  <ProductCard key={id}>
                    <ProductImg src={url} alt="" />
                    <ProductInfo>
                      <ProductButton to={`/products/${id}`} onClick={showModal}>
                        Add
                      </ProductButton>
                      <ProductTitle>{name}</ProductTitle>
                      <ProductDesc>{recipe}</ProductDesc>
                      {/* <ProductPrice>{price}</ProductPrice> */}
                    </ProductInfo>
                  </ProductCard>
                );
              })}
          </ProductWrapper>
        </ProductsContainer>
      </div>
    </section>
  );
};
export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  /* width: 100vw; */
  min-height: 100vh;
  background: #150f0f;
  color: #fff;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`;

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
  line-height: 2;
  width: 300px;
`;

export const ProductImg = styled.img`
  border-radius: 0.5rem;
  height: 200px;
  object-fit: cover;
  min-width: 200px;
  max-width: 100%;
`;

export const ProductsHeading = styled.h1`
  font-size: clamp(2rem, 2.5vw, 3rem);
  text-align: center;
  margin-bottom: 5rem;
`;

export const ProductTitle = styled.h2`
  font-weight: 400;
  font-size: 1.5rem;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
`;

export const ProductDesc = styled.p`
  margin-bottom: 1rem;
`;

export const ProductPrice = styled.p`
  margin-bottom: 1rem;
  font-size: 2rem;
`;

export const ProductButton = styled(Link)`
  font-size: 1rem;
  padding: 0.5rem 2rem;
  border: none;
  border-radius: 0.5rem;
  text-decoration: none;
  background: #e31837;
  color: #fff;
  transition: 0.2 ease-out;
  &:hover {
    background: #ffc500;
    transition: 0.2s ease-out;
    cursor: pointer;
    color: #000;
  }
`;
export default Products;
