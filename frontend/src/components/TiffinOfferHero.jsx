import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const offers = [
  {
    eyebrow: "Monthly tiffin plan",
    title: "30 tiffins for ₹2600",
    description: "Fresh, home-style meals delivered daily for your office or home.",
    details: ["30 meals in one month", "Approx. ₹87 per tiffin", "Freshly prepared every day"],
    image: "/food/bhindi_roti.png",
  },
  {
    eyebrow: "Made for busy days",
    title: "Ghar ka khaana, every day",
    description: "Skip the cooking and enjoy comforting Indian meals without the daily hassle.",
    details: ["Balanced Indian meals", "Hygienic kitchen", "Reliable daily delivery"],
    image: "/food/rice.png",
  },
  {
    eyebrow: "Family-friendly value",
    title: "Save time. Eat better.",
    description: "Choose a weekly or monthly plan and keep your meals sorted with ZaykaNest.",
    details: ["Flexible meal plans", "No restaurant queues", "Comfort food at home"],
    image: "/food/uttapam.png",
  },
];

const TiffinOfferHero = () => {
  const [activeOffer, setActiveOffer] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveOffer((current) => (current + 1) % offers.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  const selectOffer = (index) => {
    setActiveOffer((index + offers.length) % offers.length);
  };

  return (
    <section
      className="relative overflow-hidden border-b border-[#d9a74a]/25 bg-[#123d30]"
      aria-label="Tiffin offers"
      aria-roledescription="carousel"
    >
      {offers.map((offer, index) => (
        <div
          key={offer.title}
          className={`absolute inset-0 transition-opacity duration-700 ${index === activeOffer ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={index !== activeOffer}
          inert={index !== activeOffer}
        >
          <img src={offer.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0d2d22] via-[#123d30]/95 to-[#123d30]/45" />
        </div>
      ))}

      <div className="relative mx-auto flex min-h-85 max-w-7xl items-center px-5 py-12 sm:min-h-97.5 sm:px-10 lg:px-16">
        <div className="max-w-2xl text-[#fffaf2]">
          <span className="inline-flex rounded-full border border-[#f3d7a1]/45 bg-[#f3d7a1]/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#f3d7a1]">
            {offers[activeOffer].eyebrow}
          </span>
          <h1 className="mt-5 max-w-xl font-serif text-4xl font-bold leading-tight sm:text-6xl">
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
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              to="/menu"
              className="rounded-xl bg-[#f3d7a1] px-6 py-3 text-sm font-bold text-[#123d30] shadow-lg transition hover:bg-[#d9a74a] active:scale-95"
            >
              Start your plan
            </Link>
            <span className="text-sm text-[#fffaf2]/75">Limited monthly slots available</span>
          </div>
        </div>

        <div className="absolute bottom-6 right-5 flex items-center gap-2 sm:right-10 lg:right-16">
          <button
            type="button"
            onClick={() => selectOffer(activeOffer - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-[#0d2d22]/60 text-white transition hover:bg-[#0d2d22]"
            aria-label="Previous tiffin offer"
          >
            ←
          </button>
          {offers.map((offer, index) => (
            <button
              key={offer.title}
              type="button"
              onClick={() => selectOffer(index)}
              className={`h-2.5 rounded-full transition-all ${index === activeOffer ? "w-7 bg-[#f3d7a1]" : "w-2.5 bg-white/60 hover:bg-white"}`}
              aria-label={`Show offer ${index + 1}`}
              aria-current={index === activeOffer ? "true" : undefined}
            />
          ))}
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-1 bg-[#f3d7a1] transition-[width] duration-300"
            style={{ width: `${((activeOffer + 1) / offers.length) * 100}%` }}
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={() => selectOffer(activeOffer + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-[#0d2d22]/60 text-white transition hover:bg-[#0d2d22]"
            aria-label="Next tiffin offer"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TiffinOfferHero;
