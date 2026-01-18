import React from "react";

export default function ProductDetails() {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-12 p-6 lg:p-16">
      
     
      <div className=" aspect-4/5  overflow-hidden">
        <img
          src="/productimg.avif"
          alt="product"
          className="lg:w-[90%] w-full h-[95%] object-cover  opacity-95 "
        />
      </div>

   
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

      
        <span className="block text-xs font-bold uppercase tracking-widest mb-4 text-[#2C2A26]">
          Object Finish
        </span>

        <div className="flex gap-4 mb-8">
          <button
         
            className="w-10 h-10 rounded-full border-2 border-[#2C2A26] p-1"
          >
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: "rgb(245, 242, 235)" }}
            />
          </button>

          <button
           
            className="w-10 h-10 rounded-full border-2 border-transparent hover:scale-110 transition"
          >
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: "rgb(176, 107, 86)" }}
            />
          </button>

          <button
           
            className="w-10 h-10 rounded-full border-2 border-transparent hover:scale-110 transition"
          >
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: "rgb(67, 62, 56)" }}
            />
          </button>
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
                className="w-12 h-12 flex items-center justify-center border border-[#D6D1C7] text-[#5D5A53] hover:border-[#2C2A26] transition"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

     
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <button className="flex-1 py-5 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-sm font-medium hover:bg-[#433E38] transition">
              Add to Cart — $349
            </button>

            <button
              aria-label="Wishlist"
              className="px-6 border border-[#D6D1C7] hover:border-[#2C2A26] flex items-center justify-center transition"
            >
              ❤️
            </button>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-[#5D5A53]">
            <li className="flex items-center gap-3 ">
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
