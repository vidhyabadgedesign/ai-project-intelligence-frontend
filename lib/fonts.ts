import localFont from "next/font/local";
import { Poppins, DM_Sans } from "next/font/google";

// Gilroy — primary typeface used throughout the Figma file.
export const gilroy = localFont({
  src: [
    { path: "../public/fonts/gilroy/Gilroy-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/gilroy/Gilroy-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/gilroy/Gilroy-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/gilroy/Gilroy-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

// Poppins appears in the Figma file itself (date filter, pagination) — kept as
// its own token rather than folded into the Gilroy stack.
export const poppins = Poppins({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// The Account Selection screen reproduces Google's own account chooser UI,
// which is set in "Google Sans" — an internal Google-only font with no public
// license. DM Sans is the actual typeface behind ~95% of that UI's text nodes
// in the Figma file itself, so it's used here rather than substituting
// something unrelated. Scoped to that one screen, not the app's --font-sans.
export const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});
