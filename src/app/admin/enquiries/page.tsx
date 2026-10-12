"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, Building, MapPin, Calendar, Clock, Trash2, Eye, X } from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/enquiries?status=${statusFilter}`);
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch {
      console.warn("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      }
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete enquiry record?")) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e._id !== id));
        if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
      }
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
            Inbound Leads & Proposals
          </span>
          <h1 className="text-2xl sm:text-3xl font-editorial font-bold uppercase tracking-tight text-stone-900 mt-1">
            CLIENT PROJECT ENQUIRIES
          </h1>
          <p className="text-xs font-mono text-stone-500 mt-1">
            Direct requests from architects, corporate clients, and interior designers
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {["ALL", "new", "in_review", "quoted", "closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                statusFilter === st
                  ? "bg-stone-900 text-white shadow-xs"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {enquiries.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-stone-500">
            No enquiries found in this category. Submit a test enquiry through the website form!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-stone-50 text-stone-500 uppercase border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4">Client Name</th>
                  <th className="px-6 py-4">Requirement</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Scale</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-stone-900 text-sm">{enq.name}</div>
                      <div className="text-stone-500">{enq.email}</div>
                      <div className="text-stone-400 text-[11px]">{enq.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-stone-700">
                      <div className="font-semibold">{enq.requirementType}</div>
                      {enq.company && (
                        <div className="text-stone-400 text-[11px]">{enq.company}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-stone-700">
                      <div>{enq.productInterested}</div>
                      <div className="text-stone-400 text-[11px]">{enq.preferredMaterial}</div>
                    </td>
                    <td className="px-6 py-4 text-stone-600">
                      {enq.quantity || "1 unit"}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleUpdateStatus(enq._id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold border focus:outline-none cursor-pointer ${
                          enq.status === "new"
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : enq.status === "quoted"
                            ? "bg-blue-100 text-blue-900 border-blue-300"
                            : enq.status === "in_review"
                            ? "bg-purple-100 text-purple-900 border-purple-300"
                            : "bg-emerald-100 text-emerald-900 border-emerald-300"
                        }`}
                      >
                        <option value="new">NEW</option>
                        <option value="in_review">IN REVIEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="quoted">QUOTED</option>
                        <option value="closed">CLOSED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDelete(enq._id)}
                          className="text-stone-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold tracking-wider">
                  Enquiry Record
                </span>
                <h3 className="text-xl font-bold font-editorial uppercase text-stone-900">
                  {selectedEnquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-stone-400 uppercase text-[10px] block">Email:</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="text-amber-800 font-bold">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-stone-400 uppercase text-[10px] block">Phone:</span>
                <a href={`tel:${selectedEnquiry.phone}`} className="text-amber-800 font-bold">
                  {selectedEnquiry.phone}
                </a>
              </div>
              <div>
                <span className="text-stone-400 uppercase text-[10px] block">Company / Studio:</span>
                <span className="text-stone-800">{selectedEnquiry.company || "Individual"}</span>
              </div>
              <div>
                <span className="text-stone-400 uppercase text-[10px] block">City:</span>
                <span className="text-stone-800">{selectedEnquiry.city || "Not specified"}</span>
              </div>
              <div>
                <span className="text-stone-400 uppercase text-[10px] block">Product Interested:</span>
                <span className="text-stone-900 font-bold">{selectedEnquiry.productInterested}</span>
              </div>
              <div>
                <span className="text-stone-400 uppercase text-[10px] block">Quantity:</span>
                <span className="text-stone-800">{selectedEnquiry.quantity || "Standard"}</span>
              </div>
              <div>
                <span className="text-stone-400 uppercase text-[10px] block">Preferred Material:</span>
                <span className="text-stone-800">{selectedEnquiry.preferredMaterial}</span>
              </div>
              <div>
                <span className="text-stone-400 uppercase text-[10px] block">Preferred Finish:</span>
                <span className="text-stone-800">{selectedEnquiry.preferredFinish}</span>
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] font-mono uppercase text-stone-500 block mb-1">
                Client Project Message:
              </span>
              <p className="text-xs text-stone-800 font-sans leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-stone-500">Update Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleUpdateStatus(selectedEnquiry._id, e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 font-bold"
                >
                  <option value="new">NEW</option>
                  <option value="in_review">IN REVIEW</option>
                  <option value="contacted">CONTACTED</option>
                  <option value="quoted">QUOTED</option>
                  <option value="closed">CLOSED</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-5 py-2 rounded-xl bg-stone-900 text-white text-xs font-mono uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
