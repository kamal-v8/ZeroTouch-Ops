"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '../../../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d2b48c]"></div>
    </div>
  );

  if (!product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-[#f0ede6] border border-gray-100 shadow-xl">
            <img
              src={product.image || 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e'}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e';
              }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="text-[#d2b48c] font-bold uppercase tracking-widest text-sm mb-2 block">Premium Small Batch</span>
            <h1 className="text-5xl font-serif font-bold text-[#3c2a21] mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-[#3c2a21]">${product.price.toFixed(2)}</span>
              <span className="bg-[#d2b48c]/20 text-[#3c2a21] px-3 py-1 rounded-full text-sm font-bold">In Stock</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.description}</p>
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-6">
              <div className="flex items-center border-2 border-gray-200 rounded-2xl p-1 bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-2xl font-bold hover:bg-gray-100 rounded-xl transition-colors"
                >-</button>
                <span className="px-6 text-xl font-bold w-16 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-2xl font-bold hover:bg-gray-100 rounded-xl transition-colors"
                >+</button>
              </div>
              <button
                onClick={() => addToCart({ ...product, quantity })}
                className="flex-grow bg-[#3c2a21] text-[#f5f5dc] py-4 rounded-2xl font-bold text-xl hover:bg-[#d2b48c] hover:text-[#3c2a21] transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95"
              >
                <ShoppingCart className="w-6 h-6" /> Add to Collection
              </button>
            </div>
            <button className="w-full border-2 border-[#3c2a21] text-[#3c2a21] py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
              <Heart className="w-6 h-6" /> Add to Wishlist
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
            <div className="flex flex-col items-center text-center">
              <Truck className="w-8 h-8 text-[#d2b48c] mb-2" />
              <span className="text-sm font-bold text-[#3c2a21]">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="w-8 h-8 text-[#d2b48c] mb-2" />
              <span className="text-sm font-bold text-[#3c2a21]">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RefreshCw className="w-8 h-8 text-[#d2b48c] mb-2" />
              <span className="text-sm font-bold text-[#3c2a21]">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
