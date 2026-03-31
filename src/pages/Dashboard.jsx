// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const res = await API.get("/leads", {
          params: { search, course },
        });
        setLeads(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [search, course]);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      await API.put(`/leads/${id}`, { status });
      const res = await API.get("/leads", {
        params: { search, course },
      });
      setLeads(res.data);
    } finally {
      setUpdatingId(null);
    }
  };

  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "new").length;
  const contactedLeads = leads.filter(
    (lead) => lead.status === "contacted",
  ).length;

  return (
    <div className="dashboard-shell min-h-screen bg-black text-white">
      <Navbar />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="dashboard-orb dashboard-orb-one" />
        <div className="dashboard-orb dashboard-orb-two" />
        <div className="dashboard-grid" />
      </div>

      <main className="mx-auto w-full max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-zinc-400">
              Overview
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Leads Dashboard
            </h1>
          </div>
          <p className="text-sm text-zinc-300/90">
            Monitor, filter, and update lead status in one place.
          </p>
        </div>

        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <article className="dashboard-card rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
              Total Leads
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {totalLeads}
            </p>
          </article>
          <article className="dashboard-card rounded-2xl border border-yellow-200/20 bg-yellow-200/5 px-4 py-4 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
              New
            </p>
            <p className="mt-2 text-2xl font-semibold text-yellow-100">
              {newLeads}
            </p>
          </article>
          <article className="dashboard-card rounded-2xl border border-emerald-200/20 bg-emerald-200/5 px-4 py-4 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
              Contacted
            </p>
            <p className="mt-2 text-2xl font-semibold text-emerald-100">
              {contactedLeads}
            </p>
          </article>
        </section>

        {/* Filters */}
        <section className="dashboard-card mb-5 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_220px]">
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
                    d="M21 21l-4.35-4.35m1.85-4.65a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                value={search}
                placeholder="Search by name or email"
                disabled={loading}
                className="w-full rounded-xl border border-white/15 bg-black/35 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-white/55 focus:ring-2 focus:ring-white/15"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative">
              <select
                value={course}
                disabled={loading}
                className="w-full cursor-pointer appearance-none rounded-xl border border-white/15 bg-black/35 py-2.5 pl-4 pr-10 text-sm text-white outline-none transition-all focus:border-white/55 focus:ring-2 focus:ring-white/15"
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="" className="bg-black">
                  All Courses
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
        </section>

        {/* Table */}
        <section className="dashboard-card overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm text-zinc-100">
              <thead className="bg-white/10 text-xs uppercase tracking-[0.15em] text-zinc-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      className="px-4 py-8 text-center text-zinc-400"
                      colSpan={6}
                    >
                      Loading leads...
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td
                      className="px-4 py-8 text-center text-zinc-400"
                      colSpan={6}
                    >
                      No leads found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-t border-white/10 transition-colors hover:bg-white/5"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-white">
                        {lead.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-zinc-300">
                        {lead.email}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-zinc-300">
                        {lead.phone}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-zinc-300">
                        {lead.course || "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                            lead.status === "new"
                              ? "border border-yellow-200/30 bg-yellow-200/10 text-yellow-100"
                              : "border border-emerald-200/30 bg-emerald-200/10 text-emerald-100"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-3">
                        {lead.status === "new" ? (
                          <button
                            disabled={updatingId === lead.id}
                            onClick={() => updateStatus(lead.id, "contacted")}
                            className="rounded-lg border border-white/25 bg-white/90 px-3 py-1.5 text-xs font-semibold text-black transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {updatingId === lead.id
                              ? "Updating..."
                              : "Mark Contacted"}
                          </button>
                        ) : (
                          <span className="text-xs text-zinc-500">Updated</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
