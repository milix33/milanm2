import Image from "next/image";
import logoFile from "../logo/logopng.png";

export default function HeroSection() {
  return (
    <section className="slider-section hero-section">
      <div className="hero-background-fireworks">
        <div className="hero-firework-layer" />
        <div className="hero-firework-layer hero-firework-layer--slow" />
      </div>

      <div className="hero-inner">
        <div className="hero-logo-mark">
          <span className="hero-logo-symbol">
            m
            <sup>2</sup>
          </span>
          <span className="hero-logo-text">M² Architecture</span>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <Image
            src={logoFile}
            alt="M² Architecture logo"
            style={{ maxWidth: "220px", height: "auto", opacity: 0.95 }}
            priority
          />
        </div>

        <p className="hero-tagline">Projektovanje · Nadzor · Konsulting</p>

        <h1 className="hero-headline">We design spaces that inspire.</h1>

        <div className="hero-cta-row">
          <button className="hero-cta-primary" type="button">
            Pogledajte projekte
          </button>
          <button className="hero-cta-secondary" type="button">
            Zatraži ponudu
          </button>
        </div>
      </div>
    </section>
  );
}

