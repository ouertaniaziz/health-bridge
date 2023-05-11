import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentsDonor"

const PUBLIC_KEY ="pk_test_51N5O0VHbptfMWyTGeBoc6p55RHk9ZeEkfSLfPst7ehlJUk8Dz9pqUE2AMI03TdY3rT4Y5EnAigilmSaXPtZZolq000ZCVd0Ujc"

const stripeTestPromise = loadStripe(PUBLIC_KEY)



const StripeContainer: React.FC = () => {
    return (
      <Elements stripe={stripeTestPromise}>
        <PaymentForm />
      </Elements>
    );
  };
  
  export default StripeContainer;