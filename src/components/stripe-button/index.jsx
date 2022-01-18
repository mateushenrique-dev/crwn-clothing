import "./stripe-button.scss";
import StripeCheckout from "react-stripe-checkout";

const StripeButton = ({ price }) => {
  const priceToStripe = price * 100;
  const publishableKey =
    "pk_test_51KJJnDIKbcjx67Y92Zn4ZWyrGeWSvxsikyNuVjqYwel9Ez5RxuceYetfyY9s3L2o3Y6wJIPtIOmR9N1Ne35XkCFm00VbGYveRb";

    const onToken = (token) => {
    console.log(token);
    alert("Payment sucessful");
  };

  return (
    <StripeCheckout
      label="Pay now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price}`}
      amount={priceToStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;
