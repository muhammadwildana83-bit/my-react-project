import { useEffect } from "react";
import "./About.css";

function About() {
// Efek reveal hanya dijalankan sekali setelah render
useEffect(() => {
const reveals = document.querySelectorAll(".reveal");
reveals.forEach((el, index) => {
setTimeout(() => {
el.classList.add("show");
}, index * 150);
});
}, []);

return ( <main className="about-page">
{/* Hero */} <section className="about-hero"> <div className="about-container reveal delay-1"> <h1>About Us</h1> <p>Font product and web design developer</p> </div> </section>

```
  {/* About Content */}
  <section className="about-content">
    <div className="about-container about-grid">
      <div className="about-image reveal delay-2">
        <img src="/img/file.jpg" alt="Tentang Kami" />
      </div>
      <div className="about-text">
        <h3 className="reveal delay-3">About Us</h3>
        <p className="reveal delay-4">
          Aksara Tiga is a local brand that focuses on providing modern and artistic font design.
          We are committed to delivering modern, high-quality products with their own copyright.
        </p>
        <h3 className="reveal delay-5">Mission</h3>
        <p className="reveal delay-6">
          Our fonts are designed to strike a balance between aesthetics and readability.
          Each character strengthens visual identity without compromising reading comfort.
          Suitable for branding, editorial, or modern digital design.
        </p>
      </div>
    </div>
  </section>

  {/* Vision & Values */}
  <section className="about-values">
    <div className="about-container">
      <h2 className="reveal delay-1">Vision & Values</h2>
      <div className="about-values-grid">
        <div className="about-value-item reveal delay-2">
          <h3>Design Needs</h3>
          <p>Page</p>
        </div>
        <div className="about-value-item reveal delay-3">
          <h3>Copyright Guarantee</h3>
          <p>Page</p>
        </div>
        <div className="about-value-item reveal delay-4">
          <h3>User Flow</h3>
          <p>Page</p>
        </div>
      </div>
    </div>
  </section>

  {/* Team */}
  <section className="about-team">
    <div className="about-container">
      <h2 className="reveal delay-1">Tim Kami</h2>
      <div className="about-team-grid">
        <div className="about-team-member reveal delay-2">
          <div className="team-card-inner">
            <img src="/img/instagram.jpg" alt="Foto Profil" className="profil-img" />
            <h4>Aksaratiga</h4>
            <p>Founder & Product Designer</p>
          </div>
        </div>
        <div className="about-team-member reveal delay-3">
          <div className="team-card-inner">
            <img src="/img/wa.jpg" alt="Foto Profil" className="profil-img" />
            <h4>Wildan Harsa Sangkara</h4>
            <p>Web Designer</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

);
}

export default About;
