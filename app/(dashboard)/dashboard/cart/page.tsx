"use client";

import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  validUntil: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Romantic Getaway Package",
      price: 36890,
      quantity: 1,
      image: "/home-section-6/source/5ce2936624b02e31e255a47e_hotel-autumn.jpg",
      category: "Travel & Hotels",
      validUntil: "2025-12-31",
    },
    {
      id: 2,
      name: "Blue Lagoon Spa Experience",
      price: 25500,
      quantity: 2,
      image: "/home-section-6/source/26298bebf52afdfe0eb9e0d11794245b34684330.jpg",
      category: "Pampering",
      validUntil: "2025-11-30",
    },
    {
      id: 3,
      name: "Gourmet Dining Experience",
      price: 18900,
      quantity: 1,
      image: "/home-section-6/source/sumac-845x536.png",
      category: "Food & Dining",
      validUntil: "2025-10-31",
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.24; // 24% VAT
  const total = subtotal + tax;

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className=" lg:px-0">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1">
          Shopping Cart
        </h1>
        <p className="text-gray-400 text-sm lg:text-base">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {cartItems.length === 0 ? (
        // Empty Cart
        <div className="bg-card-background border border-primary rounded-2xl lg:p-12 text-center mx-4 lg:mx-0">
          <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-400 mb-6 text-sm lg:text-base">
            Browse our offers and add items to your cart
          </p>
          <button className="px-6 py-3 bg-primary text-dark font-semibold rounded-full hover:bg-primary/90 transition-all">
            Browse Offers
          </button>
        </div>
      ) : (
        <div className="space-y-6 lg:space-y-0">
          {/* Mobile/Tablet: Stack vertically */}
          <div className="lg:hidden space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-card-background border border-primary rounded-2xl p-4"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-primary flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-base mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-primary text-sm mb-1">
                          {item.category}
                        </p>
                        <p className="text-gray-400 text-xs">
                          Valid until: {item.validUntil}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-400 p-1 hover:bg-red-500/10 rounded transition-all flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-background border border-primary/30 rounded-lg p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1.5 hover:bg-primary/10 rounded text-primary transition-all"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-white font-semibold min-w-[1.5rem] text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-primary/10 rounded text-primary transition-all"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-lg font-bold">
                          {(item.price * item.quantity).toLocaleString()} kr.
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-gray-400 text-xs">
                            {item.price.toLocaleString()} kr. each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-card-background border border-primary rounded-2xl p-6"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-primary flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-bold text-lg mb-1 truncate">
                            {item.name}
                          </h3>
                          <p className="text-primary text-sm mb-1">
                            {item.category}
                          </p>
                          <p className="text-gray-400 text-xs">
                            Valid until: {item.validUntil}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-all flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-background border border-primary/30 rounded-lg p-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-primary/10 rounded text-primary transition-all"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-white font-semibold min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-primary/10 rounded text-primary transition-all"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-xl font-bold">
                            {(item.price * item.quantity).toLocaleString()} kr.
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-gray-400 text-xs">
                              {item.price.toLocaleString()} kr. each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card-background border border-primary rounded-2xl p-6 sticky top-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white font-semibold">
                      {subtotal.toLocaleString()} kr.
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Tax (24% VAT)</span>
                    <span className="text-white font-semibold">
                      {tax.toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}{" "}
                      kr.
                    </span>
                  </div>
                  <div className="border-t border-primary/30 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-lg">Total</span>
                      <span className="text-primary font-bold text-2xl">
                        {total.toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}{" "}
                        kr.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="text-gray-400 text-sm mb-2 block">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 bg-background border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm"
                    />
                    <button className="px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary/30 transition-all text-sm">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-dark font-bold rounded-full hover:bg-primary/90 transition-all text-lg">
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>

                {/* Additional Info */}
                <div className="mt-6 space-y-2 text-center">
                  <p className="text-gray-400 text-xs">
                    🔒 Secure checkout with SSL encryption
                  </p>
                  <p className="text-gray-400 text-xs">
                    💳 Multiple payment methods accepted
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Order Summary */}
          <div className="lg:hidden ">
            <div className="bg-card-background border border-primary rounded-2xl p-4">
              <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Subtotal</span>
                  <span className="text-white font-semibold">
                    {subtotal.toLocaleString()} kr.
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Tax (24% VAT)</span>
                  <span className="text-white font-semibold">
                    {tax.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}{" "}
                    kr.
                  </span>
                </div>
                <div className="border-t border-primary/30 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-primary font-bold text-xl">
                      {total.toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}{" "}
                      kr.
                    </span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-4">
                <label className="text-gray-400 text-sm mb-2 block">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 bg-background border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm"
                  />
                  <button className="px-3 py-2 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary/30 transition-all text-sm">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-bold rounded-full hover:bg-primary/90 transition-all">
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>

              {/* Additional Info */}
              <div className="mt-4 space-y-1 text-center">
                <p className="text-gray-400 text-xs">
                  🔒 Secure checkout with SSL encryption
                </p>
                <p className="text-gray-400 text-xs">
                  💳 Multiple payment methods accepted
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

