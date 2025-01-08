import React from "react";
// import Image from "next/image";
import { Image } from 'antd';

const ProductDetails = ({ product, onBack}) => {
  const addtocart = (product) => {
    console.log("Product added to cart:", product.Name);
  };

  return (
    <div className="product-details flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-16 p-6">
      {/* Left side: Image */}
      <div className="image-container">
        <Image
          src={product.image}
          alt={product.Name}
          width={400}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Right side: Product details */}
      <div className="details-container max-w-lg">
        <h2 className="text-3xl font-bold mb-4">{product.Name}</h2>
        <p className="text-lg text-gray-700 mb-4">
          Price: <span className="font-semibold">${product.price}</span>
        </p>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tristique justo non nibh sollicitudin, a vehicula velit pellentesque.
        </p>
        <div className="buttons flex gap-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            onClick={() => addtocart(product)}
          >
            Add to Cart
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
            onClick={onBack}
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
