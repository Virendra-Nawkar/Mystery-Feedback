// 'use client'

// import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/react';
// import { useEffect, useState } from 'react';
// import { User } from 'next-auth';

// import * as React from "react"
// import { Moon, Sun } from "lucide-react"
// import { useTheme } from "next-themes"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Separator } from './ui/separator';


// function Navbar() {
//   const { data: session } = useSession();
//   const user: User = session?.user;

//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   // Avoid hydration mismatch
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const toggleTheme = () => {
//     setTheme(theme === 'dark' ? 'light' : 'dark');
//   };

//   return (
//     <nav className="p-4 md:p-4 shadow-md bg-white text-black dark:bg-gray-900 dark:text-white">
//       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
//         <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
//           Mystery Feedback
//         </Link>

//         <div className="flex items-center gap-3">
//           {session ? (
//             <>
//               <span className="mr-4">
//                 Welcome, {user?.username || user?.email}
//               </span>
//               <Button
//                 onClick={() => signOut()}
//                 className="w-full md:w-auto bg-slate-100 text-black dark:bg-white dark:text-black"
//                 variant="outline"
//               >
//                 Logout
//               </Button>
//             </>
//           ) : (
//             <>
//               <Link href="/sign-in">
//                 <Button
//                   className="w-full md:w-auto bg-slate-100 text-black dark:bg-white dark:text-black"
//                   variant="outline"
//                 >
//                   Login
//                 </Button>
//               </Link>

//               <Link href="/sign-up">
//                 <Button
//                   className="w-full md:w-auto bg-slate-100 text-black dark:bg-white dark:text-black"
//                   variant="outline"
//                 >
//                   Sign up
//                 </Button>
//               </Link>
//             </>
//           )}

//           <Button onClick={toggleTheme} variant="outline" size="icon">
//             {theme === 'dark' ? (
//               <Sun className="h-5 w-5" />
//             ) : (
//               <Moon className="h-5 w-5" />
//             )}
//           </Button>
//         </div>
//       </div>
//       <Separator className='mt-2'/>
//     </nav>
//   );
// }

// export default Navbar;


'use client'

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { User } from 'next-auth';

import { Moon, Sun } from "lucide-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Separator } from './ui/separator';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="p-4 shadow-md bg-white text-black dark:bg-gray-900 dark:text-white fixed w-full top-0 z-10 border-b-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold whitespace-nowrap">
          Mystery Feedback
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm whitespace-nowrap">
                Welcome, {user?.username || user?.email}
              </span>
              <Button
                onClick={() => signOut()}
                className="bg-slate-100 text-black dark:bg-white dark:text-black"
                variant="outline"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  className="bg-slate-100 text-black dark:bg-white dark:text-black"
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  className="bg-slate-100 text-black dark:bg-white dark:text-black"
                  variant="outline"
                >
                  Sign up
                </Button>
              </Link>
            </>
          )}
          <Button onClick={toggleTheme} variant="outline" size="icon">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <Button onClick={toggleTheme} variant="outline" size="icon">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black dark:text-white"
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4">
          {session ? (
            <>
              <span className="text-sm">
                Welcome, {user?.username || user?.email}
              </span>
              <Button
                onClick={() => {
                  signOut();
                  setMenuOpen(false);
                }}
                className="bg-slate-100 text-black dark:bg-white dark:text-black"
                variant="outline"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in" onClick={handleLinkClick}>
                <Button
                  className="bg-slate-100 text-black dark:bg-white dark:text-black w-full"
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
              <Link href="/sign-up" onClick={handleLinkClick}>
                <Button
                  className="bg-slate-100 text-black dark:bg-white dark:text-black w-full"
                  variant="outline"
                >
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;

