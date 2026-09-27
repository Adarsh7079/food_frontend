import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const offers = [
  {
    eyebrow: "मासिक टिफिन प्लान",
    title: "₹2600 में 30 टिफिन",
    description: "रोज़-रोज़ क्या खाना है, इसकी चिंता छोड़िए। घर जैसा ताज़ा खाना हर दिन आपके ऑफिस या घर तक।",
    details: ["एक महीने में 30 टिफिन", "लगभग ₹87 प्रति टिफिन", "हर दिन ताज़ा तैयार"],
    image: "/food/bhindi_roti.png",
    accentImage: "/food/rice.png",
  },
  {
    eyebrow: "व्यस्त दिनों के लिए",
    title: "हर दिन घर का खाना",
    description: "रोज़ खाना बनाने की चिंता छोड़िए और माँ के हाथों जैसा स्वादिष्ट भारतीय भोजन पाइए।",
    details: ["संतुलित भारतीय भोजन", "स्वच्छ रसोई", "समय पर डिलीवरी"],
    image: "/food/rice.png",
    accentImage: "/food/uttapam.png",
  },
  {
    eyebrow: "पूरे परिवार के लिए",
    title: "समय बचाइए, बेहतर खाइए",
    description: "ZaykaNest के साप्ताहिक या मासिक प्लान के साथ अपने रोज़ के खाने की चिंता दूर कीजिए।",
    details: ["लचीले मील प्लान", "रेस्टोरेंट की लाइन नहीं", "घर जैसा स्वाद"],
    image: "/food/uttapam.png",
    accentImage: "/food/samosa.png",
  },
];

const TiffinOfferHero = () => {
  const [activeOffer, setActiveOffer] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;

    const timer = window.setInterval(() => {
      setActiveOffer((current) => (current + 1) % offers.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused]);

  const selectOffer = (index) => {
    setActiveOffer((index + offers.length) % offers.length);
  };

  return (
    <section
      className="relative overflow-hidden border-b border-[#d9a74a]/25 bg-[#123d30]"
      aria-label="टिफिन ऑफर"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {offers.map((offer, index) => (
        <div
          key={offer.title}
          className={`absolute inset-0 transition-opacity duration-700 ${index === activeOffer ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={index !== activeOffer}
          inert={index !== activeOffer}
        >
          <img src={offer.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0d2d22] via-[#123d30]/95 to-[#123d30]/45" />
        </div>
      ))}

      <div className="relative mx-auto flex min-h-85 max-w-7xl items-center justify-between gap-8 px-5 py-12 sm:min-h-97.5 sm:px-10 lg:px-16">
        <div className="max-w-2xl text-[#fffaf2]">
          <span className="inline-flex rounded-full border border-[#f3d7a1]/45 bg-[#f3d7a1]/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#f3d7a1]">
            {offers[activeOffer].eyebrow}
          </span>
          <p className="mt-5 text-sm font-semibold text-[#f3d7a1] sm:text-base">
            स्वाद जो याद रहे, सुविधा जो रोज़ साथ रहे ❤️
          </p>
          <h1 className="mt-2 max-w-xl font-serif text-4xl font-bold leading-tight sm:text-6xl">
            {offers[activeOffer].title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#fffaf2]/85 sm:text-lg">
            {offers[activeOffer].description}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[#f3d7a1]">
            {offers[activeOffer].details.map((detail) => (
              <span key={detail}>✓ {detail}</span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/menu"
              className="rounded-xl bg-[#f3d7a1] px-6 py-3 text-sm font-bold text-[#123d30] shadow-lg transition hover:bg-[#d9a74a] active:scale-95"
            >
              अपना प्लान चुनें
            </Link>
            <Link
              to="/menu"
              className="rounded-xl border border-[#f3d7a1]/45 bg-white/10 px-5 py-3 text-sm font-bold text-[#fffaf2] transition hover:bg-white/20 active:scale-95"
            >
              आज का मेन्यू देखें
            </Link>
            <span className="text-sm text-[#fffaf2]/75">मासिक स्लॉट सीमित हैं</span>
          </div>
        </div>

        <div className="relative hidden w-72 shrink-0 lg:block xl:w-80">
          <div className="absolute -inset-4 rounded-[2rem] bg-[#f3d7a1]/15 blur-2xl" />
          <div className="relative rotate-2 overflow-hidden rounded-[2rem] border-4 border-[#fffaf2]/80 bg-[#f3d7a1] p-2 shadow-2xl transition-transform duration-700 hover:rotate-0 hover:scale-105">
            <img
              src={offers[activeOffer].accentImage}
              alt="ZaykaNest का ताज़ा खाना"
              className="aspect-square w-full rounded-[1.5rem] object-cover"
            />
            <span className="absolute bottom-5 left-5 rounded-full bg-[#123d30]/90 px-3 py-1.5 text-xs font-bold text-[#f3d7a1]">
              घर जैसा स्वाद 🍱
            </span>
          </div>
        </div>

        <div className="absolute bottom-6 right-5 flex items-center gap-2 sm:right-10 lg:right-16">
          <button
            type="button"
            onClick={() => selectOffer(activeOffer - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-[#0d2d22]/60 text-white transition hover:bg-[#0d2d22]"
            aria-label="पिछला टिफिन ऑफर"
          >
            ←
          </button>
          {offers.map((offer, index) => (
            <button
              key={offer.title}
              type="button"
              onClick={() => selectOffer(index)}
              className={`h-2.5 rounded-full transition-all ${index === activeOffer ? "w-7 bg-[#f3d7a1]" : "w-2.5 bg-white/60 hover:bg-white"}`}
              aria-label={`ऑफर ${index + 1} दिखाएं`}
              aria-current={index === activeOffer ? "true" : undefined}
            />
          ))}
          <button
            type="button"
            onClick={() => selectOffer(activeOffer + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-[#0d2d22]/60 text-white transition hover:bg-[#0d2d22]"
            aria-label="अगला टिफिन ऑफर"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TiffinOfferHero;
