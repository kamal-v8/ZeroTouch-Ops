"use client";
import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 50 ? 0 : 5.00;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="bg-[#f0ede6] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-[#3c2a21]">
          <ShoppingCart className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-serif font-bold text-[#3c2a21] mb-4">Your collection is empty</h2>
        <p className="text-gray-600 mb-10 text-lg">Start your journey and discover our premium blends.</p>
        <Link href="/" className="inline-block bg-[#3c2a21] text-[#f5f5dc] px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#d2b48c] hover:text-[#3c2a21] transition-all shadow-xl">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-serif font-bold text-[#3c2a21] mb-12">Shopping Collection</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100 group transition-all hover:shadow-md">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-[#f0ede6] flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#3c2a21]">{item.name}</h3>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-gray-500 font-medium">Qty: {item.quantity || 1}</div>
                  <div className="text-2xl font-bold text-[#3c2a21]">${(item.price * (item.quantity || 1)).toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
          
          <button onClick={clearCart} className="text-[#3c2a21] font-bold flex items-center gap-2 hover:text-red-500 transition-colors px-6">
            <Trash2 className="w-5 h-5" /> Clear Collection
          </button>
        </div>

        {/* Summary */}
        <div className="bg-[#3c2a21] text-[#f5f5dc] p-10 rounded-3xl shadow-2xl h-fit sticky top-24">
          <h2 className="text-2xl font-serif font-bold mb-8 pb-4 border-b border-[#d2b48c]/30">Order Summary</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-[#d2b48c]">
              <span>Subtotal</span>
              <span className="font-bold text-[#f5f5dc]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#d2b48c]">
              <span>Shipping</span>
              <span className="font-bold text-[#f5f5dc]">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="pt-4 border-t border-[#d2b48c]/30 flex justify-between text-2xl font-serif font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <Link href="/checkout" className="w-full bg-[#d2b48c] text-[#3c2a21] py-5 rounded-2xl font-bold text-xl hover:bg-[#f5f5dc] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95">
            <CreditCard className="w-6 h-6" /> Proceed to Checkout
          </Link>
          
          <Link href="/" className="mt-6 flex items-center justify-center gap-2 text-[#d2b48c] font-bold hover:text-[#f5f5dc] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
