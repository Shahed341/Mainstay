/**
 * Author: MD Shahed
 * Date: 2026-10-15
 * File Name: client/src/pages/ContactPage.tsx
 * Description: Contact page with form and contact info
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Send, CheckCircle2, Loader2, User, Building2, MessageSquare } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="w-full bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 bg-[#0b1a11] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#99c5b0]">
              Get in Touch
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Contact Us
            </h1>
            <p className="text-slate-300 leading-relaxed">
              We'd love to hear from you. Reach out to discuss your project or learn more about our services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Address */}
            <div className="bg-[#f2f7f4] rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#204f32]/10 text-[#204f32] mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="inline-block px-3 py-1 bg-[#c4ded0] text-[#204f32] text-xs font-bold rounded-full mb-3">
                Address
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mainstay is currently serving the mining industry throughout Canada.
              </p>
              <p className="text-[#0b1a11] font-semibold mt-3">
                602 48th Street East,<br />
                Saskatoon SK S7K 6K4
              </p>
            </div>

            {/* Phone */}
            <div className="bg-[#f2f7f4] rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#204f32]/10 text-[#204f32] mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <div className="inline-block px-3 py-1 bg-[#c4ded0] text-[#204f32] text-xs font-bold rounded-full mb-3">
                Phone
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                We're here to help. Call us anytime M-F 8am-5pm CST to speak with us.
              </p>
              <a href="tel:+13065006269" className="text-[#204f32] font-bold text-lg mt-3 block hover:underline">
                (306) 500-6269
              </a>
            </div>

            {/* Email */}
            <div className="bg-[#f2f7f4] rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#204f32]/10 text-[#204f32] mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <div className="inline-block px-3 py-1 bg-[#c4ded0] text-[#204f32] text-xs font-bold rounded-full mb-3">
                Email
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                If you're interested in working together please visit our <Link to="/careers" className="text-[#204f32] font-semibold hover:underline">Careers</Link> page for Opportunities.
              </p>
              <p className="text-slate-600 text-sm mt-2">For general inquiries, send us an email.</p>
              <a href="mailto:Contact@Mainstayreps.Com" className="text-[#204f32] font-bold mt-3 block hover:underline">
                Contact@Mainstayreps.Com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-[#f2f7f4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-[#0b1a11]">General Inquiries</h2>
              <p className="text-slate-600 leading-relaxed">
                To get in touch, please complete the form and we will get back to you within normal business hours.
              </p>

              <div className="pt-6 border-t border-slate-200">
                <Link
                  to="/careers"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#204f32] hover:bg-[#183b26] text-white rounded-lg text-sm font-bold shadow-sm transition-all"
                >
                  The Lineup
                </Link>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-[#faf8f3] rounded-xl p-8 shadow-sm">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#c4ded0] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#204f32]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0b1a11] mb-2">Message Sent!</h3>
                  <p className="text-sm text-slate-600">
                    Thank you for reaching out. Our team will get back to you within 1-2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Name</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">
                          First Name <span className="text-red-500">(required)</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 bg-[#faf8f3] border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#204f32]/20 focus:border-[#204f32] transition-colors ${
                            errors.firstName ? 'border-red-400' : 'border-[#c4ded0]'
                          }`}
                        />
                        {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">
                          Last Name <span className="text-red-500">(required)</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 bg-[#faf8f3] border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#204f32]/20 focus:border-[#204f32] transition-colors ${
                            errors.lastName ? 'border-red-400' : 'border-[#c4ded0]'
                          }`}
                        />
                        {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 mb-1">
                      Email <span className="text-red-500">(required)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 bg-[#faf8f3] border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#204f32]/20 focus:border-[#204f32] transition-colors ${
                        errors.email ? 'border-red-400' : 'border-[#c4ded0]'
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 mb-1">
                      Message <span className="text-red-500">(required)</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-2.5 bg-[#faf8f3] border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#204f32]/20 focus:border-[#204f32] transition-colors ${
                        errors.message ? 'border-red-400' : 'border-[#c4ded0]'
                      }`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#204f32] hover:bg-[#183b26] disabled:bg-[#204f32]/70 text-white rounded-lg font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Send message</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
