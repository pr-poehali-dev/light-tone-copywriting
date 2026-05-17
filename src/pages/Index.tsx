import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/e2617d24-8c57-43c3-ac53-2ae92f91585a/bucket/648ceba6-3575-4138-a53e-288d1b83d0fb.png";

const floatingWords = ["слова", "смыслы", "эмоции", "идеи", "истории", "образы", "тексты", "голос"];

const services = [
  {
    icon: "FileText",
    title: "Лендинги",
    desc: "Страницы, которые превращают посетителей в покупателей. Чёткая структура, убедительные аргументы, сильный призыв к действию.",
    price: "от 8 000 ₽",
    tag: "Продающий текст",
  },
  {
    icon: "Rss",
    title: "Контент для блога",
    desc: "Экспертные статьи и SEO-материалы, которые привлекают трафик и формируют доверие к бренду.",
    price: "от 3 000 ₽",
    tag: "SEO / Блог",
  },
  {
    icon: "Mail",
    title: "Email-рассылки",
    desc: "Письма, которые открывают. Цепочки прогрева, акционные офферы, welcome-серии с высокой конверсией.",
    price: "от 4 500 ₽",
    tag: "Email-маркетинг",
  },
  {
    icon: "Megaphone",
    title: "Соцсети",
    desc: "Посты, сторис, описания профилей. Единый tone of voice, который делает бренд узнаваемым.",
    price: "от 2 000 ₽",
    tag: "SMM",
  },
];

const portfolio = [
  {
    category: "Email",
    title: "Цепочка прогрева для IT-курсов",
    result: "Open Rate 48%",
    color: "#4a3728",
    bg: "#f0ebe4",
  },
  {
    category: "Блог",
    title: "Экспертный журнал финтех-компании",
    result: "x5 органический трафик",
    color: "#8a9e8a",
    bg: "#edf2ed",
  },
  {
    category: "SMM",
    title: "Ребрендинг голоса бренда",
    result: "x3 вовлечённость",
    color: "#9b7e5c",
    bg: "#f5f0e8",
  },
];

const marqueeItems = [
  "Продающие тексты",
  "★",
  "Email-рассылки",
  "★",
  "Лендинги",
  "★",
  "Контент для блога",
  "★",
  "Соцсети",
  "★",
  "Нейминг и слоганы",
  "★",
];

