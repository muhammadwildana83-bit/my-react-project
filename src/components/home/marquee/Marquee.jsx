import "./Marquee.css";

function Marquee() {
  const marqueeItems = [
    {
      img: "https://pe56d.s3.amazonaws.com/o_1ij6918d9nm97g3tep15ti1a9847.png",
      label: "Page 1",
    },
    {
      img: "https://pe56d.s3.amazonaws.com/o_1ij6918d9nm97g3tep15ti1a9847.png",
      label: "Page 2",
    },
    {
      img: "https://pe56d.s3.amazonaws.com/o_1ij6918d9nm97g3tep15ti1a9847.png",
      label: "Page 3",
    },
    {
      img: "https://pe56d.s3.amazonaws.com/o_1ij6918d9nm97g3tep15ti1a9847.png",
      label: "Page 4",
    },
    {
      img: "https://pe56d.s3.amazonaws.com/o_1ij6918d9nm97g3tep15ti1a9847.png",
      label: "Page 5",
    },
    {
      img: "https://pe56d.s3.amazonaws.com/o_1ij6918d9nm97g3tep15ti1a9847.png",
      label: "Page 6",
    },
    {
      img: "https://pe56d.s3.amazonaws.com/o_1ij6918d9nm97g3tep15ti1a9847.png",
      label: "Page 7",
    },
  ];

  // Duplicate array untuk marquee loop seamless
  const marqueeLoop = [...marqueeItems, ...marqueeItems];

  return (
    <section className="marquee-section">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {marqueeLoop.map((item, index) => (
            <div className="marquee-item" key={`${item.label}-${index}`}>
              <img
                src={item.img}
                alt={`Marquee image: ${item.label}`}
                className="marquee-icon"
              />
              <span className="marquee-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Marquee;
