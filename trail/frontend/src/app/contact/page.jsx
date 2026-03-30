"use client";
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-[#faf9f6]">
      <main className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Form */}
          <div className="p-10 bg-white rounded-3xl shadow-xl border border-gray-100">
             <h2 className="text-4xl font-serif font-bold text-[#3c2a21] mb-8">Get In Touch</h2>
             <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#3c2a21] mb-2 uppercase tracking-widest">Your Name</label>
                  <input type="text" className="w-full p-4 rounded-xl border-2 border-gray-100 outline-none focus:border-[#d2b48c] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#3c2a21] mb-2 uppercase tracking-widest">Email Address</label>
                  <input type="email" className="w-full p-4 rounded-xl border-2 border-gray-100 outline-none focus:border-[#d2b48c] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#3c2a21] mb-2 uppercase tracking-widest">Message</label>
                  <textarea rows="6" className="w-full p-4 rounded-xl border-2 border-gray-100 outline-none focus:border-[#d2b48c] transition-all" placeholder="How can we help?"></textarea>
                </div>
                <button className="w-full bg-[#3c2a21] text-[#f5f5dc] py-5 rounded-xl font-bold text-lg hover:bg-[#d2b48c] hover:text-[#3c2a21] transition-all flex items-center justify-center gap-3 shadow-xl">
                  <Send className="w-5 h-5" /> Send Message
                </button>
             </form>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center space-y-12">
             <div>
                <h1 className="text-5xl font-serif font-bold text-[#3c2a21] mb-6 tracking-tight">Visit Brew Haven</h1>
                <p className="text-[#d2b48c] text-xl font-medium">We're always here to discuss the perfect brew.</p>
             </div>
             
             <div className="space-y-8">
                <div className="flex items-start gap-6">
                   <div className="bg-[#3c2a21] p-4 rounded-2xl text-[#d2b48c]">
                      <MapPin className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-[#3c2a21] text-lg mb-1">Our Studio</h4>
                      <p className="text-gray-500">123 Roasted Lane, Espresso Hills, CA 94101</p>
                   </div>
                </div>
                <div className="flex items-start gap-6">
                   <div className="bg-[#3c2a21] p-4 rounded-2xl text-[#d2b48c]">
                      <Mail className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-[#3c2a21] text-lg mb-1">Email Support</h4>
                      <p className="text-gray-500">hello@brewhaven.coffee</p>
                   </div>
                </div>
                <div className="flex items-start gap-6">
                   <div className="bg-[#3c2a21] p-4 rounded-2xl text-[#d2b48c]">
                      <Phone className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-[#3c2a21] text-lg mb-1">Call Us</h4>
                      <p className="text-gray-500">+1 (800) 555-BREW</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
