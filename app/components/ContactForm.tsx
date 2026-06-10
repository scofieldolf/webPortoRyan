"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengirim pesan.");
      }

      setStatusMsg({ type: "success", text: "Pesan Anda berhasil dikirim! Terima kasih 🙏" });
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error: any) {
      setStatusMsg({
        type: "error",
        text: error.message || "Terjadi kesalahan koneksi. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {statusMsg && (
        <div
          className={`p-4 rounded-xl text-sm font-medium ${
            statusMsg.type === "success"
              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900"
              : "bg-rose-50 text-rose-800 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-100 dark:border-rose-900"
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Nama
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Anda"
          required
          disabled={isLoading}
          className="w-full bg-gray-55 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@anda.com"
          required
          disabled={isLoading}
          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Pesan
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis pesan Anda..."
          required
          disabled={isLoading}
          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none disabled:opacity-50"
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Mengirim...
          </>
        ) : (
          "Kirim Pesan"
        )}
      </button>
    </form>
  );
}
