/**
 * Author: MD Shahed
 * Date: 2026-10-12
 * File Name: client/src/pages/ApplyPage.tsx
 * Modified Last: 2026-10-12
 * Description: uofs student 4th year
 */

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Internship, ApplicationPayload } from '../types';
import { fetchInternshipById, submitApplication } from '../services/api';
import { PageContainer } from '../components/PageTemplate';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  Check, 
  Send, 
  UploadCloud, 
  UserCheck, 
  Save, 
  RotateCcw, 
  ArrowLeft,
  X,
  ExternalLink
} from 'lucide-react';

const STORAGE_KEY = 'mainstay_applicant_profile';

const PROBLEM_OPTIONS = [
  { id: 'fix', label: 'Fix something', desc: 'I like figuring out how things work' },
  { id: 'optimize', label: 'Make something better', desc: 'I like data, efficiency and optimization' },
  { id: 'execute', label: 'Make something happen', desc: 'I like projects, coordination and getting things done' },
  { id: 'innovate', label: 'Create something new', desc: 'I like ideas, design and innovation' },
  { id: 'people', label: 'Work with people', desc: 'I like communication, collaboration and relationships' },
  { id: 'field', label: 'Work in the real world', desc: 'I want field/site experience' }
];

const INTEREST_AREAS = [
  'Engineering & Design',
  'Construction & Field Work',
  'Project Management',
  'Business & Strategy',
  'Data & Technology',
  'Environmental & Sustainability',
  'Business Development',
  'Something completely different'
];

const COOP_DAY_OPTIONS = [
  { id: 'A', title: 'Deep work', desc: 'Headphones on, solving technical challenges.' },
  { id: 'B', title: 'On site', desc: 'Seeing the work happen in the field.' },
  { id: 'C', title: 'People & projects', desc: 'Meetings, coordination and keeping things moving.' },
  { id: 'D', title: 'A little bit of everything', desc: "I don't want the same day twice." }
];

