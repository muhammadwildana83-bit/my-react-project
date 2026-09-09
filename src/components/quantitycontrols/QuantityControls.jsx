import "./QuantityControls.css";

const QuantityControls = ({ quantity, onChange }) => {
  return (
    <div className="quantity-control clay">
      <button className="qty-btn" onClick={() => onChange(-1)}>-</button>

      <input
        className="qty-input"
        readOnly
        value={quantity}
      />

      <button className="qty-btn" onClick={() => onChange(1)}>+</button>
    </div>
  );
};

export default QuantityControls;
