"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from "lucide-react";

export function EnquirySection() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    requirementType: "Commercial / Bulk Order",
    quantity: "",
    productInterested: "Executive Work Desk",
    preferredMaterial: "Teak (Warm golden)",
    preferredFinish: "Matte Black (Standard)",
    message: "",
    honeypot: "",
    agree: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (productParam) {
      setFormData((prev) => ({
        ...prev,
        productInterested: productParam,
      }));
    }
  }, [productParam]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as any;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMessage("Please complete all required fields (*).");
      return;
    }

    if (!formData.agree) {
      setErrorMessage("Please check the consent box to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#A87C4F", "#121212", "#D8C7A5"],
        });
      } catch {}
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquiry" className="py-28 md:py-36 px-6 md:px-12 bg-[#F6F3ED] border-b border-stone-200/80">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-800" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
              Project Consultation & Enquiries
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-stone-950 uppercase tracking-tight">
            LET'S BUILD YOUR SPACE
          </h2>
          <p className="text-stone-700 text-sm md:text-base font-sans mt-4 leading-relaxed">
            Tell us what you are looking for and our team can discuss the right product, material, dimensions and customization options for your requirement.
          </p>
        </div>

        {/* Success Card */}
        {success ? (
          <div className="bg-white rounded-3xl p-10 md:p-16 border border-stone-300 shadow-xl text-center max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full bg-stone-900 text-[#FAF8F5] flex items-center justify-center mx-auto mb-6 shadow-md">
              <CheckCircle2 className="w-8 h-8 text-amber-400" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold">
              Enquiry Received
            </span>
            <h3 className="text-3xl md:text-4xl font-editorial font-bold text-stone-950 uppercase tracking-tight mt-2">
              THANK YOU
            </h3>
            <p className="text-stone-700 text-sm md:text-base font-sans mt-3 max-w-md mx-auto leading-relaxed">
              Your project enquiry has been registered with our design and production studio. A specialist will review your specifications and contact you shortly.
            </p>

            <div className="mt-8 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setSuccess(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    city: "",
                    requirementType: "Commercial / Bulk Order",
                    quantity: "",
                    productInterested: "Executive Work Desk",
                    preferredMaterial: "Teak (Warm golden)",
                    preferredFinish: "Matte Black (Standard)",
                    message: "",
                    honeypot: "",
                    agree: true,
                  });
                }}
                className="px-6 py-3 rounded-full bg-stone-900 text-white text-xs font-mono uppercase tracking-widest hover:bg-stone-800 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          /* Form Card */
          <div className="bg-white rounded-3xl p-8 md:p-14 border border-stone-200/90 shadow-xl">
            {errorMessage && (
              <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-mono flex items-center gap-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Bot Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Row 1: Name, Email, Phone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all font-sans"
                  />
                </div>
              </div>

              {/* Row 2: Company, City, Requirement Type */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Architect / Studio / Firm"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
                    City / Location
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Mumbai, Bangalore, Delhi"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
                    Requirement Type
                  </label>
                  <select
                    name="requirementType"
                    value={formData.requirementType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all font-sans"
                  >
                    <option value="Commercial / Bulk Order">Commercial / Bulk Order</option>
                    <option value="Interior Design Project">Interior Design Project</option>
                    <option value="Corporate Office Workstations">Corporate Office Workstations</option>
                    <option value="Executive Suite Furniture">Executive Suite Furniture</option>
                    <option value="Home Study Workspace">Home Study Workspace</option>
                    <option value="Hospitality / Lounge Tables">Hospitality / Lounge Tables</option>
                    <option value="Custom Bespoke Furniture">Custom Bespoke Furniture</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Product Interested, Approximate Qty, Preferred Material */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
                    Product Interested In
                  </label>
                  <select
                    name="productInterested"
                    value={formData.productInterested}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all font-sans"
                  >
                    <option value="Executive Work Desk (EL-D01)">Executive Work Desk (EL-D01)</option>
                    <option value="Minimal Work Desk (EL-D02)">Minimal Work Desk (EL-D02)</option>
                    <option value="Z-Frame Desk (EL-D03)">Z-Frame Desk (EL-D03)</option>
                    <option value="Modern Coffee Table (EL-D04)">Modern Coffee Table (EL-D04)</option>
                    <option value="Multiple Collection Products">Multiple Collection Products</option>
                    <option value="Custom Design Commission">Custom Design Commission</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
                    Quantity / Project Scale
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    placeholder="e.g. 1 unit, 10-25 desks, 50+ units"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
                    Preferred Material
                  </label>
                  <select
                    name="preferredMaterial"
                    value={formData.preferredMaterial}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all font-sans"
                  >
                    <option value="Teak (Warm golden)">Teak (Warm golden)</option>
                    <option value="Oak (Light natural)">Oak (Light natural)</option>
                    <option value="Walnut (Rich premium dark)">Walnut (Rich premium dark)</option>
                    <option value="Sheesham (Indian hardwood)">Sheesham (Indian hardwood)</option>
                    <option value="Natural Veneer">Natural Veneer</option>
                    <option value="Solid Wood">Solid Wood</option>
                    <option value="Commercial Laminate">Commercial Laminate</option>
                    <option value="To Be Discussed">To Be Discussed</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Preferred Finish */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
                    Preferred Metal Finish
                  </label>
                  <select
                    name="preferredFinish"
                    value={formData.preferredFinish}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all font-sans"
                  >
                    <option value="Matte Black (Standard)">Matte Black (Standard)</option>
                    <option value="Graphite Grey (Modern)">Graphite Grey (Modern)</option>
                    <option value="White (Clean & Minimal)">White (Clean & Minimal)</option>
                    <option value="Custom RAL Powder Coat">Custom RAL Powder Coat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
                    Tabletop Thickness Preference
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all font-sans"
                  >
                    <option value="18 MM — Standard">18 MM — Standard Profile</option>
                    <option value="25 MM — Premium Look">25 MM — Premium Look</option>
                    <option value="Need Recommendation">Need Recommendation</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
                  Project Message / Custom Dimensions / Details *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Share your requirements, site specifications, dimensional preferences, timeline or questions..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all font-sans resize-none"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                />
                <label htmlFor="agree" className="text-xs text-stone-600 font-mono">
                  I agree to be contacted by Experience Life regarding this furniture enquiry and project specifications.
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] font-mono text-stone-500">
                  🔒 Strictly confidential. No commercial spam.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-amber-900 text-[#FAF8F5] text-xs font-mono uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-md font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Enquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
