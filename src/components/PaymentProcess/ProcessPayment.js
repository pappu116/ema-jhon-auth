import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCard from "./SimpleCard";
import SpliteCardForm from "./SpliteCardForm";
const stripePromise = loadStripe(
  "pk_test_51HZieoLzpC3OzHeeIx6gpC8asEeVfjGY6vDsQLQ3We6X5tkNejxVETxk2XJg9nGnV2xQDVoqIdWZXOe0jJi2TxAi00B9udqu0l"
);

const ProcessPayment = ({ handelPayment }) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCard handelPayment={handelPayment} />
    </Elements>
  );
};

export default ProcessPayment;
