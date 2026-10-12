"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Collection", href: "/#collection" },
    { label: "Materials", href: "/#materials" },
    { label: "Hardware", href: "/#hardware" },
    { label: "Customization", href: "/#customization" },
    { label: "About", href: "/#about" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Contact", href: "/#enquiry" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-nav py-3.5 border-b border-stone-200/70 shadow-xs"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex flex-col items-start">
            <span className="font-editorial text-lg md:text-xl font-bold tracking-widest uppercase text-stone-900 group-hover:text-amber-800 transition-colors">
              EXPERIENCE LIFE
            </span>
            <span className="text-[9px] font-mono tracking-widest text-stone-500 uppercase -mt-0.5">
              Furniture for Every Space
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-mono uppercase tracking-wider text-stone-600 hover:text-stone-900 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-stone-900 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/#enquiry"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-amber-900 text-[#FAF8F5] text-xs font-mono uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#FAF8F5] transition-all duration-500 flex flex-col justify-between p-8 pt-28 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-6">
          <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400">
            Navigation Menu
          </span>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif tracking-tight text-stone-900 hover:text-amber-800 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="pt-8 border-t border-stone-200">
          <Link
            href="/#enquiry"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-stone-900 text-[#FAF8F5] py-4 rounded-full text-xs font-mono uppercase tracking-widest"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <div className="mt-4 text-center">
            <p className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">
              Commercial • Custom • Architecture
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
