import Link from "next/link";

export function GNB() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-neon-cyan/30">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
        <Link
          href="/"
          className="text-lg font-bold text-neon-cyan neon-text"
        >
          Co-Founder
        </Link>
        <Link
          href="/survey"
          className="text-sm font-medium text-gray-300 hover:text-neon-pink transition-colors"
        >
          설문조사
        </Link>
      </div>
    </nav>
  );
}
