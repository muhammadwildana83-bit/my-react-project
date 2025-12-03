import { useEffect } from "react";

const useReveal = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const handleScroll = () => {
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
          reveals[i].classList.add("show");
        } else {
          reveals[i].classList.remove("show");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // biar langsung aktif pas page dibuka

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};

export default useReveal;
