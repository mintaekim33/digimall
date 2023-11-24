import React, { useContext } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataContext } from "../App";

function Home() {
  const { products } = useContext(DataContext);

  return (
    <div className="homepage">
      <div className="homeContainer">
        <div className="welcome">Welcome to Digimall</div>
        <section className="products-section">
          <Link to="/products">
            <Button variant="contained" size="large">
              View products
            </Button>
          </Link>
          <div className="products-display">
            {products.map((product) => (
              <img
                key={product.id}
                src={product.thumbnail}
                width={150}
                height={150}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
