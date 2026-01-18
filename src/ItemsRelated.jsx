import React from "react";

export default function ItemsRelated() {
  return (
    <div className="group relative w-full max-w-sm cursor-pointer">
      {/* Image */}
      <div className="relative aspect-4/5 overflow-hidden bg-[#EBE7DE]">
        <img
          src="item.webp"
          alt="Product"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="pointer-events-none absolute top-4 left-4 z-10 flex flex-col items-start gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="bg-[#DC2626] px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase shadow-sm">
            sales 15%
          </span>
        </div>
        <button className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 opacity-0 backdrop-blur transition group-hover:opacity-100">
          ❤️
        </button>
        <button className="absolute right-2 bottom-2 flex translate-y-2 items-center gap-2 rounded-full bg-[#2C2A26]/80 px-3 py-2 text-[8px] font-bold tracking-widest text-white uppercase opacity-0 shadow-lg backdrop-blur-md transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105">
          3D Experience
        </button>

        {/* Hidden Buttons */}
        <div className="absolute inset-x-0 bottom-6 flex translate-y-6 justify-center gap-3 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <button className="rounded-full bg-white px-6 py-3 text-xs font-semibold tracking-widest uppercase shadow transition hover:scale-105">
            <span className="text-[9px] font-black tracking-[0.4em] text-[#2C2A26] uppercase">
              Quick View
            </span>
          </button>
        </div>
      </div>

      {/* Text */}
      <div className="mt-5 text-center">
        <h3 className="font-serif text-xl text-[#2C2A26]">Luxe Essence</h3>
        <div className="relative">
          <span className="mt-1 text-sm text-[#A8A29E] opacity-100 transition-opacity duration-300 group-hover:opacity-0">
            Home
          </span>
          <span className="absolute inset-x-0 mt-1 text-sm text-[#A8A29E] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            test
          </span>
        </div>
        <div className="text-center space-x-2">
        <span className="mt-1 text-xm text-[#DC2626]">$509</span>
        <span className="mt-1 text-sm text-[#A8A29E] line-through">$599</span>

        </div>
      </div>
    </div>
  );
}
