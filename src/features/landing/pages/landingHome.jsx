import { useState } from 'react'
import '../pages/landingHome.css'

const servicios = [
  {
    icon: '🖥️',
    titulo: 'Venta de computadoras',
    texto: 'Equipos prearmados y de marca listos para trabajo, estudio o gaming, con garantía.',
  },
  {
    icon: '🔧',
    titulo: 'Reparación técnica',
    texto: 'Diagnóstico y reparación de laptops y PCs de escritorio con seguimiento de tu orden.',
  },
  {
    icon: '🧩',
    titulo: 'Componentes y repuestos',
    texto: 'Procesadores, memorias RAM, tarjetas gráficas, motherboards, fuentes y más.',
  },
  {
    icon: '⚙️',
    titulo: 'Armado a medida',
    texto: 'Te asesoramos para armar la PC ideal según tu presupuesto y necesidades.',
  },
]

const categorias = [
  { nombre: 'Procesadores', icono: '🧠' },
  { nombre: 'Memoria RAM', icono: '💾' },
  { nombre: 'Tarjetas gráficas', icono: '🎮' },
  { nombre: 'Motherboards', icono: '🔌' },
  { nombre: 'Fuentes de poder', icono: '⚡' },
  { nombre: 'PCs prearmadas', icono: '🖥️' },
]

const pasos = [
  { n: '01', titulo: 'Recepción', texto: 'Recibimos tu equipo y registramos el problema en una orden de reparación.' },
  { n: '02', titulo: 'Diagnóstico', texto: 'Nuestros técnicos revisan el equipo y te informan el costo estimado.' },
  { n: '03', titulo: 'Reparación', texto: 'Reparamos o reemplazamos los componentes necesarios.' },
  { n: '04', titulo: 'Entrega', texto: 'Probamos el equipo, lo entregamos y emitimos tu factura.' },
]

const ventajas = [
  'Técnicos especializados',
  'Repuestos de calidad',
  'Factura y garantía',
  'Seguimiento de tu orden',
]

export const LandingHome = () => {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <div className="landing">
      {/* NAVBAR */}
      <header className="nav">
        <div className="container nav__inner">
          <a href="#inicio" className="logo">
            Power<span>tronic</span>
          </a>

          <button
            type="button"
            className="nav__toggle"
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto((v) => !v)}
          >
            ☰
          </button>

          <nav className={`nav__links ${menuAbierto ? 'is-open' : ''}`}>
            <a href="#servicios" onClick={cerrarMenu}>Servicios</a>
            <a href="#productos" onClick={cerrarMenu}>Productos</a>
            <a href="#reparacion" onClick={cerrarMenu}>Reparación</a>
            <a href="#contacto" onClick={cerrarMenu}>Contacto</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="inicio" className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <span className="badge">Venta · Reparación · Componentes</span>
            <h1>
              Todo para tu computadora, <em>en un solo lugar</em>
            </h1>
            <p>
              En Powertronic vendemos equipos y componentes, y reparamos tu
              computadora con técnicos de confianza y seguimiento en cada paso.
            </p>
            <div className="hero__cta">
              <a href="#productos" className="btn btn--primary">Ver productos</a>
              <a href="#contacto" className="btn btn--ghost">Solicitar reparación</a>
            </div>
          </div>

          <div className="hero__card" aria-hidden="true">
            <div className="chip">
              <span>CPU</span><span>RAM</span><span>GPU</span><span>PSU</span>
            </div>
            <div className="hero__glow" />
            <div className="hero__pc">🖥️</div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="section">
        <div className="container">
          <h2 className="section__title">Nuestros servicios</h2>
          <p className="section__sub">Soluciones completas para particulares y empresas.</p>

          <div className="grid grid--4">
            {servicios.map((s) => (
              <article key={s.titulo} className="card">
                <div className="card__icon">{s.icon}</div>
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="section section--alt">
        <div className="container">
          <h2 className="section__title">Explora por categoría</h2>
          <p className="section__sub">Las mejores marcas en componentes y equipos.</p>

          <div className="grid grid--6">
            {categorias.map((c) => (
              <a key={c.nombre} href="#contacto" className="cat">
                <span className="cat__icon">{c.icono}</span>
                <span>{c.nombre}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* REPARACIÓN */}
      <section id="reparacion" className="section">
        <div className="container">
          <h2 className="section__title">¿Cómo funciona la reparación?</h2>
          <p className="section__sub">Un proceso claro y transparente.</p>

          <div className="grid grid--4">
            {pasos.map((p) => (
              <article key={p.n} className="step">
                <span className="step__n">{p.n}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VENTAJAS */}
      <section className="section section--alt">
        <div className="container perks">
          <div>
            <h2 className="section__title" style={{ textAlign: 'left' }}>
              ¿Por qué elegir Powertronic?
            </h2>
            <p className="section__sub" style={{ textAlign: 'left', margin: 0 }}>
              Combinamos venta y servicio técnico para que no tengas que ir a
              ningún otro lado.
            </p>
          </div>
          <ul className="perks__list">
            {ventajas.map((v) => (
              <li key={v}>
                <span>✔</span> {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACTO / CTA */}
      <section id="contacto" className="section">
        <div className="container cta">
          <h2>¿Tu computadora necesita ayuda?</h2>
          <p>Escríbenos o visítanos y te atendemos de inmediato.</p>
          <div className="cta__info">
            <span>📍 Tu dirección aquí</span>
            <span>📞 +505 0000 0000</span>
            <span>✉️ contacto@powertronic.com</span>
          </div>
          <a href="mailto:contacto@powertronic.com" className="btn btn--primary">
            Contáctanos
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <span className="logo">
            Power<span>tronic</span>
          </span>
          <small>© {new Date().getFullYear()} Powertronic. Todos los derechos reservados.</small>
        </div>
      </footer>
    </div>
  )
}