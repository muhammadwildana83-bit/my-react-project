import "./LicenseOptions.css";

const LicenseOptions = ({ options, selectedLicense, setSelectedLicense }) => {
  return (
    <div className="license-options-container">
      <p className="license-type-heading">
        <span className="required-star">*</span>
        License Type
      </p>

      {options.map((item, index) => (
        <label key={index} className="license-option-item">
          <input
            type="radio"
            value={item}
            checked={selectedLicense === item}
            onChange={(e) => setSelectedLicense(e.target.value)}
          />
          {item}
        </label>
      ))}
    </div>
  );
};

export default LicenseOptions;