export default function Index() {
  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "services", "portfolio", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveNav(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { id: "services", label: "Услуги" },
    { id: "portfolio", label: "Портфолио" },
    { id: "contact", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen font-golos" style={{ backgroundColor: "var(--cream)", color: "var(--walnut)" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "rgba(245, 240, 232, 0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(74,55,40,0.08)" }}>
        <button onClick={() => scrollTo("hero")}
          className="font-cormorant font-bold text-xl tracking-tight"
          style={{ color: "var(--walnut)" }}>
          О.Г.
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="text-sm font-medium transition-all duration-300 relative group"
              style={{ color: activeNav === l.id ? "var(--terracotta)" : "var(--walnut)" }}>
              {l.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: "var(--terracotta)" }} />
            </button>
          ))}
          <button onClick={() => scrollTo("contact")}
            className="px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
            style={{ background: "var(--terracotta)", color: "#fff" }}>
            Заказать текст
          </button>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: "var(--cream)" }}>
          {navLinks.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="font-cormorant text-4xl font-bold"
              style={{ color: "var(--walnut)" }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo("contact")}
            className="mt-4 px-8 py-3 rounded-full font-semibold"
            style={{ background: "var(--terracotta)", color: "#fff" }}>
            Заказать текст
          </button>
        </div>
      )}

      {/* HERO */}
      <section id="hero" ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden pt-20">

        {/* floating bg letters */}
        {floatingWords.map((w, i) => (
          <span key={w} className="absolute select-none pointer-events-none font-cormorant font-bold italic"
            style={{
              fontSize: `${2 + (i % 3) * 1.5}rem`,
              opacity: 0.05 + (i % 4) * 0.02,
              color: "var(--terracotta)",
              top: `${10 + (i * 11) % 75}%`,
              left: `${5 + (i * 17) % 85}%`,
              animation: `float ${6 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}>
            {w}
          </span>
        ))}

        {/* decorative diagonal */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-px h-full opacity-10 rotate-12 left-1/3"
            style={{ background: "var(--terracotta)" }} />
          <div className="absolute w-px h-full opacity-5 rotate-12 left-2/3"
            style={{ background: "var(--walnut)" }} />
        </div>

        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT SIDE */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-widest uppercase"
              style={{ background: "rgba(196,105,79,0.12)", color: "var(--terracotta)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--terracotta)" }} />
              Копирайтер · Контент-стратег
            </div>

            <h1 className="font-cormorant font-bold leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--walnut)" }}>
              Слова,<br />
              <em className="italic" style={{ color: "var(--terracotta)" }}>которые</em><br />
              продают
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-md" style={{ color: "rgba(74,55,40,0.7)" }}>
              Превращаю скучные идеи в захватывающие истории, которые увлекают клиентов.
              Тексты для лендингов, блогов, рассылок и соцсетей — ярко, запоминающе, с результатом.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button onClick={() => scrollTo("portfolio")}
                className="px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: "var(--walnut)", color: "var(--cream)" }}>
                Смотреть работы
              </button>
              <button onClick={() => scrollTo("contact")}
                className="px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300 border-2 hover:scale-105"
                style={{ border: "2px solid var(--walnut)", color: "var(--walnut)" }}>
                Написать мне
              </button>
            </div>

            <div className="flex items-center gap-8 mt-12">
              {[["5+", "лет опыта"], ["120+", "проектов"], ["98%", "довольных клиентов"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-cormorant font-bold text-3xl" style={{ color: "var(--terracotta)" }}>{num}</div>
                  <div className="text-xs font-medium opacity-60">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE SIDE */}
          <div className="relative hidden md:flex justify-center items-center">
            {/* decorative ring */}
            <div className="absolute w-80 h-80 rounded-full border-2 opacity-20 animate-float-slow"
              style={{ borderColor: "var(--terracotta)" }} />
            <div className="absolute w-96 h-96 rounded-full border opacity-10 animate-float"
              style={{ borderColor: "var(--sand)" }} />

            <div className="relative w-72 h-96 overflow-hidden"
              style={{ borderRadius: "60% 40% 55% 45% / 50% 55% 45% 50%", boxShadow: "0 30px 80px rgba(74,55,40,0.2)" }}>
              <img src={HERO_IMAGE} alt="Копирайтер" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(74,55,40,0.3), transparent)" }} />
            </div>

            {/* floating badge */}
            <div className="absolute bottom-8 -left-4 px-4 py-3 rounded-2xl shadow-xl"
              style={{ background: "#fff", minWidth: "160px" }}>
              <div className="text-xs font-medium opacity-50 mb-1">Последний проект</div>
              <div className="text-sm font-semibold" style={{ color: "var(--walnut)" }}>+340% конверсия</div>
              <div className="flex mt-1.5 gap-0.5">
                {[1,2,3,4,5].map(i => <span key={i} className="text-xs" style={{ color: "#f59e0b" }}>★</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase font-medium">Листать</span>
          <div className="w-px h-12 animate-pulse" style={{ background: "var(--terracotta)" }} />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-4 overflow-hidden" style={{ background: "var(--walnut)" }}>
        <div className="flex animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-6 text-sm font-medium tracking-wider uppercase"
              style={{ color: item === "★" ? "var(--terracotta)" : "rgba(245,240,232,0.7)" }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32" style={{ background: "var(--walnut)" }}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: "var(--terracotta)" }}>
                — Услуги
              </span>
              <h2 className="font-cormorant font-bold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--cream)", lineHeight: 1.1 }}>
                Чем могу<br />
                <em className="italic" style={{ color: "var(--sand)" }}>помочь</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.5)" }}>
              Работаю с малым и средним бизнесом, стартапами и personal brand
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map(({ icon, title, desc, price, tag }, i) => (
              <div key={title} className="group p-8 rounded-2xl relative overflow-hidden cursor-pointer transition-all duration-400 hover:scale-[1.02]"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(196,105,79,0.12), transparent)" }} />

                <div className="absolute top-6 right-6 text-xs font-medium px-3 py-1 rounded-full"
                  style={{ background: "rgba(245,240,232,0.07)", color: "rgba(245,240,232,0.4)" }}>
                  {tag}
                </div>

                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(196,105,79,0.15)" }}>
                  <Icon name={icon} size={22} style={{ color: "var(--terracotta)" }} />
                </div>

                <h3 className="font-cormorant font-bold text-2xl mb-3" style={{ color: "var(--cream)" }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(245,240,232,0.55)" }}>
                  {desc}
                </p>
                <div className="font-bold" style={{ color: "var(--terracotta)" }}>{price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16">
            <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: "var(--terracotta)" }}>
              — Портфолио
            </span>
            <h2 className="font-cormorant font-bold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--walnut)", lineHeight: 1.1 }}>
              Избранные<br />
              <em className="italic" style={{ color: "var(--terracotta)" }}>работы</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {portfolio.map(({ category, title, result, color, bg }, i) => (
              <div key={title} className="group relative overflow-hidden rounded-2xl p-8 cursor-pointer transition-all duration-400 hover:scale-[1.01] hover:shadow-xl"
                style={{ background: bg, border: "1px solid rgba(74,55,40,0.08)", minHeight: "200px" }}>

                {/* large number bg */}
                <div className="absolute -right-4 -bottom-8 font-cormorant font-bold text-9xl opacity-5 select-none"
                  style={{ color }}>
                  0{i + 1}
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between" style={{ minHeight: "160px" }}>
                  <div>
                    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                      style={{ background: `${color}18`, color }}>
                      {category}
                    </span>
                    <h3 className="font-cormorant font-bold text-2xl md:text-3xl leading-tight mb-4"
                      style={{ color: "var(--walnut)" }}>
                      {title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className="font-bold text-sm" style={{ color }}>{result}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                      style={{ background: color }}>
                      <Icon name="ArrowRight" size={14} color="#fff" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden" style={{ background: "var(--cream)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: "var(--terracotta)" }} />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: "var(--terracotta)" }}>
              — Контакты
            </span>
            <h2 className="font-cormorant font-bold mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--walnut)", lineHeight: 1.1 }}>
              Давайте создадим<br />
              <em className="italic" style={{ color: "var(--terracotta)" }}>что-то важное</em>
            </h2>
            <p className="text-base" style={{ color: "rgba(74,55,40,0.6)" }}>
              Расскажите о своём проекте. Отвечаю в течение 24 часов.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "rgba(196,105,79,0.15)" }}>
                  <Icon name="Check" size={28} style={{ color: "var(--terracotta)" }} />
                </div>
                <h3 className="font-cormorant font-bold text-3xl mb-2" style={{ color: "var(--walnut)" }}>
                  Сообщение отправлено!
                </h3>
                <p className="opacity-60">Напишу вам в ближайшее время</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="flex flex-col gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold mb-2 block uppercase tracking-wider opacity-60">
                      Имя
                    </label>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 focus:ring-2 text-sm"
                      style={{ background: "#fff", border: "1px solid rgba(74,55,40,0.15)", color: "var(--walnut)", focusRingColor: "var(--terracotta)" }}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-2 block uppercase tracking-wider opacity-60">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 text-sm"
                      style={{ background: "#fff", border: "1px solid rgba(74,55,40,0.15)", color: "var(--walnut)" }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold mb-2 block uppercase tracking-wider opacity-60">
                    Расскажите о проекте
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Что нужно написать? Какая задача? Ваш бюджет?"
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 resize-none text-sm"
                    style={{ background: "#fff", border: "1px solid rgba(74,55,40,0.15)", color: "var(--walnut)" }}
                    required
                  />
                </div>

                <button type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg mt-2"
                  style={{ background: "var(--terracotta)", color: "#fff" }}>
                  Отправить заявку
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-8 mt-12">
              {[
                { icon: "Send", label: "Telegram", href: "#" },
                { icon: "Instagram", label: "Instagram", href: "#" },
                { icon: "Linkedin", label: "LinkedIn", href: "#" },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href}
                  className="flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:scale-110"
                  style={{ color: "rgba(74,55,40,0.6)" }}>
                  <Icon name={icon} size={16} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center" style={{ background: "var(--walnut)", color: "rgba(245,240,232,0.4)" }}>
        <p className="text-sm font-medium">
          © 2024 Олег Горохов ·{" "}
          <span className="font-cormorant italic" style={{ color: "rgba(245,240,232,0.6)" }}>
            Слова, которые продают
          </span>
        </p>
      </footer>
    </div>
  );
}