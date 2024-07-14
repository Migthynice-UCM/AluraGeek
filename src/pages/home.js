import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    api.get("/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedProduct = {
      ...newProduct,
      price: parseFloat(newProduct.price),
    };
    api.post("/products", formattedProduct).then((response) => {
      setProducts([...products, response.data]);
      setNewProduct({ name: "", price: "", image: "" });
    });
  };

  const handleDelete = (id) => {
    api.delete(`/products/${id}`).then(() => {
      setProducts(products.filter((product) => product.id !== id));
    });
  };

  return (
    <div className="container mx-auto p-8">
      <Header />
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="lg:w-2/3 pr-0 lg:pr-8 mb-8 lg:mb-0">
          <h2 className="text-2xl font-pixel mb-4">MIS PRODUCTOS:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-card p-4 relative shadow-lg rounded-lg"
              >
                <div className="relative overflow-hidden rounded-lg border border-black">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <h2 className="text-lg font-semibold mb-1 text-white mt-2">
                  {product.name}
                </h2>
                <p className="text-md text-gray-300 mb-2">
                  ${Number(product.price).toFixed(2)}
                </p>
                <Link
                  to={`/product/${product.id}`}
                  className="text-blue-400 underline"
                >
                  Ver más
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="absolute bottom-2 right-2 bg-transparent text-white p-2 rounded-full"
                >
                  <img
                    src="/images/basura.svg"
                    alt="Eliminar"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/3 pl-0 lg:pl-8">
          <h2 className="text-2xl font-pixel mb-4">AGREGAR PRODUCTO:</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 shadow-lg rounded-lg"
          >
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="nombre..."
              className="border p-2 w-full mb-4 rounded-lg border-blue-500 placeholder-current text-blue-500 font-pixel"
            />
            <input
              type="text"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="precio..."
              className="border p-2 w-full mb-4 rounded-lg border-blue-500 placeholder-current text-blue-500 font-pixel"
            />
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              placeholder="imagen..."
              className="border p-2 w-full mb-4 rounded-lg border-blue-500 placeholder-current text-blue-500 font-pixel"
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-lg w-1/2 mr-2 font-pixel"
              >
                Enviar
              </button>
              <button
                type="reset"
                className="border border-blue-500 text-blue-500 p-2 rounded-lg w-1/2 ml-2 font-pixel"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
