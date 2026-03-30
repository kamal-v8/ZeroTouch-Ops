"use client";
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle, Truck, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    setStep(3);
    setLoading(false);
  };

  if (step === 3) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="bg-[#d2b48c] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-[#3c2a21]">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-serif font-bold text-[#3c2a21] mb-4">Order Received!</h2>
        <p className="text-gray-600 mb-10 text-lg">Your premium coffee is being freshly roasted and will be shipped soon.</p>
        <Link href="/" className="inline-block bg-[#3c2a21] text-[#f5f5dc] px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#d2b48c] hover:text-[#3c2a21] transition-all shadow-xl">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="flex-grow">
          <div className="flex items-center gap-4 mb-12">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-[#3c2a21] text-[#f5f5dc]' : 'bg-gray-200'}`}>1</div>
            <div className="h-0.5 w-12 bg-gray-200" />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-[#3c2a21] text-[#f5f5dc]' : 'bg-gray-200'}`}>2</div>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-10">
            {step === 1 ? (
              <div className="space-y-8 animate-in fade-in duration-500">
                <h2 className="text-3xl font-serif font-bold text-[#3c2a21] flex items-center gap-3">
                  <Truck className="w-8 h-8 text-[#d2b48c]" /> Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required type="text" placeholder="First Name" className="p-4 rounded-2xl border-2 border-gray-100 focus:border-[#d2b48c] outline-none transition-all" />
                  <input required type="text" placeholder="Last Name" className="p-4 rounded-2xl border-2 border-gray-100 focus:border-[#d2b48c] outline-none transition-all" />
                  <input required type="email" placeholder="Email Address" className="md:col-span-2 p-4 rounded-2xl border-2 border-gray-100 focus:border-[#d2b48c] outline-none transition-all" />
                  <input required type="text" placeholder="Street Address" className="md:col-span-2 p-4 rounded-2xl border-2 border-gray-100 focus:border-[#d2b48c] outline-none transition-all" />
                  <input required type="text" placeholder="City" className="p-4 rounded-2xl border-2 border-gray-100 focus:border-[#d2b48c] outline-none transition-all" />
                  <input required type="text" placeholder="ZIP Code" className="p-4 rounded-2xl border-2 border-gray-100 focus:border-[#d2b48c] outline-none transition-all" />
                </div>
                <button type="button" onClick={() => setStep(2)} className="w-full bg-[#3c2a21] text-[#f5f5dc] py-5 rounded-2xl font-bold text-xl hover:bg-[#d2b48c] hover:text-[#3c2a21] transition-all flex items-center justify-center gap-3 shadow-xl">
                  Continue to Payment <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <h2 className="text-3xl font-serif font-bold text-[#3c2a21] flex items-center gap-3">
                  <CreditCard className="w-8 h-8 text-[#d2b48c]" /> Payment Details
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  <input required type="text" placeholder="Card Number" className="p-4 rounded-2xl border-2 border-gray-100 focus:border-[#d2b48c] outline-none transition-all" />
                  <div className="grid grid-cols-2 gap-6">
                    <input required type="text" placeholder="MM/YY" className="p-4 rounded-2xl border-2 border-gray-100 focus:border-[#d2b48c] outline-none transition-all" />
                    <input required type="text" placeholder="CVC" className="p-4 rounded-2xl border-2 border-gray-100 focus:border-[#d2b48c] outline-none transition-all" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="flex-grow border-2 border-[#3c2a21] text-[#3c2a21] py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all">
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="flex-[2] bg-[#3c2a21] text-[#f5f5dc] py-5 rounded-2xl font-bold text-xl hover:bg-[#d2b48c] hover:text-[#3c2a21] transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50">
                    {loading ? 'Processing...' : 'Place Secure Order'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="w-full md:w-96 bg-[#f0ede6] p-10 rounded-3xl h-fit">
          <h3 className="text-xl font-serif font-bold text-[#3c2a21] mb-6 border-b border-gray-200 pb-4">Order Summary</h3>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} x {item.quantity || 1}</span>
                <span className="font-bold text-[#3c2a21]">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200 flex justify-between font-bold text-xl text-[#3c2a21]">
              <span>Total</span>
              <span>${cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
