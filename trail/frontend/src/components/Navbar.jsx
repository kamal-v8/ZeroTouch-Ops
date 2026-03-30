"use client";
import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Coffee, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <nav className="bg-[#4a3728] text-[#f5f5dc] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Coffee className="w-8 h-8 text-[#d2b48c]" />
            <span className="text-2xl font-serif font-bold tracking-tight">BREW HAVEN</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="hover:text-[#d2b48c] transition-colors font-medium">Shop</Link>
            <Link href="/about" className="hover:text-[#d2b48c] transition-colors font-medium">Our Story</Link>
            <Link href="/contact" className="hover:text-[#d2b48c] transition-colors font-medium">Contact</Link>
          </div>

          <div className="flex items-center space-x-6">
            <button className="hover:text-[#d2b48c] transition-colors">
              <User className="w-6 h-6" />
            </button>
            <Link href="/cart" className="relative hover:text-[#d2b48c] transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#d2b48c] text-[#4a3728] text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#4a3728]">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
