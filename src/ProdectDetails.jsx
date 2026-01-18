import React, { useState } from "react";

export default function ProductDetails() {
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState(null);

  const colors = [
    "rgb(245, 242, 235)",
    "rgb(176, 107, 86)",
    "rgb(67, 62, 56)",
  ];

  return (
    <div className="flex  flex-col lg:flex-row items-start justify-between gap-12 p-6 lg:p-16">
      
      {/* Image */}
      <div className="aspect-4/5 overflow-hidden">
        <img
          src="productimg.avif"
          alt="product"
          className="lg:w-[90%] w-full h-[95%] object-cover opacity-95"
        />
      </div>

      {/* Details */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center max-w-xl">
        <span className="text-sm font-medium text-[#A8A29E] uppercase tracking-widest mb-2">
          Wearable
        </span>

        <h1 className="text-4xl md:text-5xl font-serif text-[#2C2A26] mb-4">
          Luxe Epoch
        </h1>

        <span className="text-2xl font-light text-[#2C2A26] mb-8">
          $349
        </span>

        <p className="text-[#5D5A53] leading-relaxed font-light text-lg mb-8 border-b border-[#D6D1C7] pb-8">
          Time is not a sequence of numbers, but a flow of moments. The Luxe Epoch
          rethinks the smartwatch interface, using a calm E-Ink hybrid display
          that mimics paper. It tracks stress through skin temperature and heart
          rate variability, gently vibrating to remind you to breathe. The
          ceramic casing is hypoallergenic and smooth, polished by hand for 48
          hours.
        </p>

        {/* Colors */}
        <span className="block text-xs font-bold uppercase tracking-widest mb-4 text-[#2C2A26]">
          Object Finish
        </span>

        <div className="flex gap-4 mb-8">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setActiveColor(index)}
              className={`w-10 h-10 rounded-full p-1 transition border-[#2C2A26]
                ${
                  activeColor === index
                    ? "border-2 border-[#2C2A26]"
                    : " border-[.1px] border-[#a5a19b] hover:scale-110"
                }`}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: color }}
              />
            </button>
          ))}
        </div>

        {/* Sizes */}
        <div className="mb-8">
          <span className="block text-xs font-bold uppercase tracking-widest mb-4 text-[#2C2A26]">
            Select Size
          </span>

          <div className="flex gap-4">
            {["S", "M", "L"].map((size) => (
              <button
                key={size}
                onClick={() => setActiveSize(size)}
                className={`w-12 h-12 flex items-center justify-center transition
                  ${
                    activeSize === size
                      ? "border border-[#2C2A26] text-[#2C2A26] font-semibold"
                      : "border border-[#D6D1C7] text-[#5D5A53] hover:border-[#2C2A26]"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

      
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <button
             
              className={`flex-1 py-5 uppercase tracking-widest text-sm font-medium transition bg-[#2C2A26] text-[#F5F2EB] hover:bg-[#433E38]
                `}
            >
              Add to Cart — $349
            </button>

            <button
              aria-label="Wishlist"
              className="px-6 border border-[#D6D1C7] hover:border-[#2C2A26] flex items-center justify-center transition"
            >
              ❤️
            </button>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-[#5D5A53] ">
            <li className="flex items-center gap-3">
              <span className="w-1 h-1 bg-[#2C2A26] rounded-full" />
              Stress Monitoring
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1 h-1 bg-[#2C2A26] rounded-full" />
              E-Ink Hybrid Display
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1 h-1 bg-[#2C2A26] rounded-full" />
              7-Day Battery
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
