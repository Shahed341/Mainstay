/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/components/ApplicationModal.tsx
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import React, { useState } from 'react';
import { Internship, ApplicationPayload } from '../types';
import { submitApplication } from '../services/api';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  Check, 
  UploadCloud 
} from 'lucide-react';

interface ApplicationModalProps {
  internship: Internship | null;
  onClose: () => void;
}

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
  'Business Development',
  'Marketing & Communications',
  'Something completely different'
];

const COOP_DAY_OPTIONS = [
  { id: 'A', title: 'A. Deep work', desc: 'Headphones on, solving a technical problem.' },
  { id: 'B', title: 'B. On site', desc: 'Seeing the work happen in the field.' },
  { id: 'C', title: 'C. People & projects', desc: 'Meetings, coordination and keeping things moving.' },
  { id: 'D', title: 'D. A little bit of everything', desc: "I don't want the same day twice." }
];

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ internship, onClose }) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [problemSolving, setProblemSolving] = useState<string>('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [idealDay, setIdealDay] = useState<string>('');
  const [curiosity, setCuriosity] = useState<string>('');
  const [superpower, setSuperpower] = useState<string>('');
  
  // Practical basics
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [school, setSchool] = useState<string>('University of Saskatchewan');
  const [program, setProgram] = useState<string>('Computer Science / Engineering');
  const [year, setYear] = useState<string>('4th Year');
  const [coopTerm, setCoopTerm] = useState<string>('Summer 2027');
  const [coopLength, setCoopLength] = useState<string>('4 months');
  const [resumeLink, setResumeLink] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!internship) return null;

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !resumeLink) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and resume link.');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const payload: ApplicationPayload = {
        internship_id: internship.id,
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
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-mainstay-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-mainstay-100 flex items-center justify-between bg-mainstay-50/50">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-mainstay-100 text-mainstay-800 text-xs font-bold mb-1 border border-mainstay-200">
              <Sparkles className="w-3.5 h-3.5 text-mainstay-700" />
              <span>Tell Us How You Think</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-mainstay-950 leading-tight">
              Application for {internship.title}
            </h2>
            <p className="text-xs text-slate-500">
              Company: <span className="font-bold text-mainstay-800">{internship.company_name}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {status !== 'success' && (
          <div className="bg-slate-100 h-1.5 w-full flex">
            <div 
              className="bg-mainstay-700 h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {status === 'success' ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 bg-mainstay-100 text-mainstay-700 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-mainstay-950">Application & Assessment Sent!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-mainstay-900">{name}</span>. We've captured how you think and your interests for <span className="font-bold text-mainstay-700">{internship.company_name}</span>.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-2.5 bg-mainstay-700 hover:bg-mainstay-800 text-white font-bold rounded-xl text-sm transition-all shadow-sm"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: How You Think & Hands-on Interests */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-sm font-bold text-mainstay-950 mb-1">
                      1. What kind of problem would you rather solve?
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">Pick one that resonates most:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {PROBLEM_OPTIONS.map((opt) => (
                        <div
                          key={opt.id}
                          onClick={() => setProblemSolving(`${opt.label} — ${opt.desc}`)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            problemSolving.includes(opt.label)
                              ? 'border-mainstay-700 bg-mainstay-50 text-mainstay-950 font-bold ring-2 ring-mainstay-700/20'
                              : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-700'
                          }`}
                        >
                          <div className="font-bold text-slate-900">{opt.label}</div>
                          <div className="text-slate-500 mt-0.5">{opt.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-mainstay-950 mb-1">
                      2. What would you like to get your hands on?
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">Select all that interest you:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {INTEREST_AREAS.map((interest) => (
                        <label
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                            selectedInterests.includes(interest)
                              ? 'border-mainstay-700 bg-mainstay-50 text-mainstay-950 font-bold'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                            selectedInterests.includes(interest)
                              ? 'bg-mainstay-700 border-mainstay-700 text-white'
                              : 'border-slate-300 bg-white'
                          }`}>
                            {selectedInterests.includes(interest) && <Check className="w-3 h-3" />}
                          </div>
                          <span>{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Ideal Day, Curiosity & Superpower */}
              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-sm font-bold text-mainstay-950 mb-1">
                      3. Pick your ideal co-op day
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">Which atmosphere fits you best?</p>
                    <div className="space-y-2">
                      {COOP_DAY_OPTIONS.map((day) => (
                        <div
                          key={day.id}
                          onClick={() => setIdealDay(`${day.title}: ${day.desc}`)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            idealDay.startsWith(day.title)
                              ? 'border-mainstay-700 bg-mainstay-50 text-mainstay-950 font-bold ring-2 ring-mainstay-700/20'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="font-bold text-slate-900">{day.title}</span> — {day.desc}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-mainstay-950 mb-1">
                      4. What's something you're curious about?
                    </h3>
                    <p className="text-xs text-slate-500 mb-2">One sentence. No wrong answers.</p>
                    <input
                      type="text"
                      value={curiosity}
                      onChange={(e) => setCuriosity(e.target.value)}
                      placeholder="“I've always wondered how industrial water treatment / mining automation works.”"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-mainstay-500/20 focus:border-mainstay-700"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-mainstay-950 mb-1">
                      5. What's your “I can figure this out” skill?
                    </h3>
                    <p className="text-xs text-slate-500 mb-2">
                      Tell us one thing you're surprisingly good at.
                    </p>
                    <input
                      type="text"
                      value={superpower}
                      onChange={(e) => setSuperpower(e.target.value)}
                      placeholder="e.g., Organizing chaos, Excel, Learning new software rapidly, Explaining complex ideas"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-mainstay-500/20 focus:border-mainstay-700"
                    />
                    <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px] text-slate-400">
                      <span>Ideas:</span>
                      {['Building things', 'Excel', 'Organizing chaos', 'Fixing computers', 'Talking to people', 'Making presentations'].map((pill) => (
                        <button
                          type="button"
                          key={pill}
                          onClick={() => setSuperpower(pill)}
                          className="px-2 py-0.5 bg-slate-100 hover:bg-mainstay-50 hover:text-mainstay-800 rounded text-slate-600 transition-colors"
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: The Practical Information & Resume */}
              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="text-xs font-bold uppercase tracking-wider text-mainstay-800 mb-2">
                    6. The Practical Information (Your Basics)
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-mainstay-700"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane.doe@usask.ca"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-mainstay-700"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">School / University</label>
                      <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        placeholder="University of Saskatchewan"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-mainstay-700"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Program / Major</label>
                      <input
                        type="text"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        placeholder="e.g. Computer Science, Mechanical Eng"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-mainstay-700"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Current Year</label>
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-mainstay-700"
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
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-mainstay-700"
                      >
                        <option>Summer 2027</option>
                        <option>Fall 2026</option>
                        <option>Winter 2027</option>
                        <option>Flexible</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Co-op Length</label>
                      <select
                        value={coopLength}
                        onChange={(e) => setCoopLength(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-mainstay-700"
                      >
                        <option>4 months</option>
                        <option>8 months</option>
                        <option>12 months</option>
                        <option>16 months</option>
                      </select>
                    </div>
                  </div>

                  {/* Resume upload link */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      7. Show us what you've done: Upload / Resume Link *
                    </label>
                    <p className="text-[11px] text-slate-500 mb-1.5">
                      Provide your Google Drive, LinkedIn, or portfolio link — we'll take it from here.
                    </p>
                    <div className="flex items-center gap-2">
                      <UploadCloud className="w-5 h-5 text-mainstay-700" />
                      <input
                        type="url"
                        required
                        value={resumeLink}
                        onChange={(e) => setResumeLink(e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile or drive link"
                        className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-mainstay-700"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Step Navigation Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-mainstay-700 hover:bg-mainstay-800 text-white text-xs font-bold rounded-xl shadow-md shadow-mainstay-700/20 transition-all"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-mainstay-700 hover:bg-mainstay-800 text-white text-xs font-bold rounded-xl shadow-md shadow-mainstay-700/20 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
