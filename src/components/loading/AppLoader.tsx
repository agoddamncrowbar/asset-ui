export default function AppLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      {/* Logo */}
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-4 border-[#FFCB08] border-t-[#283B91] animate-spin" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-[#283B91]" />
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-[#283B91]">
        Asset Management System
      </h2>

      <div className="relative h-24 w-24">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#283B91]" />

        <div
            className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-t-[#FFCB08]"
            style={{
            animationDirection: "reverse",
            animationDuration: "1.5s",
            }}
        />
        </div>

      <div className="mt-8 h-1 w-64 overflow-hidden rounded bg-gray-200">
        <div className="h-full w-1/3 animate-pulse bg-[#FFCB08]" />
      </div>
    </div>
  );
}