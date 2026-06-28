export default function AppLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      <style>{`
        @keyframes loading-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>

      {/* Single consolidated spinner: two rings + center mark */}
      <div className="relative h-20 w-20">
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#283B91] animate-spin"
          style={{ animationDuration: "1.1s" }}
        />
        <div
          className="absolute inset-2 rounded-full border-4 border-transparent border-t-[#FFCB08] animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-[#283B91]" />
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-bold tracking-tight text-[#283B91]">
        Asset Management System
      </h2>
      <p className="mt-1 text-sm text-gray-400">Loading your workspace…</p>

      <div className="mt-8 h-1.5 w-64 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full w-1/4 rounded-full bg-[#FFCB08]"
          style={{ animation: "loading-slide 1.6s linear infinite" }}
        />
      </div>
    </div>
  );
}