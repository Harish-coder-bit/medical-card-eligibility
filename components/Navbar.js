import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#2c3e50] py-3 border-b-2 border-[#1a252f]">
      <div className="max-w-[960px] mx-auto px-5 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold no-underline">
          MedCard Checker
        </Link>
        <div className="flex gap-5">
          <Link href="/" className="text-gray-200 no-underline text-sm hover:underline">
            Home
          </Link>
          <Link href="/admin/submissions" className="text-gray-200 no-underline text-sm hover:underline">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
