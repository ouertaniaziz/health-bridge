import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

import React, { useState } from 'react'
import axiosInstance from "../../../config/axios"
import { StripeCardElementOptions } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Item from "antd/es/list/Item";
import { Input } from "antd";


const CARD_OPTIONS:StripeCardElementOptions = {
   
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm(): JSX.Element {
    const [success, setSuccess ] = useState(false)
    const [form, setform ] = useState('')
    const stripe = useStripe()
    const elements = useElements()
const handleChange=(e)=>{
setform(e.target.value)
}

    const handleSubmit = async (e) => {
      
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axiosInstance.post("/donation/payment", {
                amount: form,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
           
          <Input
            name='medicationname'
            placeholder='Medication Name'
            
            onChange={handleChange}
          />
        
            <button>Pay</button>
        </form>
        :
       <div>
           <h2>You just donated</h2>
       </div> 
        }
            
        </>
    )
}
