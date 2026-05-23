import { useEffect, useState } from "react";
import { FaInstagram, FaTiktok, FaWhatsapp, FaShirt } from "react-icons/fa6";

const productsData = [
  {
    id: 1,
    title: "Premium Cotton Red",
    description: "Our signature creamy fabric blended with striking red accents.",
    price: 24.99,
    image: "/images/tee-red.png",
    color: "Punchy Red",
    badge: "Bestseller",
  },
  {
    id: 2,
    title: "Classic Cream Tee",
    description: "Minimalist, stylish, and perfect for any casual occasion.",
    price: 29.99,
    image: "/images/tee-cream.png",
    color: "Creamy White",
    badge: "New",
  },
  {
    id: 3,
    title: "Bold Graphic Fit",
    description: "Make a statement with our premium heavy-weight cotton build.",
    price: 27.99,
    image: "/images/tee-graphic.png",
    color: "Cream / Red",
    badge: "Limited",
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const addToCart = (productName: string) => {
    setCartCount((c) => c + 1);
    setToast(`${productName} added to cart`);
    setTimeout(() => setToast(null), 2500);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-stone-800 antialiased selection:bg-[#DC2626] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        h1, h2, h3, .display { font-family: 'Fraunces', Georgia, serif; }
        
        .cream-noise {
          background-image: radial-gradient(circle at 1px 1px, rgba(220,38,38,0.03) 1px, transparent 0);
          background-size: 24px 24px;
        }
        
        .tshirt-3d {
          transform-style: preserve-3d;
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotateY(-5deg) rotateX(5deg); }
          50% { transform: translateY(-20px) rotateY(5deg) rotateX(-5deg); }
        }
        
        .tshirt-spin {
          transform-style: preserve-3d;
          animation: spin3d 20s linear infinite;
        }
        @keyframes spin3d {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        
        .cube-3d {
          transform-style: preserve-3d;
          animation: cubeRotate 12s ease-in-out infinite;
        }
        @keyframes cubeRotate {
          0%, 100% { transform: rotateX(-10deg) rotateY(20deg); }
          50% { transform: rotateX(10deg) rotateY(-20deg); }
        }
      `}</style>

      {/* Toast */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${toast ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-3 rounded-2xl bg-stone-900 px-5 py-3 text-white shadow-2xl shadow-red-900/20">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DC2626]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <span className="text-sm font-medium">{toast}</span>
        </div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
        <div className={`mx-auto max-w-[1200px] px-6 transition-all duration-500 ${scrolled ? '' : ''}`}>
          <div className={`flex items-center justify-between rounded-full border transition-all duration-500 ${scrolled ? 'bg-[#FFFBF5]/85 backdrop-blur-2xl border-red-900/10 px-6 py-3 shadow-lg shadow-red-900/5' : 'bg-transparent border-transparent px-2 py-2'}`}>
            <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-[#DC2626]/10 blur-xl" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#DC2626] text-white shadow-lg shadow-red-600/20">
                  <FaShirt className="text-[18px]" />
                </div>
              </div>
              <span className="display text-[22px] font-semibold tracking-tight">
                Trust <span className="text-[#DC2626]">Us</span>
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-1 rounded-full bg-stone-900/5 p-1 backdrop-blur">
              {['home', 'products', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="rounded-full px-4 py-1.5 text-[14px] font-medium capitalize text-stone-600 transition hover:bg-[#FFFBF5] hover:text-stone-900 hover:shadow-sm"
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5">
                {[
                  { Icon: FaInstagram, href: "https://instagram.com" },
                  { Icon: FaTiktok, href: "https://tiktok.com" },
                  { Icon: FaWhatsapp, href: "https://wa.me" },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#FFFBF5] text-stone-600 shadow-sm ring-1 ring-stone-900/5 transition hover:text-white"
                  >
                    <div className="absolute inset-0 -translate-y-full bg-[#DC2626] transition-transform duration-300 group-hover:translate-y-0" />
                    <Icon className="relative z-10 text-[16px]" />
                  </a>
                ))}
              </div>

              <button className="relative flex h-9 items-center gap-2 rounded-full bg-stone-900 px-4 text-white shadow-md shadow-stone-900/10 transition hover:bg-stone-800 hover:shadow-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                <span className="text-[13px] font-medium">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#DC2626] px-1 text-[11px] font-bold leading-none text-white ring-2 ring-[#FFFBF5]">
                    {cartCount}
                  </span>
                )}
              </button>

              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFBF5] shadow-sm ring-1 ring-stone-900/5">
                <div className="space-y-1">
                  <div className={`h-0.5 w-4 bg-stone-700 transition ${mobileOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
                  <div className={`h-0.5 w-4 bg-stone-700 transition ${mobileOpen ? 'opacity-0' : ''}`} />
                  <div className={`h-0.5 w-4 bg-stone-700 transition ${mobileOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-64 mt-3' : 'max-h-0'}`}>
            <div className="rounded-3xl border border-red-900/10 bg-[#FFFBF5]/95 p-4 backdrop-blur-2xl shadow-xl">
              <div className="grid grid-cols-2 gap-2">
                {['home', 'products', 'about', 'contact'].map((item) => (
                  <button key={item} onClick={() => scrollTo(item)} className="rounded-2xl bg-[#FFFBF5] py-3 text-sm font-medium capitalize shadow-sm ring-1 ring-stone-900/5 hover:bg-[#DC2626] hover:text-white transition">
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden cream-noise">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#DC2626]/[0.07] blur-[120px]" />
          <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-amber-200/30 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-6 pt-36 pb-20 lg:pt-44 lg:pb-28">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#DC2626]/20 bg-[#DC2626]/5 px-3 py-1.5 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#DC2626] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#DC2626]" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#DC2626]">Premium Quality</span>
              </div>

              <h1 className="display mt-6 text-[clamp(40px,6vw,72px)] font-semibold leading-[0.9] tracking-[-0.02em] text-stone-900">
                Trust Us For
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">Premium Quality</span>
                  <span className="absolute bottom-[8%] left-0 -z-0 h-[0.3em] w-full bg-[#DC2626]/15 -rotate-1" />
                </span>
                <br />
                T-Shirts
              </h1>

              <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-stone-600">
                Discover our exclusive collection of comfortable, stylish, and durable t-shirts. Creamy soft fabrics meet punchy red details — crafted to last, designed to trust.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <button onClick={() => scrollTo('products')} className="group relative overflow-hidden rounded-full bg-[#DC2626] px-8 py-3.5 font-medium text-white shadow-lg shadow-red-600/25 transition hover:shadow-xl hover:shadow-red-600/30 hover:-translate-y-0.5">
                  <span className="relative z-10 flex items-center gap-2">
                    Shop Now
                    <svg className="transition group-hover:translate-x-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-red-700 to-[#DC2626] transition group-hover:translate-x-0" />
                </button>
                <button onClick={() => scrollTo('about')} className="rounded-full border border-stone-300 bg-[#FFFBF5]/70 px-8 py-3.5 font-medium text-stone-700 backdrop-blur transition hover:border-[#DC2626]/30 hover:bg-[#FFFBF5]">
                  Our Story
                </button>
              </div>

              <div className="mt-14 flex items-center gap-10">
                {[
                  { k: "10k+", l: "Happy Customers" },
                  { k: "100%", l: "Premium Cotton" },
                  { k: "4.9", l: "Rated" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="display text-[28px] font-semibold text-stone-900">{s.k}</div>
                    <div className="text-[12px] uppercase tracking-wide text-stone-500">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[480px]">
                {/* Creamy backdrop */}
                <div className="absolute inset-0">
                  <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-[40px] bg-gradient-to-b from-[#FFF1DC] to-[#FFE4C4] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-20px_40px_rgba(220,38,38,0.08)]" />
                  <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DC2626]/10 blur-3xl" />
                </div>

                {/* 3D T-shirt */}
                <div className="absolute inset-0 grid place-items-center" style={{ perspective: "1200px" }}>
                  <div className="tshirt-3d relative">
                    <div className="relative">
                      <img src="/images/hero-tee.png" alt="Premium red t-shirt" className="w-[340px] drop-shadow-[0_40px_60px_rgba(220,38,38,0.25)] lg:w-[400px]" />
                      {/* floating tags */}
                      <div className="absolute -left-6 top-20 hidden rounded-2xl bg-[#FFFBF5]/90 px-3 py-2 shadow-xl backdrop-blur md:block">
                        <div className="text-[10px] uppercase tracking-wide text-stone-500">Fabric</div>
                        <div className="text-sm font-semibold text-stone-900">Creamy Cotton</div>
                      </div>
                      <div className="absolute -right-4 bottom-24 hidden rounded-2xl bg-[#DC2626] px-3 py-2 text-white shadow-xl md:block">
                        <div className="text-[10px] uppercase tracking-wide text-red-100">Color</div>
                        <div className="text-sm font-semibold">Punchy Red</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* spinning ring */}
                <div className="pointer-events-none absolute inset-0 grid place-items-center" style={{ perspective: "1000px" }}>
                  <div className="tshirt-spin h-[520px] w-[520px] rounded-full border border-dashed border-[#DC2626]/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="relative border-y border-stone-900/[0.06] bg-[#FFFBF5]/60 py-24 backdrop-blur-sm sm:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#DC2626]/5 px-3 py-1 ring-1 ring-[#DC2626]/10">
              <FaShirt className="text-[#DC2626]" size={12} />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#DC2626]">Collection</span>
            </div>
            <h2 className="display mt-4 text-[clamp(32px,4vw,48px)] font-semibold leading-tight tracking-tight text-stone-900">Our Cream & Red Edit</h2>
            <p className="mt-3 text-stone-600">Three essentials. Creamy softness with a punchy red soul.</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {productsData.map((p) => (
              <div key={p.id} className="group relative">
                <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-b from-[#DC2626]/20 to-transparent opacity-0 blur-2xl transition group-hover:opacity-100" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-stone-900/5 bg-[#FFFBF5] shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/5">
                  <div className="relative bg-gradient-to-b from-[#FFF4E6] to-[#FFFBF5] p-8">
                    <div className="absolute right-4 top-4 rounded-full bg-[#FFFBF5]/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#DC2626] shadow-sm ring-1 ring-[#DC2626]/10 backdrop-blur">
                      {p.badge}
                    </div>
                    <div className="relative mx-auto aspect-square w-full max-w-[240px]">
                      <div className="absolute inset-0 rounded-full bg-[#DC2626]/5 blur-2xl" />
                      <img src={p.image} alt={p.title} className="relative z-10 h-full w-full object-contain drop-shadow-xl transition duration-500 group-hover:scale-105 group-hover:-rotate-2" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="display text-[22px] font-semibold leading-snug text-stone-900">{p.title}</h3>
                      <span className="shrink-0 rounded-full bg-stone-900 px-2.5 py-1 text-[11px] font-medium text-white">${p.price}</span>
                    </div>
                    <p className="mt-2 text-[14px] leading-relaxed text-stone-600">{p.description}</p>
                    <div className="mt-3 flex items-center gap-2 text-[12px] text-stone-500">
                      <span className="inline-flex h-2 w-2 rounded-full bg-[#DC2626]" />
                      {p.color} • Premium Cotton
                    </div>
                    <div className="mt-6 flex gap-2">
                      <button onClick={() => addToCart(p.title)} className="flex-1 rounded-full bg-[#DC2626] py-2.5 text-[14px] font-medium text-white shadow-md shadow-red-600/20 transition hover:bg-red-700 hover:shadow-lg active:scale-[0.98]">
                        Add to Cart
                      </button>
                      <button className="grid h-10 w-10 place-items-center rounded-full border border-stone-200 bg-[#FFFBF5] text-stone-600 transition hover:border-[#DC2626]/30 hover:text-[#DC2626]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="relative mx-auto aspect-square w-full max-w-[460px]">
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#FFF1DC] to-[#FFE8D1] shadow-[inset_0_1px_0_white]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="cube-3d relative h-[220px] w-[220px]" style={{ transformStyle: 'preserve-3d' }}>
                    {/* 3D cube faces */}
                    {[
                      { t: 'translateZ(110px)', c: 'bg-[#FFFBF5]', label: 'Quality' },
                      { t: 'rotateY(180deg) translateZ(110px)', c: 'bg-[#DC2626] text-white', label: 'Comfort' },
                      { t: 'rotateY(90deg) translateZ(110px)', c: 'bg-[#FFF8ED]', label: 'Trust' },
                      { t: 'rotateY(-90deg) translateZ(110px)', c: 'bg-stone-900 text-white', label: 'Us' },
                    ].map((face, i) => (
                      <div key={i} className={`absolute inset-0 grid place-items-center rounded-3xl border border-stone-900/10 shadow-2xl ${face.c}`} style={{ transform: face.t }}>
                        <span className="display text-[28px] font-semibold">{face.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* glow */}
                <div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DC2626]/15 blur-[80px]" />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="display text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-stone-900">
                About <span className="text-[#DC2626]">Trust Us</span>
              </h2>
              <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-stone-600">
                <p>We believe in quality, comfort, and style. Our t-shirts are made with premium creamy cotton and finished with that punchy red attention to detail.</p>
                <p>Every piece tells a story of trust and craftsmanship. Founded with passion for fashion and quality, Trust Us has become a go-to destination for stylish t-shirts that make a statement — without shouting.</p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { v: "300 GSM", l: "Heavyweight" },
                  { v: "OEKO-TEX", l: "Certified" },
                  { v: "Pre-shrunk", l: "Perfect Fit" },
                ].map((item) => (
                  <div key={item.l} className="rounded-2xl border border-stone-900/5 bg-[#FFFBF5] p-4 text-center shadow-sm">
                    <div className="text-[18px] font-semibold text-stone-900">{item.v}</div>
                    <div className="text-[11px] uppercase tracking-wide text-stone-500">{item.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative border-t border-stone-900/5 bg-[#FFFBF5]/70 py-24 backdrop-blur">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <h2 className="display text-[clamp(32px,4vw,44px)] font-semibold text-stone-900">Get In Touch</h2>
          <p className="mx-auto mt-3 max-w-[55ch] text-stone-600">Have questions? Reach out to us directly on our social platforms — we reply fast, and we’re always in creamy white and red.</p>
          
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { Icon: FaInstagram, label: "Instagram", href: "https://instagram.com", color: "hover:bg-[#DC2626]" },
              { Icon: FaTiktok, label: "TikTok", href: "https://tiktok.com", color: "hover:bg-stone-900" },
              { Icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me", color: "hover:bg-green-600" },
            ].map(({ Icon, label, href, color }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className={`group flex items-center justify-center gap-3 rounded-2xl border border-stone-900/10 bg-[#FFFBF5] px-6 py-4 text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:text-white hover:shadow-lg ${color}`}>
                <Icon className="text-[20px] transition group-hover:scale-110" />
                <span className="font-medium">{label}</span>
              </a>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-2xl rounded-[32px] border border-[#DC2626]/15 bg-gradient-to-b from-[#FFF4E6] to-[#FFFBF5] p-[1px] shadow-xl shadow-red-900/5">
            <div className="rounded-[31px] bg-[#FFFBF5]/80 px-8 py-10 backdrop-blur">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <div className="text-left">
                  <div className="display text-[22px] font-semibold text-stone-900">Join the Trust List</div>
                  <div className="text-sm text-stone-600">Cream drops, red alerts. No spam.</div>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); addToCart('Newsletter'); }} className="flex w-full max-w-[340px] items-center gap-2">
                  <input required type="email" placeholder="you@email.com" className="h-11 w-full rounded-full border border-stone-300 bg-[#FFFBF5] px-4 text-sm outline-none ring-[#DC2626]/20 transition focus:border-[#DC2626] focus:ring-4" />
                  <button className="h-11 shrink-0 rounded-full bg-stone-900 px-5 text-sm font-medium text-white transition hover:bg-stone-800">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-900/5 bg-[#FFFBF5]">
        <div className="mx-auto max-w-[1200px] px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DC2626] text-white shadow-md">
                <FaShirt size={16} />
              </div>
              <span className="display text-[20px] font-semibold">Trust <span className="text-[#DC2626]">Us</span></span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-[14px] text-stone-600">
              {['Home', 'Products', 'About', 'Contact'].map((l) => (
                <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="transition hover:text-[#DC2626]">{l}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {[FaInstagram, FaTiktok, FaWhatsapp].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-[#FFFBF5] text-stone-500 shadow-sm ring-1 ring-stone-900/5 transition hover:bg-[#DC2626] hover:text-white">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 border-t border-stone-900/5 pt-6 text-center text-[13px] text-stone-500">
            © 2024 Trust Us. Creamy white, punchy red, pure quality.
          </div>
        </div>
      </footer>
    </div>
  );
}