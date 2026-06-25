export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blue-700 text-yellow-300 py-1">
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between text-xs">
        <span>
          Copyright {year}
        </span>

        <span>
          USIU Asset Management System
        </span>

        <span>
          Developed by Daniel Ndambuki
        </span>
      </div>
    </footer>
  );
}