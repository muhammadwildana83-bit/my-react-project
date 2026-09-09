import "./LicenseOptions.css";

const LicenseOptions = ({ options, selectedLicense, setSelectedLicense }) => {
  const handleSelect = (value) => setSelectedLicense(value);

  return (
    <div className="license-container">
      <div className="license-header">
        <div className="license-label">
          <span className="required-badge">*</span>
          License Type
        </div>
      </div>

      <div className="license-list" role="list" aria-label="License options list">
        {options.map((optRaw) => {
          const isObj = optRaw && typeof optRaw === "object";
          const title = isObj ? optRaw.title || optRaw.name : optRaw;
          const desc = isObj ? optRaw.description || optRaw.desc : "";
          const price = isObj ? optRaw.price : null;
          const value = isObj ? optRaw.value ?? title : optRaw;
          const recommended = isObj ? !!optRaw.recommended : false;
          const selected = selectedLicense === value;

          return (
            <div
              key={value}
              className={`license-card ${selected ? "is-selected" : ""}`}
              role="radio"
              aria-checked={selected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(value);
                }
              }}
              onClick={() => handleSelect(value)}
            >
              <div className="license-left">
                <span className={`radio-circle ${selected ? "checked" : ""}`} aria-hidden="true" />
              </div>

              <div className="license-middle">
                <div className="license-title-row">
                  <h4 className="license-title">{title}</h4>
                  {recommended && <span className="license-badge">Best value</span>}
                </div>
                {desc ? <p className="license-desc">{desc}</p> : null}
              </div>

              <div className="license-right">
                {price ? <div className="license-price">{price}</div> : <div className="license-price muted">—</div>}
                <button
                  type="button"
                  className={`license-choose ${selected ? "chosen" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(value);
                  }}
                >
                  {selected ? "Selected" : "Choose"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LicenseOptions;