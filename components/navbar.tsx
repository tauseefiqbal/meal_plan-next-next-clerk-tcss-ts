"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <Image
            className="text-xl font-bold text-emerald-700 cursor-pointer"
            src="/logo.png"
            width={60}
            height={60}
            alt="Logo"
          />
        </Link>

        <div className="space-x-4 flex items-center">
          <Show when="signed-in">
            <Link
              href="/mealplan"
              className="text-gray-700 hover:text-emerald-500 transition-colors"
            >
              Mealplan
            </Link>
            <Link
              href="/profile"
              className="text-gray-700 hover:text-emerald-500 transition-colors"
            >
              Profile
            </Link>
            <UserButton afterSignOutUrl="/" />
          </Show>

          <Show when="signed-out">
            <Link
              href="/"
              className="text-gray-700 hover:text-emerald-500 transition-colors"
            >
              Home
            </Link>
            <SignInButton mode="modal">
              <button className="text-gray-700 hover:text-emerald-500 transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
        </div>
      </div>
    </nav>
  );
}
