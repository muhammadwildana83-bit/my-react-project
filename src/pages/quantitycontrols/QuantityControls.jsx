import "./QuantityControls.css";

const QuantityControls = ({ quantity, onChange }) => {
  return (
    <div className="quantity-control">
      <button onClick={() => onChange(-1)}>-</button>
      <input readOnly value={quantity} />
      <button onClick={() => onChange(1)}>+</button>
    </div>
  );
};

export default QuantityControls;
