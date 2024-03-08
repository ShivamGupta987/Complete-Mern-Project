import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { FaPaypal } from "react-icons/fa6";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [cardError,setCardError] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    // create a card element
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("success!");
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      {/* left side */}
      <div className="md:w-1/2 w-full  space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>

        <p>Total Price : ${price}</p>
        <p>Number Of Items : {cart.length}</p>
      </div>

      {/*  right side */}

      <div className="md:w-1/3   space-y-5 card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 px-4 py-8">
        <h4 className="text-lg font-semibold">Process Your Payment!!</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>

        {/* Stripe Form */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe}
            className="btn sm mt-5 btn-primary w-full text-white"
          >
            Pay
          </button>
        </form>

          {
            cardError ? <p className="text-red italic text-sm">{cardError}</p> : ""
          }
        {/* Paypal options */}
        <div className="mt-5 text-center">
          <hr />
          <button
            type="submit"
            disabled={!stripe}
            className="btn btn-sm mt-5 bg-orange-500 text-white"
          >
            <FaPaypal /> Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