export const ApplyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [isLoadingJob, setIsLoadingJob] = useState<boolean>(true);

  // Form Fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [school, setSchool] = useState<string>('University of Saskatchewan');
  const [program, setProgram] = useState<string>('Computer Science / Engineering');
  const [year, setYear] = useState<string>('4th Year');
  const [coopTerm, setCoopTerm] = useState<string>('Summer 2027');
  const [coopLength, setCoopLength] = useState<string>('4 months');
  
  // How You Think
  const [problemSolving, setProblemSolving] = useState<string>('Fix something — I like figuring out how things work');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Engineering & Design']);
  const [idealDay, setIdealDay] = useState<string>('Deep work: Headphones on, solving technical challenges.');
  const [curiosity, setCuriosity] = useState<string>('');
  const [superpower, setSuperpower] = useState<string>('');
  const [resumeLink, setResumeLink] = useState<string>('');

  // Save / Profile State
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isProfileLoaded, setIsProfileLoaded] = useState<boolean>(false);
  const [saveBannerMsg, setSaveBannerMsg] = useState<string>('');

  // Submit State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Load Job Details
  useEffect(() => {
    const load = async () => {
      setIsLoadingJob(true);
      if (id) {
        const data = await fetchInternshipById(Number(id));
        setInternship(data);
      }
      setIsLoadingJob(false);
    };
    load();
  }, [id]);

  // Load Saved Profile from localStorage on Mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.name) setName(saved.name);
        if (saved.email) setEmail(saved.email);
        if (saved.school) setSchool(saved.school);
        if (saved.program) setProgram(saved.program);
        if (saved.year) setYear(saved.year);
        if (saved.coopTerm) setCoopTerm(saved.coopTerm);
        if (saved.coopLength) setCoopLength(saved.coopLength);
        if (saved.problemSolving) setProblemSolving(saved.problemSolving);
        if (saved.selectedInterests) setSelectedInterests(saved.selectedInterests);
        if (saved.idealDay) setIdealDay(saved.idealDay);
        if (saved.curiosity) setCuriosity(saved.curiosity);
        if (saved.superpower) setSuperpower(saved.superpower);
        if (saved.resumeLink) setResumeLink(saved.resumeLink);
        setIsProfileLoaded(true);
      }
    } catch (e) {
      console.warn('Failed to parse saved applicant profile:', e);
    }
  }, []);

  const handleSaveProfile = () => {
    const profile = {
      name,
      email,
      school,
      program,
      year,
      coopTerm,
      coopLength,
      problemSolving,
      selectedInterests,
      idealDay,
      curiosity,
      superpower,
      resumeLink
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setIsProfileLoaded(true);
    setSaveBannerMsg('Your details have been saved for future applications on this device.');
    setTimeout(() => setSaveBannerMsg(''), 4000);
  };

  const handleClearSaved = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsProfileLoaded(false);
    setSaveBannerMsg('Saved profile details cleared.');
    setTimeout(() => setSaveBannerMsg(''), 3000);
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !resumeLink.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in your Name, Email, and Resume / Portfolio link.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const payload: ApplicationPayload = {
        internship_id: internship ? internship.id : Number(id || 1),
        applicant_name: name,
        applicant_email: email,
        school,
        program,
        student_year: year,
        coop_term: coopTerm,
        coop_length: coopLength,
        problem_solving_style: problemSolving,
        areas_of_interest: selectedInterests,
        ideal_coop_day: idealDay,
        curiosity_answer: curiosity,
        superpower_skill: superpower,
        resume_link: resumeLink
      };

      await submitApplication(payload);

      // Auto-save if remember me is checked
      if (rememberMe) {
        handleSaveProfile();
      }

      setSubmitStatus('success');
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Failed to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingJob) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-24">
        <Loader2 className="w-8 h-8 animate-spin text-[#204f32] mb-3" />
        <p className="text-sm font-semibold text-[#204f32]">Loading application details...</p>
      </div>
    );
  }

  const requisitionId = internship ? 33140 + internship.id * 5 : 33150;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <PageContainer maxWidth="4xl" className="space-y-6">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Link to="/" className="cursor-pointer">
              <img src="/MAINSTAY_Logo.jpg" alt="Mainstay Logo" className="h-8 w-auto" />
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Application Portal
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {internship && (
              <Link
                to={`/careers/${internship.id}`}
                className="text-[#204f32] hover:text-[#183b26] font-semibold flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Job</span>
              </Link>
            )}
            <button
              onClick={() => window.close()}
              className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>

        {/* Success Confirmation View */}
        {submitStatus === 'success' ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 bg-[#e2efe7] text-[#204f32] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1a11]">
                Application Successfully Submitted!
              </h1>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{name}</strong>. Your application for{' '}
                <strong className="text-[#204f32]">{internship?.title || 'this position'}</strong> at{' '}
                <strong className="text-slate-900">{internship?.company_name || 'Mainstay'}</strong> has been recorded.
              </p>
            </div>

            <div className="p-4 bg-[#f2f7f4] border border-[#c4ded0] rounded-xl max-w-md mx-auto text-xs text-slate-700 space-y-1">
              <div className="font-bold text-[#204f32] flex items-center justify-center gap-1.5">
                <Save className="w-4 h-4" />
                <span>Profile Saved for Future Applications</span>
              </div>
              <p className="text-slate-500">
                Your details are saved on this browser. Next time you apply for any position, your details will be pre-filled automatically!
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/careers"
                className="px-6 py-2.5 bg-[#204f32] hover:bg-[#183b26] text-white rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all"
              >
                Browse More Positions
              </Link>
              <button
                onClick={() => window.close()}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs sm:text-sm font-semibold transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Single-Page Application Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Job Summary Box */}
            <div className="bg-[#204f32] text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#183b26] space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 text-[#c4ded0] text-xs font-semibold backdrop-blur">
                <Sparkles className="w-3.5 h-3.5 text-[#c4ded0]" />
                <span>Tell Us How You Think • Single-Page Application</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {internship?.title || 'Student Position Application'}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200 pt-1">
                {internship?.company_name && (
                  <div className="flex items-center gap-1 font-semibold text-white">
                    <Building2 className="w-3.5 h-3.5 text-[#c4ded0]" />
                    <span>{internship.company_name}</span>
                  </div>
                )}
                {internship?.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#c4ded0]" />
                    <span>{internship.location}</span>
                  </div>
                )}
                <div>Requisition ID: <strong className="text-white">{requisitionId}</strong></div>
              </div>
            </div>

            {/* 2. Login & Auto-Fill Saved Profile Banner */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#e2efe7] text-[#204f32] flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {isProfileLoaded ? 'Saved Profile Active' : 'Save Details for Future Applications'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isProfileLoaded 
                      ? `Pre-filled for ${name || 'applicant'}. You can edit below.` 
                      : 'Fill in your details once; we’ll save them to automatically pre-fill your next application.'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-3 py-1.5 bg-[#f2f7f4] hover:bg-[#e2efe7] text-[#204f32] border border-[#c4ded0] rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>

                {isProfileLoaded && (
                  <button
                    type="button"
                    onClick={handleClearSaved}
                    className="px-3 py-1.5 text-slate-400 hover:text-rose-600 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                    title="Clear saved data from this device"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            {saveBannerMsg && (
              <div className="p-3 bg-[#e2efe7] border border-[#c4ded0] text-[#204f32] rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4" />
                <span>{saveBannerMsg}</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 3. Section 1: Practical Information & Basics */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-[#0b1a11] uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                <span>1. Personal & Academic Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#204f32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jane.doe@usask.ca"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#204f32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">School / University</label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="University of Saskatchewan"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#204f32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Program / Major</label>
                  <input
                    type="text"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    placeholder="Computer Science, Engineering, etc."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#204f32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current Academic Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#204f32] focus:outline-none cursor-pointer"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                    <option>Graduate Student</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preferred Co-op Term</label>
                  <select
                    value={coopTerm}
                    onChange={(e) => setCoopTerm(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#204f32] focus:outline-none cursor-pointer"
                  >
                    <option>Summer 2027</option>
                    <option>Fall 2026</option>
                    <option>Winter 2027</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Section 2: Tell Us How You Think */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-sm font-bold text-[#0b1a11] uppercase tracking-wider pb-2 border-b border-slate-100">
                2. Tell Us How You Think
              </h2>

              {/* Problem Solving Style */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  What kind of problem would you rather solve?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PROBLEM_OPTIONS.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setProblemSolving(`${opt.label} — ${opt.desc}`)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        problemSolving.includes(opt.label)
                          ? 'border-[#204f32] bg-[#f2f7f4] font-bold text-[#0b1a11] ring-2 ring-[#204f32]/20'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-700'
                      }`}
                    >
                      <div className="font-bold">{opt.label}</div>
                      <div className="text-slate-500 font-normal mt-0.5">{opt.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas of Interest */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  What would you like to get your hands on? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INTEREST_AREAS.map((interest) => (
                    <label
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        selectedInterests.includes(interest)
                          ? 'border-[#204f32] bg-[#f2f7f4] text-[#0b1a11] font-bold'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                        selectedInterests.includes(interest)
                          ? 'bg-[#204f32] border-[#204f32] text-white'
                          : 'border-slate-300 bg-white'
                      }`}>
                        {selectedInterests.includes(interest) && <Check className="w-3 h-3" />}
                      </div>
                      <span>{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ideal Day */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Pick your ideal co-op day
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {COOP_DAY_OPTIONS.map((day) => (
                    <div
                      key={day.id}
                      onClick={() => setIdealDay(`${day.title}: ${day.desc}`)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        idealDay.startsWith(day.title)
                          ? 'border-[#204f32] bg-[#f2f7f4] text-[#0b1a11] font-bold ring-2 ring-[#204f32]/20'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="font-bold">{day.title}</span> — <span className="font-normal text-slate-500">{day.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curiosity & Superpower */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    What's something you're curious about?
                  </label>
                  <input
                    type="text"
                    value={curiosity}
                    onChange={(e) => setCuriosity(e.target.value)}
                    placeholder="e.g. How automation is applied in mining..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#204f32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    What's your “I can figure this out” skill?
                  </label>
                  <input
                    type="text"
                    value={superpower}
                    onChange={(e) => setSuperpower(e.target.value)}
                    placeholder="e.g. Organizing chaos, Excel, Learning fast"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#204f32] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 5. Section 3: Resume & Links */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-[#0b1a11] uppercase tracking-wider pb-2 border-b border-slate-100">
                3. Show Us What You've Done
              </h2>

              <div className="space-y-1.5 text-xs">
                <label className="block font-semibold text-slate-700">
                  Resume / Portfolio / LinkedIn Link *
                </label>
                <p className="text-[11px] text-slate-500">
                  Paste a shareable link (Google Drive, OneDrive, LinkedIn profile, or personal website).
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <div className="p-2.5 bg-[#f2f7f4] border border-[#c4ded0] rounded-xl text-[#204f32]">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <input
                    type="url"
                    required
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)}
                    placeholder="https://linkedin.com/in/yourname or drive link"
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#204f32] focus:outline-none text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 6. Save Profile Checkbox & Submit Button */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#204f32] focus:ring-[#204f32] accent-[#204f32] cursor-pointer"
                />
                <span>Save my details on this device for future applications</span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#204f32] hover:bg-[#183b26] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </PageContainer>
    </div>
  );
};
