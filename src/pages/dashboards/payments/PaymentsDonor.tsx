import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from 'react';
import axiosInstance from "../../../config/axios";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Item from "antd/es/list/Item";
import { Input, notification } from "antd";
import { IPageData } from "../../../interfaces/page";
import { usePageData } from "../../../hooks/usePage";
const logo=require('./Donor2.png')
const donate=require('./imagesDonor/donaters.png')
const pageData: IPageData = {
  title: 'Donate  ',
  fulFilled: true,
  breadcrumbs: [
    {
      
      title: 'Events calendar'
    }
  ]
};

const CARD_OPTIONS: StripeCardElementOptions = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "",
      fontWeight: 50,
     
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "13px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#00008B" },
      backgroundColor:"#E5E7E9 ",
      lineHeight:"40px",
      color:"#00008B",
    
    },
    invalid: {
      iconColor: "#ffff",
      color: "#ffff"
    }
  }
  
}
type NotificationType = 'success' ;


export default function PaymentForm(): JSX.Element {
  usePageData(pageData);

  const [success, setSuccess] = useState(false);
  const [form, setform] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Donation done',
      description:
        'Thank you for your donation.',
    });
  };
  const handleChange = (e) => {
    setform(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    openNotificationWithIcon('success')
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axiosInstance.post("/donation/payment", {
          amount: form,
          id
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
         
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  }

  return (
    
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        {contextHolder}  
                  {/* <img src={logo} alt="payment image" style={{ width: "50%", margin: "'40px auto" , paddingLeft:"140px"}} /> */}

      <form onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <div className="FormRow" style={{ paddingBottom:"20px", width:"420px", fontSize:"20px", paddingLeft:"80px", paddingRight:"50px"}}>
            <CardElement options={CARD_OPTIONS}/>
          </div>
        </fieldset>
        <Input
          name='payment'
          placeholder='payment'
          onChange={handleChange}
          style={{ width: 300, marginBottom: "10px",marginLeft:"80px" }}

        />

 
        <button
          type="submit"
          className="ant-btn css-dev-only-do-not-override-yp8pcc ant-btn-primary"
          style={{ width: 120 ,marginLeft:"150px",}}
          // color="#00008B"
        >
          Donate
        </button>
        <div>
      <img src={donate} alt=""  style={{ width: "100%", margin: " auto" , paddingLeft:"10px"}} />
      </div>

      </form>
    

    </div>
    
   
  );
}
