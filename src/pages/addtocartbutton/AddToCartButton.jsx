import "./AddToCartButton.css";

const AddToCartButton = ({ onClick }) => {
  return (
    <button className="add-to-cart-btn" onClick={onClick}>
      ADD TO CART
    </button>
  );
};

export default AddToCartButton;
