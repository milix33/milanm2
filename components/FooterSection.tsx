export default function FooterSection() {
  return (
    <section className="slider-section footer-section">
      <div className="footer-inner">
        <div className="footer-grid">
          <p className="footer-description">
            Studio za arhitektonsko projektovanje, nadzor i konsulting. Stvaramo prostore koji
            inspirišu.
          </p>

          <div className="footer-columns">
            <div>
              <h3 className="footer-heading">Brzi linkovi</h3>
              <ul className="footer-links">
                <li>O nama</li>
                <li>Portfolio</li>
                <li>Usluge</li>
                <li>Kontakt</li>
              </ul>
            </div>

            <div>
              <h3 className="footer-heading">Usluge</h3>
              <ul className="footer-services">
                <li>Projektovanje</li>
                <li>Nadzor</li>
                <li>Konsulting</li>
                <li>Enterijer</li>
                <li>3D Vizualizacije</li>
              </ul>
            </div>
          </div>

          <div className="footer-contact">
            <h3 className="footer-heading">Kontakt</h3>
            <p>
              <a href="mailto:milan.milincic1990@gmail.com">milan.milincic1990@gmail.com</a>
            </p>
            <p>
              <a href="tel:+38765959599">+387 65 959 599</a>
            </p>
          </div>

          <p className="footer-copyright">
            © 2026 M² Architecture. Sva prava zadržana.
          </p>
        </div>
      </div>
    </section>
  );
}

