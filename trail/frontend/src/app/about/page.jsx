"use client";
import React from 'react';
import { Coffee, Award, Users, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#faf9f6]">
      {/* Hero */}
      <section className="bg-[#3c2a21] text-[#f5f5dc] py-32 text-center px-4">
        <h1 className="text-6xl font-serif font-bold mb-6">Our Coffee Journey</h1>
        <p className="text-xl text-[#d2b48c] max-w-2xl mx-auto">From high-altitude farms to your daily cup, we believe in perfection in every bean.</p>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px]">
             <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" alt="Coffee beans" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-4xl font-serif font-bold text-[#3c2a21] mb-6">The Brew Haven Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded in 2020, Brew Haven started with a simple mission: to bridge the gap between small-scale farmers and coffee enthusiasts who appreciate the art of a perfect roast.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We travel the world to source the highest quality Arabica and Robusta beans, ensuring that every batch we roast preserves the unique characteristics of its origin.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
             <Coffee className="w-12 h-12 text-[#d2b48c] mx-auto mb-4" />
             <h3 className="font-bold text-[#3c2a21] mb-2">Micro-Lot</h3>
             <p className="text-sm text-gray-500">Exclusively sourced small batches.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
             <Award className="w-12 h-12 text-[#d2b48c] mx-auto mb-4" />
             <h3 className="font-bold text-[#3c2a21] mb-2">Quality First</h3>
             <p className="text-sm text-gray-500">Rigorously tested for profile purity.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
             <Users className="w-12 h-12 text-[#d2b48c] mx-auto mb-4" />
             <h3 className="font-bold text-[#3c2a21] mb-2">Direct Trade</h3>
             <p className="text-sm text-gray-500">Fair prices directly to the growers.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
             <Globe className="w-12 h-12 text-[#d2b48c] mx-auto mb-4" />
             <h3 className="font-bold text-[#3c2a21] mb-2">Eco-Friendly</h3>
             <p className="text-sm text-gray-500">Sustainable packaging and practices.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
