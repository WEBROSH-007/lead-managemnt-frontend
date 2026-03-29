import { useState } from "react";
import API from "../services/api";

export default function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    college: "",
    year: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setForm({ ...form, phone: digitsOnly });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone) {
      return "All required fields must be filled";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "Invalid email format";
    }
    if (!/^\d{10}$/.test(form.phone)) {
      return "Phone number must be exactly 10 digits";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setMsg({ type: "error", text: error });
      return;
    }
    try {
      setLoading(true);
      await API.post("/leads", form);
      setMsg({ type: "success", text: "Successfully submitted!" });
      setForm({
        name: "",
        email: "",
        phone: "",
        course: "",
        college: "",
        year: "",
      });
    } catch (err) {
      if (err.response?.data?.msg === "Email already exists") {
        setMsg({ type: "error", text: "This email is already registered" });
      } else {
        setMsg({ type: "error", text: "Something went wrong" });
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-black/35 px-4 py-2.5 text-[13px] text-white placeholder-zinc-500 outline-none transition-all focus:border-white/55 focus:ring-2 focus:ring-white/15 sm:py-3 sm:text-sm";

  const labelClass =
    "mb-1 block text-[11px] font-semibold uppercase tracking-widest text-zinc-300/85 sm:text-xs";

  return (
    <div className="lead-shell relative h-[100dvh] overflow-hidden bg-black px-3 py-3 sm:px-4 sm:py-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="lead-orb lead-orb-one" />
        <div className="lead-orb lead-orb-two" />
        <div className="lead-grid" />
      </div>

      <div className="relative mx-auto flex h-full w-full max-w-xl items-center justify-center">
        <div className="lead-card lead-fit w-full max-h-full overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl sm:p-6">
          {/* Header */}
          <div className="mb-4 flex justify-center"></div>
          <div className="mb-4 text-center sm:mb-5">
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Enroll Now
            </h2>
            <p className="mt-1 text-xs text-zinc-300/90 sm:text-sm">
              Fill in your details to get started
            </p>
          </div>

          {/* Alert */}
          {msg.text && (
            <div
              className={`mb-4 flex items-center gap-2 rounded-xl border px-3 py-2 text-xs sm:text-sm ${
                msg.type === "success"
                  ? "bg-emerald-300/10 border-emerald-200/35 text-emerald-100"
                  : "bg-red-400/10 border-red-300/35 text-red-200"
              }`}
            >
              {msg.type === "success" ? (
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  />
                </svg>
              )}
              {msg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Row: Name + Phone */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="group">
                <label className={labelClass}>
                  Full Name <span className="text-zinc-100">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div className="group">
                <label className={labelClass}>
                  Phone <span className="text-zinc-100">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="phone"
                    placeholder="9876543210"
                    value={form.phone}
                    onChange={handleChange}
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className={labelClass}>
                Email <span className="text-zinc-100">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            {/* Course */}
            <div className="group">
              <label className={labelClass}>Course</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </span>
                <select
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  className={`${inputClass} pl-10 appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-black">
                    Select Course
                  </option>
                  <option value="Web Development" className="bg-black">
                    Web Development
                  </option>
                  <option value="Data Science" className="bg-black">
                    Data Science
                  </option>
                  <option value="AI/ML" className="bg-black">
                    AI / ML
                  </option>
                </select>
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Row: College + Year */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="group">
                <label className={labelClass}>College</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="college"
                    placeholder="Your college"
                    value={form.college}
                    onChange={handleChange}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div className="group">
                <label className={labelClass}>Year</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <select
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    className={`${inputClass} pl-10 appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-black">
                      Select Year
                    </option>
                    <option value="1st Year" className="bg-black">
                      1st Year
                    </option>
                    <option value="2nd Year" className="bg-black">
                      2nd Year
                    </option>
                    <option value="3rd Year" className="bg-black">
                      3rd Year
                    </option>
                    <option value="4th Year" className="bg-black">
                      4th Year
                    </option>
                  </select>
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/15 pt-1" />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/85 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 active:scale-95 sm:py-3"
            >
              {loading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>

            <p className="pt-1 text-center text-[11px] text-zinc-400/90 sm:text-xs">
              We will contact you within 24 hours
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
