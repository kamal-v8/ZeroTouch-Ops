"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, ArrowRight, Coffee, Filter, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    console.log("Fetching from:", apiUrl);
    
    fetch(`${apiUrl}/api/products`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("Products received:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError(`Failed to load products: ${err.message}`);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#faf9f6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h1 className="text-5xl font-serif font-bold text-[#3c2a21] mb-4">Our Full Collection</h1>
            <p className="text-[#d2b48c] text-xl font-medium">Explore our premium small-batch roasted coffee powders.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
             <Filter className="w-5 h-5 text-[#d2b48c]" />
             <span className="font-bold text-[#3c2a21]">Sort by: Featured</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-100 p-8 rounded-3xl flex flex-col items-center text-center mb-12">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-red-900 mb-2">Something went wrong</h3>
            <p className="text-red-700 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all"
            >
              Try Again
            </button>
          </div>
        )}
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-3xl p-4 shadow-md animate-pulse h-[450px]" />
            ))}
          </div>
        ) : !error && products.length === 0 ? (
          <div className="bg-[#f0ede6] p-20 rounded-3xl text-center">
             <Coffee className="w-16 h-16 text-[#3c2a21] mx-auto mb-6 opacity-20" />
             <h3 className="text-2xl font-serif font-bold text-[#3c2a21] mb-2">No products found</h3>
             <p className="text-gray-500 mb-8">We haven't seeded any coffee blends yet.</p>
             <Link href="/" className="inline-block bg-[#3c2a21] text-white px-8 py-3 rounded-xl">Return Home</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map(product => (
              <div key={product.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <Link href={`/products/${product.id}`} className="block relative h-72 bg-[#f0ede6] overflow-hidden">
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
      </div>
    </div>
  );
}
