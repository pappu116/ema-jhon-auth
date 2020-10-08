import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useContext } from "react";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import ProcessPayment from "../PaymentProcess/ProcessPayment";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [paymentData, setPaymentData] = useState(null);
  const onSubmit = (data) => {
    setPaymentData(data);
  };

  const paymentHandelSuccess = (paymentId) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: paymentData,
      paymentId,
      orderTime: new Date(),
    };

    fetch("https://evening-tundra-42456.herokuapp.com/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          alert("Your Order successfully");
        }
      });
  };
  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="row">
      <div
        style={{ display: paymentData ? "none" : "block" }}
        className="col-md-6"
      >
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            defaultValue={loggedInUser.name}
            ref={register({ required: true })}
            placeholder="Your Name"
          />
          {errors.name && <span className="error">Name is required</span>}

          <input
            name="email"
            defaultValue={loggedInUser.email}
            ref={register({ required: true })}
            placeholder="Your Email"
          />
          {errors.email && <span className="error">Email is required</span>}

          <input
            name="address"
            ref={register({ required: true })}
            placeholder="Your Address"
          />
          {errors.address && <span className="error">Address is required</span>}

          <input
            name="phone"
            ref={register({ required: true })}
            placeholder="Your Phone Number"
          />
          {errors.phone && (
            <span className="error">Phone Number is required</span>
          )}

          <input type="submit" />
        </form>
      </div>
      <div
        style={{ display: paymentData ? "block" : "none" }}
        className="col-md-6"
      >
        <ProcessPayment handelPayment={paymentHandelSuccess} />
      </div>
    </div>
  );
};

export default Shipment;
