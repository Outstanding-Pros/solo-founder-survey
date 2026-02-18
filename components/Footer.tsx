import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neon-cyan/20 bg-black/95">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Company Info */}
          <div className="space-y-2">
            <p className="text-lg font-bold text-neon-cyan neon-text">
              Outstanding Pros
            </p>
            <p className="text-sm text-gray-400">
              문의{" "}
              <a
                href="mailto:tmddnjs1411@gmail.com"
                className="text-gray-300 hover:text-neon-cyan transition-colors"
              >
                tmddnjs1411@gmail.com
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-neon-cyan transition-colors"
            >
              개인정보처리방침
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Outstanding Pros. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
