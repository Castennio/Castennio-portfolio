"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";
import { WordReveal, GradientReveal } from "./TextReveal";

const services = [
  { value: "", label: "Selecciona un servicio" },
  { value: "web-new", label: "Pagina web desde cero" },
  { value: "redesign", label: "Rediseño de sitio existente" },
  { value: "migration", label: "Migracion a tecnologia moderna" },
  { value: "integrations", label: "Integraciones (pagos, agenda, etc.)" },
  { value: "other", label: "Otro" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contacto" className="py-32 px-6 bg-[#0a0a0f] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-[13px] text-white/50 tracking-widest uppercase mb-4">
              Contacto
            </p>
          </FadeIn>
          <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em]">
            <WordReveal as="span" className="text-white/90" delay={0.1}>
              Hablemos de tu
            </WordReveal>{" "}
            <GradientReveal
              as="span"
              className="inline-block"
              delay={0.3}
              gradientFrom="#3b82f6"
              gradientTo="#8b5cf6"
            >
              proyecto
            </GradientReveal>
          </h2>
        </div>

        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm text-white/60 mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#14151a] border border-white/[0.08] rounded-xl text-white/90 placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors duration-300"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-white/60 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#14151a] border border-white/[0.08] rounded-xl text-white/90 placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors duration-300"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm text-white/60 mb-2">
                Servicio de interes
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#14151a] border border-white/[0.08] rounded-xl text-white/90 focus:outline-none focus:border-blue-500/50 transition-colors duration-300 appearance-none cursor-pointer"
              >
                {services.map((service) => (
                  <option key={service.value} value={service.value} className="bg-[#14151a]">
                    {service.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-white/60 mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-[#14151a] border border-white/[0.08] rounded-xl text-white/90 placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors duration-300 resize-none"
                placeholder="Cuentanos sobre tu proyecto..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Enviando..." : "Enviar mensaje"}
            </button>

            {status === "success" && (
              <p className="text-center text-green-400 text-sm">
                Mensaje enviado correctamente. Te contactaremos pronto.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-red-400 text-sm">
                Error al enviar. Intenta de nuevo o escribenos por WhatsApp.
              </p>
            )}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
