import React from "react";

const Inventory = () => {
  const handelAddProduct = () => {
    const product = {};
    fetch("https://evening-tundra-42456.herokuapp.com/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  };
  return (
    <div>
      <form action="">
        <p>
          <span>Name:</span>
          <input type="text" />
        </p>
        <p>
          <span>Priice:</span>
          <input type="text" />
        </p>
        <p>
          <span>Quantity:</span>
          <input type="text" />
        </p>
        <p>
          <span>ProductImage:</span>
          <input type="file" />
        </p>
        <button onClick={handelAddProduct}>Add Product</button>
      </form>
    </div>
  );
};

export default Inventory;
