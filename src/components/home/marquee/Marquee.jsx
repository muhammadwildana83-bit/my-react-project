import "./Marquee.css";

function Marquee() {
  // Karena pakai folder public, kita panggil jalur relatifnya saja
  const marqueeItems = [
    { img: "/img/chigga 1.jpg", label: "Page 1" },
    { img: "/img/chigga 2.jpg", label: "Page 2" },
    { img: "/img/chigga 3.jpg", label: "Page 3" },
    { img: "/img/chigga 4.jpg", label: "Page 4" },
    { img: "/img/chigga 5.jpg", label: "Page 5" },
    { img: "/img/chigga 6.jpg", label: "Page 6" },
    { img: "/img/chigga 7.jpg", label: "Page 7" },
    { img: "/img/chigga 8.jpg", label: "Page 8" },
    { img: "/img/chigga 9.jpg", label: "Page 9" },
    { img: "/img/chigga 10.jpg", label: "Page 10" },
  ];

  const marqueeLoop = [...marqueeItems, ...marqueeItems];

  return (
    <section className="marquee-section">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {marqueeLoop.map((item, index) => {
            const isDuplicate = index >= marqueeItems.length;

            return (
            <div
              className="marquee-item"
              key={`${item.label}-${index}`}
              tabIndex={isDuplicate ? -1 : 0}
              role="listitem"
              aria-label={item.label}
              aria-hidden={isDuplicate}
            >
              <img
                src={item.img}
                alt={item.label}
                loading="lazy"
                className="marquee-icon"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x400?text=Image";
                }}
              />

              <span className="marquee-index">{String((index % marqueeItems.length) + 1).padStart(2, "0")}</span>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Marquee;
