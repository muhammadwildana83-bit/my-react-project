import "./AddToCartButton.css";

const AddToCartButton = ({ onClick }) => {
  return (
    <button className="add-to-cart-btn" onClick={onClick}>
      ADD PRODUCT
    </button>
  );
};

export default AddToCartButton;
 