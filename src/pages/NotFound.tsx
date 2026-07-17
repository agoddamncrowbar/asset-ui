import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-110px)] items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md text-center">
        <img
          src="/images/logo.png"
          alt="USIU Asset Management System"
          className="mx-auto h-16 w-auto sm:h-20"
        />

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">
          Error 404
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          We couldn't locate this asset.
        </h1>

        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          We searched every department, checked the maintenance records, and
          even reviewed the audit trail—but the page you're looking for simply
          isn't here.
        </p>

        <p className="mt-3 text-sm text-slate-500">
          Don't worry. Your inventory is safe. Let's get you back to the{" "}
          <span className="font-semibold text-slate-700">
            USIU Asset Management System
          </span>
          .
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-yellow-400 px-6 py-3 text-sm font-semibold text-blue-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300 sm:w-auto"
        >
          Return to Dashboard
        </Link>

        <p className="mt-6 text-xs text-slate-400">
          If you entered the address manually, check for any spelling mistakes.
        </p>
      </div>
    </div>
  );
}