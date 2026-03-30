"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, ArrowRight, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#faf9f6]">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-[#3c2a21] overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085')] bg-cover bg-center" />
        <div className="relative z-10 text-center text-[#f5f5dc] px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">Awaken Your Senses</h1>
          <p className="text-xl md:text-2xl mb-10 text-[#d2b48c] font-medium leading-relaxed">
            Discover the finest small-batch roasted coffee powders from around the globe.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop" className="bg-[#d2b48c] text-[#3c2a21] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#c19a6b] transition-all transform hover:scale-105 shadow-xl">
              Shop Now
            </Link>
            <Link href="/about" className="border-2 border-[#d2b48c] text-[#d2b48c] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#d2b48c] hover:text-[#3c2a21] transition-all transform hover:scale-105">
              Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold text-[#3c2a21] mb-2">Signature Blends</h2>
            <div className="w-20 h-1.5 bg-[#d2b48c] rounded-full" />
          </div>
          <Link href="/shop" className="text-[#3c2a21] font-bold flex items-center gap-2 hover:text-[#d2b48c] transition-colors">
            View All <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-3xl p-4 shadow-md animate-pulse h-[450px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map(product => (
              <div key={product.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <Link href={`/products/${product.id}`} className="block relative h-72 bg-[#f0ede6] overflow-hidden">
                   {/* Fallback image if local assets don't exist yet */}
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e';
                    }}
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/90 backdrop-blur p-3 rounded-full text-[#3c2a21] hover:bg-[#d2b48c] hover:text-white transition-all shadow-lg">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white text-sm font-bold uppercase tracking-widest">Premium Roast</span>
                  </div>
                </Link>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-serif font-bold text-[#3c2a21]">{product.name}</h3>
                    <span className="text-2xl font-bold text-[#d2b48c]">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-8 line-clamp-2 leading-relaxed">{product.description}</p>
                  
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-[#3c2a21] text-[#f5f5dc] font-bold py-4 rounded-2xl hover:bg-[#d2b48c] hover:text-[#3c2a21] transition-all duration-300 shadow-lg active:scale-95"
                  >
                    Add to Collection
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Feature Section */}
      <section className="bg-[#f0ede6] py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-8">
            <div className="bg-[#d2b48c] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
              <Coffee className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#3c2a21] mb-4">Ethically Sourced</h4>
            <p className="text-gray-600">We work directly with farmers to ensure fair wages and sustainable practices.</p>
          </div>
          <div className="p-8 border-x border-gray-200">
             <div className="bg-[#d2b48c] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
              <ArrowRight className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#3c2a21] mb-4">Fast Shipping</h4>
            <p className="text-gray-600">Freshly roasted and shipped to your door within 48 hours of your order.</p>
          </div>
          <div className="p-8">
             <div className="bg-[#d2b48c] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#3c2a21] mb-4">Subscription Plan</h4>
            <p className="text-gray-600">Never run out of coffee again. Save 15% with our monthly subscription.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3c2a21] text-[#f5f5dc] py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold mb-4">Brew Haven</h2>
            <p className="text-[#d2b48c] max-w-sm">Elevating your daily coffee ritual through exceptional beans and expert roasting.</p>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-[#d2b48c] transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-[#d2b48c] transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-[#d2b48c] transition-colors">Facebook</Link>
          </div>
          <p className="text-sm opacity-50">© 2026 Brew Haven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
