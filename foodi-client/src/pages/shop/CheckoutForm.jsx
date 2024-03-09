
import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { FaPaypal } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("Price is not a number or less than 1");
      return;
    }
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    }).catch(err => console.log(err));
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const userEmail = user?.email || ''; 
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || "Anonymous",
          email: userEmail,
        },
      },
    });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log("Payment succeeded:", paymentIntent.id);
      setCardError(`Your transaction ID is ${paymentIntent.id}`);
      
      // Construct payment info data
      const paymentInfo = {
        email: userEmail,
        transactionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "Order pending",
        itemName: cart.map(item => item.name),
        cartItems: cart.map(item => item._id),
        menuItems: cart.map(item => item.menuItemId)
      };

      // Send payment info to the backend
      axiosSecure.post('/payments', paymentInfo)
        .then(res => {
          alert('Payment successfully done!');
          navigate('/order');
        }).catch(err => {
          console.error("Payment submission error:", err);
        });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      {/* left side */}
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price : ${price}</p>
        <p>Number Of Items : {cart.length}</p>
      </div>

      {/* right side */}
      <div className="md:w-1/3 space-y-5 card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 px-4 py-8">
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

        {cardError && (
          <p className="text-red italic text-sm">{cardError}</p>
        )}

        {/* PayPal option */}
        <div className="mt-5 text-center">
          <hr />
          <button
            type="button" 
            className="btn btn-sm mt-5 bg-orange-500 text-white"
          >
            <FaPaypal /> Pay with PayPal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
