"use client";
import { useState, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  HeadphonesIcon,
  Star,
  Globe,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    {
      icon: <HeadphonesIcon size={18} />,
      label: "24/7 Support",
      value: "Always",
    },
    { icon: <Clock size={18} />, label: "Avg. Response", value: "< 2 hrs" },
    { icon: <Star size={18} />, label: "Happy Clients", value: "4.9/5" },
    { icon: <Globe size={18} />, label: "Global Reach", value: "15+ States" },
  ];
  const contactInfo = [
    {
      icon: <Phone size={20} className="text-[#C49B5C]" />,
      label: "Call Us",
      value: "+91 700 698 0870",
      detail: "Sun-Sat, 24x7 Available",
    },
    {
      icon: <Mail size={20} className="text-[#C49B5C]" />,
      label: "Email Us",
      value: "punitmundotiya24@gmail.com",
      detail: "We reply within 24 hours",
    },
    {
      icon: <MapPin size={20} className="text-[#C49B5C]" />,
      label: "Visit Us",
      value: "Raigaro ka mohalla, Ram dev colony, Bagru, Jaipur",
      detail: "Rajasthan 303007 , India",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#faf6ef] via-white to-[#faf6ef] pt-[64px] md:pt-[80px]">
      {/* Hero Section - Light & Elegant */}
      <section className="relative bg-gradient-to-r from-[#2C1810] via-[#3d2415] to-[#2C1810] py-16 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#C49B5C] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C49B5C] rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNjNDliNWMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C49B5C]"></div>
              <span className="text-[#C49B5C] text-xs font-medium tracking-[0.3em] uppercase">
                Get in Touch
              </span>
              <div className="h-px w-8 bg-[#C49B5C]"></div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
              <span className="font-serif italic">Let{`'`}s</span> Connect
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
              We{`'`}d love to hear from you. Whether you have a question about
              our collections, need custom orders, or just want to say hello.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Side - Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            {/* Contact Cards */}
            {contactInfo.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#C49B5C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2C1810] text-sm">
                      {item.label}
                    </h3>
                    <p className="text-[#2C1810] font-medium text-sm">
                      {item.value}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* WhatsApp Card */}
            <div className="bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] p-5 md:p-6 rounded-2xl shadow-lg text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <h3 className="font-semibold">Quick Response</h3>
              </div>
              <p className="text-white/80 text-sm mb-4">
                Get instant help on WhatsApp
              </p>
              <a
                href="https://wa.me/917006980870"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#2C1810] font-medium rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] text-sm"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
      
          {/* Right Side - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#2C1810] flex items-center gap-2">
                  Send us a Message
                  <Sparkles size={18} className="text-[#C49B5C]" />
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Fill in the form below and we{`'`}ll get back to you shortly.
                </p>
              </div>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
                  <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-green-600" size={18} />
                  </div>
                  <div>
                    <p className="text-green-700 font-medium text-sm">
                      Message Sent Successfully!
                    </p>
                    <p className="text-green-600/70 text-xs">
                      We{`'`}ll get back to you shortly.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                  <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="text-red-600" size={18} />
                  </div>
                  <div>
                    <p className="text-red-700 font-medium text-sm">
                      Something went wrong
                    </p>
                    <p className="text-red-600/70 text-xs">{error}</p>
                  </div>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#2C1810]">
                      Full Name <span className="text-[#C49B5C]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:outline-none transition-all text-sm text-gray-800 placeholder:text-gray-400 ${
                        focusedField === "name"
                          ? "border-[#C49B5C] ring-2 ring-[#C49B5C]/20"
                          : "border-gray-200 focus:border-[#C49B5C]/50"
                      }`}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#2C1810]">
                      Email Address <span className="text-[#C49B5C]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:outline-none transition-all text-sm text-gray-800 placeholder:text-gray-400 ${
                        focusedField === "email"
                          ? "border-[#C49B5C] ring-2 ring-[#C49B5C]/20"
                          : "border-gray-200 focus:border-[#C49B5C]/50"
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#2C1810]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:outline-none transition-all text-sm text-gray-800 placeholder:text-gray-400 ${
                        focusedField === "phone"
                          ? "border-[#C49B5C] ring-2 ring-[#C49B5C]/20"
                          : "border-gray-200 focus:border-[#C49B5C]/50"
                      }`}
                      placeholder="+91 99999 99999"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#2C1810]">
                      Subject
                    </label>
                    <select
                      title="NULL"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C49B5C]/50 transition-all text-sm text-gray-800"
                    >
                      <option value="">Select subject</option>
                      <option value="order">Order Related</option>
                      <option value="custom">Custom Order</option>
                      <option value="return">Return/Exchange</option>
                      <option value="general">General Inquiry</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#2C1810]">
                    Message <span className="text-[#C49B5C]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={4}
                    className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:outline-none transition-all resize-none text-sm text-gray-800 placeholder:text-gray-400 ${
                      focusedField === "message"
                        ? "border-[#C49B5C] ring-2 ring-[#C49B5C]/20"
                        : "border-gray-200 focus:border-[#C49B5C]/50"
                    }`}
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative group px-6 py-3 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-[#C49B5C]/25 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all hover:translate-y-[-2px]"
            >
              <div className="text-[#C49B5C] flex justify-center mb-1">
                {stat.icon}
              </div>
              <div className="text-lg font-bold text-[#2C1810]">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
        {/* Map Section */}
        <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-64 md:h-72">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d718.6240654036163!2d75.54542284192983!3d26.81058203217813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQ4JzM3LjgiTiA3NcKwMzInNDUuNiJF!5e0!3m2!1sen!2sin!4v1782575036773!5m2!1sen!2sin"
            height="100%"
            width="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </main>
  );
}
