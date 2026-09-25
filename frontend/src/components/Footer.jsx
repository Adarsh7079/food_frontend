const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative mt-24 overflow-hidden rounded-t-[2.5rem] border-t border-amber-200 bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 px-6 pt-14 text-amber-50 sm:px-10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 pb-12 sm:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="ZaykaNest"
              className="h-16 w-16 rounded-full border border-amber-300/30 object-cover"
            />
            <div>
              <p className="font-serif text-2xl font-bold text-amber-200">ZaykaNest</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">Ghar jaisa swaad</p>
            </div>
          </div>
          <p className="mt-5 max-w-md leading-relaxed text-stone-300">
            Fresh, flavourful meals made for busy days and late-night cravings—delivered to your doorstep with warmth and care.
          </p>
          <a
            href="https://wa.me/919709628329"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-200 transition hover:bg-amber-400/20"
          >
            Order on WhatsApp
          </a>
        </div>

        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-amber-300">Company</p>

          <ul className="flex flex-col gap-3 text-stone-300">
            <li onClick={scrollToTop} className="cursor-pointer transition hover:text-amber-300">
              Home
            </li>
            <li onClick={scrollToTop} className="cursor-pointer transition hover:text-amber-300">
              About Us
            </li>
            <li onClick={scrollToTop} className="cursor-pointer transition hover:text-amber-300">
              Delivery info
            </li>
            <li onClick={scrollToTop} className="cursor-pointer transition hover:text-amber-300">
              Privacy policy
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-amber-300">Get in touch</p>
          <ul className="flex flex-col gap-4 text-stone-300">
            <li>
              <a className="font-semibold transition hover:text-amber-300" href="tel:+919709628329">+91 97096 28329</a>
              <p className="mt-1 text-xs text-stone-400">Call or WhatsApp us</p>
            </li>
            <li>
              <a className="break-all font-semibold transition hover:text-amber-300" href="mailto:araag.khana.khazana@gmail.com">araag.khana.khazana@gmail.com</a>
              <p className="mt-1 text-xs text-stone-400">We usually reply within a day</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-amber-100/15">
        <p className="py-5 text-center text-xs text-stone-400 sm:text-sm">
          Copyright 2026 © ZaykaNest · Made with love and fresh ingredients.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
