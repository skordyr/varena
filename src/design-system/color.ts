import type { Tokens } from "../tokens";

import { createTokens } from "../tokens";

export type PaletteSystem = {
  "color-black": string;
  "color-white": string;

  "color-red-50": string;
  "color-red-100": string;
  "color-red-200": string;
  "color-red-300": string;
  "color-red-400": string;
  "color-red-500": string;
  "color-red-600": string;
  "color-red-700": string;
  "color-red-800": string;
  "color-red-900": string;
  "color-red-950": string;

  "color-orange-50": string;
  "color-orange-100": string;
  "color-orange-200": string;
  "color-orange-300": string;
  "color-orange-400": string;
  "color-orange-500": string;
  "color-orange-600": string;
  "color-orange-700": string;
  "color-orange-800": string;
  "color-orange-900": string;
  "color-orange-950": string;

  "color-amber-50": string;
  "color-amber-100": string;
  "color-amber-200": string;
  "color-amber-300": string;
  "color-amber-400": string;
  "color-amber-500": string;
  "color-amber-600": string;
  "color-amber-700": string;
  "color-amber-800": string;
  "color-amber-900": string;
  "color-amber-950": string;

  "color-yellow-50": string;
  "color-yellow-100": string;
  "color-yellow-200": string;
  "color-yellow-300": string;
  "color-yellow-400": string;
  "color-yellow-500": string;
  "color-yellow-600": string;
  "color-yellow-700": string;
  "color-yellow-800": string;
  "color-yellow-900": string;
  "color-yellow-950": string;

  "color-lime-50": string;
  "color-lime-100": string;
  "color-lime-200": string;
  "color-lime-300": string;
  "color-lime-400": string;
  "color-lime-500": string;
  "color-lime-600": string;
  "color-lime-700": string;
  "color-lime-800": string;
  "color-lime-900": string;
  "color-lime-950": string;

  "color-green-50": string;
  "color-green-100": string;
  "color-green-200": string;
  "color-green-300": string;
  "color-green-400": string;
  "color-green-500": string;
  "color-green-600": string;
  "color-green-700": string;
  "color-green-800": string;
  "color-green-900": string;
  "color-green-950": string;

  "color-emerald-50": string;
  "color-emerald-100": string;
  "color-emerald-200": string;
  "color-emerald-300": string;
  "color-emerald-400": string;
  "color-emerald-500": string;
  "color-emerald-600": string;
  "color-emerald-700": string;
  "color-emerald-800": string;
  "color-emerald-900": string;
  "color-emerald-950": string;

  "color-teal-50": string;
  "color-teal-100": string;
  "color-teal-200": string;
  "color-teal-300": string;
  "color-teal-400": string;
  "color-teal-500": string;
  "color-teal-600": string;
  "color-teal-700": string;
  "color-teal-800": string;
  "color-teal-900": string;
  "color-teal-950": string;

  "color-cyan-50": string;
  "color-cyan-100": string;
  "color-cyan-200": string;
  "color-cyan-300": string;
  "color-cyan-400": string;
  "color-cyan-500": string;
  "color-cyan-600": string;
  "color-cyan-700": string;
  "color-cyan-800": string;
  "color-cyan-900": string;
  "color-cyan-950": string;

  "color-sky-50": string;
  "color-sky-100": string;
  "color-sky-200": string;
  "color-sky-300": string;
  "color-sky-400": string;
  "color-sky-500": string;
  "color-sky-600": string;
  "color-sky-700": string;
  "color-sky-800": string;
  "color-sky-900": string;
  "color-sky-950": string;

  "color-blue-50": string;
  "color-blue-100": string;
  "color-blue-200": string;
  "color-blue-300": string;
  "color-blue-400": string;
  "color-blue-500": string;
  "color-blue-600": string;
  "color-blue-700": string;
  "color-blue-800": string;
  "color-blue-900": string;
  "color-blue-950": string;

  "color-indigo-50": string;
  "color-indigo-100": string;
  "color-indigo-200": string;
  "color-indigo-300": string;
  "color-indigo-400": string;
  "color-indigo-500": string;
  "color-indigo-600": string;
  "color-indigo-700": string;
  "color-indigo-800": string;
  "color-indigo-900": string;
  "color-indigo-950": string;

  "color-violet-50": string;
  "color-violet-100": string;
  "color-violet-200": string;
  "color-violet-300": string;
  "color-violet-400": string;
  "color-violet-500": string;
  "color-violet-600": string;
  "color-violet-700": string;
  "color-violet-800": string;
  "color-violet-900": string;
  "color-violet-950": string;

  "color-purple-50": string;
  "color-purple-100": string;
  "color-purple-200": string;
  "color-purple-300": string;
  "color-purple-400": string;
  "color-purple-500": string;
  "color-purple-600": string;
  "color-purple-700": string;
  "color-purple-800": string;
  "color-purple-900": string;
  "color-purple-950": string;

  "color-fuchsia-50": string;
  "color-fuchsia-100": string;
  "color-fuchsia-200": string;
  "color-fuchsia-300": string;
  "color-fuchsia-400": string;
  "color-fuchsia-500": string;
  "color-fuchsia-600": string;
  "color-fuchsia-700": string;
  "color-fuchsia-800": string;
  "color-fuchsia-900": string;
  "color-fuchsia-950": string;

  "color-pink-50": string;
  "color-pink-100": string;
  "color-pink-200": string;
  "color-pink-300": string;
  "color-pink-400": string;
  "color-pink-500": string;
  "color-pink-600": string;
  "color-pink-700": string;
  "color-pink-800": string;
  "color-pink-900": string;
  "color-pink-950": string;

  "color-rose-50": string;
  "color-rose-100": string;
  "color-rose-200": string;
  "color-rose-300": string;
  "color-rose-400": string;
  "color-rose-500": string;
  "color-rose-600": string;
  "color-rose-700": string;
  "color-rose-800": string;
  "color-rose-900": string;
  "color-rose-950": string;

  "color-slate-50": string;
  "color-slate-100": string;
  "color-slate-200": string;
  "color-slate-300": string;
  "color-slate-400": string;
  "color-slate-500": string;
  "color-slate-600": string;
  "color-slate-700": string;
  "color-slate-800": string;
  "color-slate-900": string;
  "color-slate-950": string;

  "color-gray-50": string;
  "color-gray-100": string;
  "color-gray-200": string;
  "color-gray-300": string;
  "color-gray-400": string;
  "color-gray-500": string;
  "color-gray-600": string;
  "color-gray-700": string;
  "color-gray-800": string;
  "color-gray-900": string;
  "color-gray-950": string;

  "color-zinc-50": string;
  "color-zinc-100": string;
  "color-zinc-200": string;
  "color-zinc-300": string;
  "color-zinc-400": string;
  "color-zinc-500": string;
  "color-zinc-600": string;
  "color-zinc-700": string;
  "color-zinc-800": string;
  "color-zinc-900": string;
  "color-zinc-950": string;

  "color-neutral-50": string;
  "color-neutral-100": string;
  "color-neutral-200": string;
  "color-neutral-300": string;
  "color-neutral-400": string;
  "color-neutral-500": string;
  "color-neutral-600": string;
  "color-neutral-700": string;
  "color-neutral-800": string;
  "color-neutral-900": string;
  "color-neutral-950": string;

  "color-stone-50": string;
  "color-stone-100": string;
  "color-stone-200": string;
  "color-stone-300": string;
  "color-stone-400": string;
  "color-stone-500": string;
  "color-stone-600": string;
  "color-stone-700": string;
  "color-stone-800": string;
  "color-stone-900": string;
  "color-stone-950": string;

  "color-mauve-50": string;
  "color-mauve-100": string;
  "color-mauve-200": string;
  "color-mauve-300": string;
  "color-mauve-400": string;
  "color-mauve-500": string;
  "color-mauve-600": string;
  "color-mauve-700": string;
  "color-mauve-800": string;
  "color-mauve-900": string;
  "color-mauve-950": string;

  "color-olive-50": string;
  "color-olive-100": string;
  "color-olive-200": string;
  "color-olive-300": string;
  "color-olive-400": string;
  "color-olive-500": string;
  "color-olive-600": string;
  "color-olive-700": string;
  "color-olive-800": string;
  "color-olive-900": string;
  "color-olive-950": string;

  "color-mist-50": string;
  "color-mist-100": string;
  "color-mist-200": string;
  "color-mist-300": string;
  "color-mist-400": string;
  "color-mist-500": string;
  "color-mist-600": string;
  "color-mist-700": string;
  "color-mist-800": string;
  "color-mist-900": string;
  "color-mist-950": string;

  "color-taupe-50": string;
  "color-taupe-100": string;
  "color-taupe-200": string;
  "color-taupe-300": string;
  "color-taupe-400": string;
  "color-taupe-500": string;
  "color-taupe-600": string;
  "color-taupe-700": string;
  "color-taupe-800": string;
  "color-taupe-900": string;
  "color-taupe-950": string;
};

export const PaletteTokens: Tokens<PaletteSystem> = /* @__PURE__ */ createTokens({
  "color-black": "0 0% 0%", //                    :hsl(0 0% 0%)
  "color-white": "0 0% 100%", //                  :hsl(0 0% 100%)

  "color-red-50": "0 88.21% 97.32%", //           :hsl(0 88.21% 97.32%)
  "color-red-100": "359.98 98.78% 94.25%", //     :hsl(359.98 98.78% 94.25%)
  "color-red-200": "359.95 100% 89.49%", //       :hsl(359.95 100% 89.49%)
  "color-red-300": "359.72 100% 81.73%", //       :hsl(359.72 100% 81.73%)
  "color-red-400": "358.75 100% 69.56%", //       :hsla(358, 100%, 70%, 0.09)
  "color-red-500": "356.95 95.9% 57.72%", //      :hsl(356.95 95.9% 57.72%)
  "color-red-600": "357.21 100% 45.32%", //       :hsl(357.21 100% 45.32%)
  "color-red-700": "357.72 100% 37.84%", //       :hsl(357.72 100% 37.84%)
  "color-red-800": "355.94 91.15% 32.55%", //     :hsl(355.94 91.15% 32.55%)
  "color-red-900": "358.8 69.3% 30.07%", //       :hsl(358.8 69.3% 30.07%)
  "color-red-950": "359.29 79.42% 15.35%", //     :hsl(359.29 79.42% 15.35%)

  "color-orange-50": "33.75 100% 96.46%", //      :hsl(33.75 100% 96.46%)
  "color-orange-100": "34.51 100% 91.63%", //     :hsl(34.51 100% 91.63%)
  "color-orange-200": "32.22 100% 82.84%", //     :hsl(32.22 100% 82.84%)
  "color-orange-300": "31.57 100% 70.7%", //      :hsl(31.57 100% 70.7%)
  "color-orange-400": "31.83 100% 50.69%", //     :hsl(31.83 100% 50.69%)
  "color-orange-500": "24.64 100% 50%", //        :hsl(24.64 100% 50%)
  "color-orange-600": "18 100% 48.04%", //        :hsl(18 100% 48.04%)
  "color-orange-700": "15.7 100% 39.59%", //      :hsl(15.7 100% 39.59%)
  "color-orange-800": "16.97 100% 31.22%", //     :hsl(16.97 100% 31.22%)
  "color-orange-900": "15.99 83.12% 27.04%", //   :hsl(15.99 83.12% 27.04%)
  "color-orange-950": "12.88 84.81% 14.42%", //   :hsl(12.88 84.81% 14.42%)

  "color-amber-50": "48.38 100% 96%", //          :hsl(48.38 100% 96%)
  "color-amber-100": "47.99 97.34% 88.73%", //    :hsl(47.99 97.34% 88.73%)
  "color-amber-200": "48.02 98.23% 75.9%", //     :hsl(48.02 98.23% 75.9%)
  "color-amber-300": "46.99 100% 59.38%", //      :hsl(46.99 100% 59.38%)
  "color-amber-400": "43.65 100% 50%", //         :hsl(43.65 100% 50%)
  "color-amber-500": "36.49 100% 49.6%", //       :hsl(36.49 100% 49.6%)
  "color-amber-600": "30.1 100% 44.19%", //       :hsl(30.1 100% 44.19%)
  "color-amber-700": "24.68 100% 36.59%", //      :hsl(24.68 100% 36.59%)
  "color-amber-800": "23.76 100% 29.52%", //      :hsl(23.76 100% 29.52%)
  "color-amber-900": "23.04 90.17% 25.26%", //    :hsl(23.04 90.17% 25.26%)
  "color-amber-950": "20.9 96.65% 13.94%", //     :hsl(20.9 96.65% 13.94%)

  "color-yellow-50": "54.55 90.61% 95.28%", //    :hsl(54.55 90.61% 95.28%)
  "color-yellow-100": "54.89 97.52% 87.84%", //   :hsl(54.89 97.52% 87.84%)
  "color-yellow-200": "52.74 99.45% 76.08%", //   :hsl(52.74 99.45% 76.08%)
  "color-yellow-300": "51.51 100% 56.29%", //     :hsl(51.51 100% 56.29%)
  "color-yellow-400": "47.61 100% 49.38%", //     :hsl(47.61 100% 49.38%)
  "color-yellow-500": "44.37 100% 46.93%", //     :hsl(44.37 100% 46.93%)
  "color-yellow-600": "38.87 100% 40.88%", //     :hsl(38.87 100% 40.88%)
  "color-yellow-700": "34.39 100% 32.55%", //     :hsl(34.39 100% 32.55%)
  "color-yellow-800": "32.77 100% 26.8%", //      :hsl(32.77 100% 26.8%)
  "color-yellow-900": "29.52 83.35% 24.57%", //   :hsl(29.52 83.35% 24.57%)
  "color-yellow-950": "26.16 87.52% 13.96%", //   :hsl(26.16 87.52% 13.96%)

  "color-lime-50": "78.26 92.84% 95.14%", //      :hsl(78.26 92.84% 95.14%)
  "color-lime-100": "79.56 89.72% 89.11%", //     :hsl(79.56 89.72% 89.11%)
  "color-lime-200": "80.7 89.71% 78.91%", //      :hsl(80.7 89.71% 78.91%)
  "color-lime-300": "80.92 87.66% 63.65%", //     :hsl(80.92 87.66% 63.65%)
  "color-lime-400": "79.91 100% 45.08%", //       :hsl(79.91 100% 45.08%)
  "color-lime-500": "83.9 100% 40.5%", //         :hsl(83.9 100% 40.5%)
  "color-lime-600": "85.83 100% 32.37%", //       :hsl(85.83 100% 32.37%)
  "color-lime-700": "85.23 100% 24.58%", //       :hsl(85.23 100% 24.58%)
  "color-lime-800": "83.32 100% 19.4%", //        :hsl(83.32 100% 19.4%)
  "color-lime-900": "86.52 71.11% 19.12%", //     :hsl(86.52 71.11% 19.12%)
  "color-lime-950": "88.95 88.62% 9.61%", //      :hsl(88.95 88.62% 9.61%)

  "color-green-50": "138.46 76.51% 96.68%", //    :hsl(138.46 76.51% 96.68%)
  "color-green-100": "140.65 84.38% 92.45%", //   :hsl(140.65 84.38% 92.45%)
  "color-green-200": "141.14 81.07% 84.82%", //   :hsl(141.14 81.07% 84.82%)
  "color-green-300": "142.66 81.25% 71.39%", //   :hsl(142.66 81.25% 71.39%)
  "color-green-400": "150.06 95.56% 44.76%", //   :hsl(150.06 95.56% 44.76%)
  "color-green-500": "144.06 100% 39.36%", //     :hsl(144.06 100% 39.36%)
  "color-green-600": "142.29 100% 32.57%", //     :hsl(142.29 100% 32.57%)
  "color-green-700": "144.68 100% 25.5%", //      :hsl(144.68 100% 25.5%)
  "color-green-800": "147.72 97.15% 20.36%", //   :hsl(147.72 97.15% 20.36%)
  "color-green-900": "145.73 73.08% 18.99%", //   :hsl(145.73 73.08% 18.99%)
  "color-green-950": "145.39 87.57% 9.65%", //    :hsl(145.39 87.57% 9.65%)

  "color-emerald-50": "151.78 80.95% 95.82%", //  :hsl(151.78 80.95% 95.82%)
  "color-emerald-100": "149.32 81.17% 89.84%", // :hsl(149.32 81.17% 89.84%)
  "color-emerald-200": "152.54 77.89% 80.02%", // :hsl(152.54 77.89% 80.02%)
  "color-emerald-300": "157.3 76.25% 64.25%", //  :hsl(157.3 76.25% 64.25%)
  "color-emerald-400": "161.25 100% 41.63%", //   :hsl(161.25 100% 41.63%)
  "color-emerald-500": "159.74 100% 36.94%", //   :hsl(159.74 100% 36.94%)
  "color-emerald-600": "159.97 100% 29.95%", //   :hsl(159.97 100% 29.95%)
  "color-emerald-700": "161.85 100% 23.91%", //   :hsl(161.85 100% 23.91%)
  "color-emerald-800": "162.98 100% 18.89%", //   :hsl(162.98 100% 18.89%)
  "color-emerald-900": "164.76 100% 15.41%", //   :hsl(164.76 100% 15.41%)
  "color-emerald-950": "165.88 100% 8.68%", //    :hsl(165.88 100% 8.68%)

  "color-teal-50": "166.15 77.06% 96.74%", //     :hsl(166.15 77.06% 96.74%)
  "color-teal-100": "167.27 86.98% 89.13%", //    :hsl(167.27 86.98% 89.13%)
  "color-teal-200": "168.51 85.39% 77.72%", //    :hsl(168.51 85.39% 77.72%)
  "color-teal-300": "171.35 81.79% 60.15%", //    :hsl(171.35 81.79% 60.15%)
  "color-teal-400": "173.4 100% 41.76%", //       :hsl(173.4 100% 41.76%)
  "color-teal-500": "173.58 100% 36.67%", //      :hsl(173.58 100% 36.67%)
  "color-teal-600": "174.71 100% 29.46%", //      :hsl(174.71 100% 29.46%)
  "color-teal-700": "175.65 100% 23.45%", //      :hsl(175.65 100% 23.45%)
  "color-teal-800": "176.62 100% 18.66%", //      :hsl(176.62 100% 18.66%)
  "color-teal-900": "176.3 76.01% 17.51%", //     :hsl(176.3 76.01% 17.51%)
  "color-teal-950": "178.66 91.58% 9.64%", //     :hsl(178.66 91.58% 9.64%)

  "color-cyan-50": "183.16 99.92% 96.25%", //     :hsl(183.16 99.92% 96.25%)
  "color-cyan-100": "185.11 96.43% 90.29%", //    :hsl(185.11 96.43% 90.29%)
  "color-cyan-200": "186.2 95.77% 81.44%", //     :hsl(186.2 95.77% 81.44%)
  "color-cyan-300": "186.71 97.47% 65.9%", //     :hsl(186.71 97.47% 65.9%)
  "color-cyan-400": "187.8 100% 47.55%", //       :hsl(187.8 100% 47.55%)
  "color-cyan-500": "189.48 100% 42.87%", //      :hsl(189.48 100% 42.87%)
  "color-cyan-600": "192.32 100% 36.13%", //      :hsl(192.32 100% 36.13%)
  "color-cyan-700": "192.78 100% 29.16%", //      :hsl(192.78 100% 29.16%)
  "color-cyan-800": "192.74 100% 23.56%", //      :hsl(192.74 100% 23.56%)
  "color-cyan-900": "195.82 72.14% 22.87%", //    :hsl(195.82 72.14% 22.87%)
  "color-cyan-950": "196.69 85.44% 14.55%", //    :hsl(196.69 85.44% 14.55%)

  "color-sky-50": "203.34 100% 96.99%", //        :hsl(203.34 100% 96.99%)
  "color-sky-100": "203.99 96.54% 93.67%", //     :hsl(203.99 96.54% 93.67%)
  "color-sky-200": "200.57 97.87% 85.94%", //     :hsl(200.57 97.87% 85.94%)
  "color-sky-300": "198.47 100% 72.66%", //       :hsl(198.47 100% 72.66%)
  "color-sky-400": "195.82 100% 50%", //          :hsl(195.82 100% 50%)
  "color-sky-500": "199.27 100% 47.86%", //       :hsl(199.27 100% 47.86%)
  "color-sky-600": "202.08 100% 40.99%", //       :hsl(202.08 100% 40.99%)
  "color-sky-700": "202.6 100% 33.01%", //        :hsl(202.6 100% 33.01%)
  "color-sky-800": "201.21 100% 26.99%", //       :hsl(201.21 100% 26.99%)
  "color-sky-900": "200.84 96.98% 22.39%", //     :hsl(200.84 96.98% 22.39%)
  "color-sky-950": "203.63 87.23% 15.52%", //     :hsl(203.63 87.23% 15.52%)

  "color-blue-50": "213.75 96.48% 96.79%", //     :hsl(213.75 96.48% 96.79%)
  "color-blue-100": "214.28 96.22% 92.78%", //    :hsl(214.28 96.22% 92.78%)
  "color-blue-200": "213.27 100% 87.25%", //      :hsl(213.27 100% 87.25%)
  "color-blue-300": "210.69 100% 77.83%", //      :hsl(210.69 100% 77.83%)
  "color-blue-400": "211.96 100% 65.79%", //      :hsl(211.96 100% 65.79%)
  "color-blue-500": "216.26 100% 58.47%", //      :hsl(216.26 100% 58.47%)
  "color-blue-600": "221.34 97.06% 53.5%", //     :hsl(221.34 97.06% 53.5%)
  "color-blue-700": "225.35 84.1% 48.98%", //     :hsl(225.35 84.1% 48.98%)
  "color-blue-800": "227.1 75.74% 41.14%", //     :hsl(227.1 75.74% 41.14%)
  "color-blue-900": "224.86 67.28% 33.33%", //    :hsl(224.86 67.28% 33.33%)
  "color-blue-950": "226.51 58.74% 21.15%", //    :hsl(226.51 58.74% 21.15%)

  "color-indigo-50": "225.82 100% 96.67%", //     :hsl(225.82 100% 96.67%)
  "color-indigo-100": "226.28 100% 93.9%", //     :hsl(226.28 100% 93.9%)
  "color-indigo-200": "227.86 100% 88.92%", //    :hsl(227.86 100% 88.92%)
  "color-indigo-300": "229.52 100% 81.96%", //    :hsl(229.52 100% 81.96%)
  "color-indigo-400": "235.47 100% 74.39%", //    :hsl(235.47 100% 74.39%)
  "color-indigo-500": "240.98 100% 68.59%", //    :hsl(240.98 100% 68.59%)
  "color-indigo-600": "246.99 91.66% 59.53%", //  :hsl(246.99 91.66% 59.53%)
  "color-indigo-700": "247.88 68.29% 51.07%", //  :hsl(247.88 68.29% 51.07%)
  "color-indigo-800": "246.14 60.99% 41.85%", //  :hsl(246.14 60.99% 41.85%)
  "color-indigo-900": "243.26 50.34% 34.77%", //  :hsl(243.26 50.34% 34.77%)
  "color-indigo-950": "244.4 49.1% 20.16%", //    :hsl(244.4 49.1% 20.16%)

  "color-violet-50": "250 98.58% 97.62%", //      :hsl(250 98.58% 97.62%)
  "color-violet-100": "251.44 93.48% 95.5%", //   :hsl(251.44 93.48% 95.5%)
  "color-violet-200": "250.61 100% 91.89%", //    :hsl(250.61 100% 91.89%)
  "color-violet-300": "253.4 100% 85.2%", //      :hsl(253.4 100% 85.2%)
  "color-violet-400": "256.85 100% 75.85%", //    :hsl(256.85 100% 75.85%)
  "color-violet-500": "260.92 100% 65.91%", //    :hsl(260.92 100% 65.91%)
  "color-violet-600": "265.48 99.08% 56.49%", //  :hsl(265.48 99.08% 56.49%)
  "color-violet-700": "268 93.3% 46.89%", //      :hsl(268 93.3% 46.89%)
  "color-violet-800": "266.64 86.27% 40.44%", //  :hsl(266.64 86.27% 40.44%)
  "color-violet-900": "264.88 74.27% 34.64%", //  :hsl(264.88 74.27% 34.64%)
  "color-violet-950": "262.22 77.74% 22.86%", //  :hsl(262.22 77.74% 22.86%)

  "color-purple-50": "270 98.85% 98.04%", //      :hsl(270 98.85% 98.04%)
  "color-purple-100": "268.7 99.95% 95.45%", //   :hsl(268.7 99.95% 95.45%)
  "color-purple-200": "269.45 100% 91.65%", //    :hsl(269.45 100% 91.65%)
  "color-purple-300": "271.09 100% 84.89%", //    :hsl(271.09 100% 84.89%)
  "color-purple-400": "272.27 100% 73.99%", //    :hsl(272.27 100% 73.99%)
  "color-purple-500": "273.31 100% 63.8%", //     :hsl(273.31 100% 63.8%)
  "color-purple-600": "274.91 96.1% 52.15%", //   :hsl(274.91 96.1% 52.15%)
  "color-purple-700": "275.69 100% 42.86%", //    :hsl(275.69 100% 42.86%)
  "color-purple-800": "274.93 82.4% 37.87%", //   :hsl(274.93 82.4% 37.87%)
  "color-purple-900": "274.52 72.39% 31.62%", //  :hsl(274.52 72.39% 31.62%)
  "color-purple-950": "274.32 94.3% 20.66%", //   :hsl(274.32 94.3% 20.66%)

  "color-fuchsia-50": "289.09 95.95% 97.79%", //  :hsl(289.09 95.95% 97.79%)
  "color-fuchsia-100": "287.85 100% 95.45%", //   :hsl(287.85 100% 95.45%)
  "color-fuchsia-200": "288.42 100% 90.67%", //   :hsl(288.42 100% 90.67%)
  "color-fuchsia-300": "292.14 100% 82.86%", //   :hsl(292.14 100% 82.86%)
  "color-fuchsia-400": "292.78 100% 70.88%", //   :hsl(292.78 100% 70.88%)
  "color-fuchsia-500": "292.61 96.35% 57.51%", // :hsl(292.61 96.35% 57.51%)
  "color-fuchsia-600": "293.95 100% 43.58%", //   :hsl(293.95 100% 43.58%)
  "color-fuchsia-700": "295.03 100% 35.9%", //    :hsl(295.03 100% 35.9%)
  "color-fuchsia-800": "295.8 98.24% 29.35%", //  :hsl(295.8 98.24% 29.35%)
  "color-fuchsia-900": "296.7 72.35% 27.25%", //  :hsl(296.7 72.35% 27.25%)
  "color-fuchsia-950": "296.75 99.06% 15.6%", //  :hsl(296.75 99.06% 15.6%)

  "color-pink-50": "327.28 71.09% 97%", //        :hsl(327.28 71.09% 97%)
  "color-pink-100": "325.7 78.63% 94.7%", //      :hsl(325.7 78.63% 94.7%)
  "color-pink-200": "325.85 87.87% 89.84%", //    :hsl(325.85 87.87% 89.84%)
  "color-pink-300": "327.09 96.71% 82.03%", //    :hsl(327.09 96.71% 82.03%)
  "color-pink-400": "327.47 95.38% 68.88%", //    :hsl(327.47 95.38% 68.88%)
  "color-pink-500": "328.25 91.82% 58.2%", //     :hsl(328.25 91.82% 58.2%)
  "color-pink-600": "329.15 100% 45.07%", //      :hsl(329.15 100% 45.07%)
  "color-pink-700": "332.31 100% 38.89%", //      :hsl(332.31 100% 38.89%)
  "color-pink-800": "332 100% 31.93%", //         :hsl(332 100% 31.93%)
  "color-pink-900": "334.27 78.49% 29.42%", //    :hsl(334.27 78.49% 29.42%)
  "color-pink-950": "335.29 90.94% 16.65%", //    :hsl(335.29 90.94% 16.65%)

  "color-rose-50": "355.72 96.53% 97.19%", //     :hsl(355.72 96.53% 97.19%)
  "color-rose-100": "355.55 100% 94.67%", //      :hsl(355.55 100% 94.67%)
  "color-rose-200": "352.59 100% 90.06%", //      :hsl(352.59 100% 90.06%)
  "color-rose-300": "351.96 100% 81.5%", //       :hsl(351.96 100% 81.5%)
  "color-rose-400": "349.65 100% 69.44%", //      :hsl(349.65 100% 69.44%)
  "color-rose-500": "345.31 100% 56.23%", //      :hsl(345.31 100% 56.23%)
  "color-rose-600": "343.91 100% 46.37%", //      :hsl(343.91 100% 46.37%)
  "color-rose-700": "343.76 100% 38.93%", //      :hsl(343.76 100% 38.93%)
  "color-rose-800": "340.36 100% 32.33%", //      :hsl(340.36 100% 32.33%)
  "color-rose-900": "338.93 89.54% 28.73%", //    :hsl(338.93 89.54% 28.73%)
  "color-rose-950": "342.26 94.35% 15.6%", //     :hsl(342.26 94.35% 15.6%)

  "color-slate-50": "210 34.55% 98%", //          :hsl(210 34.55% 98%)
  "color-slate-100": "210 40.55% 96.05%", //      :hsl(210 40.55% 96.05%)
  "color-slate-200": "214.28 32.97% 91.42%", //   :hsl(214.28 32.97% 91.42%)
  "color-slate-300": "212.72 29.91% 84.02%", //   :hsl(212.72 29.91% 84.02%)
  "color-slate-400": "214.99 22.59% 64.5%", //    :hsl(214.99 22.59% 64.5%)
  "color-slate-500": "215.38 18.37% 47.03%", //   :hsl(215.38 18.37% 47.03%)
  "color-slate-600": "215.29 22.04% 34.76%", //   :hsl(215.29 22.04% 34.76%)
  "color-slate-700": "215.29 27.93% 26.85%", //   :hsl(215.29 27.93% 26.85%)
  "color-slate-800": "217.28 36.07% 17.54%", //   :hsl(217.28 36.07% 17.54%)
  "color-slate-900": "222.34 49.39% 11.3%", //    :hsl(222.34 49.39% 11.3%)
  "color-slate-950": "228.82 85.13% 5%", //       :hsl(228.82 85.13% 5%)

  "color-gray-50": "210 24.19% 98.1%", //         :hsl(210 24.19% 98.1%)
  "color-gray-100": "220 14.97% 95.9%", //        :hsl(220 14.97% 95.9%)
  "color-gray-200": "220 13.57% 91.05%", //       :hsl(220 13.57% 91.05%)
  "color-gray-300": "216 13.12% 84%", //          :hsl(216 13.12% 84%)
  "color-gray-400": "217.9 11.92% 64.26%", //     :hsl(217.9 11.92% 64.26%)
  "color-gray-500": "220.03 10.26% 46.3%", //     :hsl(220.03 10.26% 46.3%)
  "color-gray-600": "214.99 15.66% 34.25%", //    :hsl(214.99 15.66% 34.25%)
  "color-gray-700": "216.94 21.1% 26.81%", //     :hsl(216.94 21.1% 26.81%)
  "color-gray-800": "214.99 30.99% 16.95%", //    :hsl(214.99 30.99% 16.95%)
  "color-gray-900": "221 41.69% 11.07%", //       :hsl(221 41.69% 11.07%)
  "color-gray-950": "224.05 72.24% 4.17%", //     :hsl(224.05 72.24% 4.17%)

  "color-zinc-50": "0 0% 98.03%", //              :hsl(0 0% 98.03%)
  "color-zinc-100": "239.99 3.51% 95.79%", //     :hsl(239.99 3.51% 95.79%)
  "color-zinc-200": "240 5.86% 90.03%", //        :hsl(240 5.86% 90.03%)
  "color-zinc-300": "240.02 5.38% 83.97%", //     :hsl(240.02 5.38% 83.97%)
  "color-zinc-400": "240.08 5.71% 64.3%", //      :hsl(240.08 5.71% 64.3%)
  "color-zinc-500": "240.1 4.41% 46.34%", //      :hsl(240.1 4.41% 46.34%)
  "color-zinc-600": "240.13 6% 34.16%", //        :hsl(240.13 6% 34.16%)
  "color-zinc-700": "240.08 5.74% 26.15%", //     :hsl(240.08 5.74% 26.15%)
  "color-zinc-800": "240.05 4.04% 15.93%", //     :hsl(240.05 4.04% 15.93%)
  "color-zinc-900": "240.02 6.03% 9.98%", //      :hsl(240.02 6.03% 9.98%)
  "color-zinc-950": "240.1 11.24% 3.98%", //      :hsl(240.1 11.24% 3.98%)

  "color-neutral-50": "0 0% 98.03%", //           :hsl(0 0% 98.03%)
  "color-neutral-100": "0 0% 96.06%", //          :hsl(0 0% 96.06%)
  "color-neutral-200": "0 0% 89.82%", //          :hsl(0 0% 89.82%)
  "color-neutral-300": "0 0% 83.14%", //          :hsl(0 0% 83.14%)
  "color-neutral-400": "0 0% 63.02%", //          :hsl(0 0% 63.02%)
  "color-neutral-500": "0 0% 45.15%", //          :hsl(0 0% 45.15%)
  "color-neutral-600": "0 0% 32.2%", //           :hsl(0 0% 32.2%)
  "color-neutral-700": "0 0% 25.05%", //          :hsl(0 0% 25.05%)
  "color-neutral-800": "0 0% 14.94%", //          :hsl(0 0% 14.94%)
  "color-neutral-900": "0 0% 9.05%", //           :hsl(0 0% 9.05%)
  "color-neutral-950": "0 0% 3.94%", //           :hsl(0 0% 3.94%)

  "color-stone-50": "60.01 7.09% 97.9%", //       :hsl(60.01 7.09% 97.9%)
  "color-stone-100": "60.01 3.65% 95.94%", //     :hsl(60.01 3.65% 95.94%)
  "color-stone-200": "20 6.87% 89.98%", //        :hsl(20 6.87% 89.98%)
  "color-stone-300": "24.01 6.69% 82.98%", //     :hsl(24.01 6.69% 82.98%)
  "color-stone-400": "24.01 5.85% 63.05%", //     :hsl(24.01 5.85% 63.05%)
  "color-stone-500": "25.02 5.9% 44.64%", //      :hsl(25.02 5.9% 44.64%)
  "color-stone-600": "33.35 6.28% 32.24%", //     :hsl(33.35 6.28% 32.24%)
  "color-stone-700": "30.02 7.22% 25.04%", //     :hsl(30.02 7.22% 25.04%)
  "color-stone-800": "12 7.23% 15.07%", //        :hsl(12 7.23% 15.07%)
  "color-stone-900": "24 9.61% 9.99%", //         :hsl(24 9.61% 9.99%)
  "color-stone-950": "20.04 13.84% 4.13%", //     :hsl(20.04 13.84% 4.13%)

  "color-mauve-50": "0 0% 98.03%", //             :hsl(0 0% 98.03%)
  "color-mauve-100": "300 6.75% 94.86%", //       :hsl(300 6.75% 94.86%)
  "color-mauve-200": "300.01 5.72% 89.99%", //    :hsl(300.01 5.72% 89.99%)
  "color-mauve-300": "300 7.91% 82.91%", //       :hsl(300 7.91% 82.91%)
  "color-mauve-400": "294.55 5.88% 64.08%", //    :hsl(294.55 5.88% 64.08%)
  "color-mauve-500": "293.32 7.97% 44.71%", //    :hsl(293.32 7.97% 44.71%)
  "color-mauve-600": "292.01 8.87% 32.73%", //    :hsl(292.01 8.87% 32.73%)
  "color-mauve-700": "295.73 10.8% 25.11%", //    :hsl(295.73 10.8% 25.11%)
  "color-mauve-800": "289.09 14.31% 15.11%", //   :hsl(289.09 14.31% 15.11%)
  "color-mauve-900": "292.5 15.61% 10.17%", //    :hsl(292.5 15.61% 10.17%)
  "color-mauve-950": "300.04 13.94% 4.1%", //     :hsl(300.04 13.94% 4.1%)

  "color-olive-50": "60.06 22.98% 98.06%", //     :hsl(60.06 22.98% 98.06%)
  "color-olive-100": "60.01 14.61% 94.93%", //    :hsl(60.01 14.61% 94.93%)
  "color-olive-200": "59.95 10.3% 90.01%", //     :hsl(59.95 10.3% 90.01%)
  "color-olive-300": "59.97 9.45% 83.12%", //     :hsl(59.97 9.45% 83.12%)
  "color-olive-400": "59.99 8.17% 64.13%", //     :hsl(59.99 8.17% 64.13%)
  "color-olive-500": "59.96 9.27% 44.48%", //     :hsl(59.96 9.27% 44.48%)
  "color-olive-600": "59.96 9.68% 32.51%", //     :hsl(59.96 9.68% 32.51%)
  "color-olive-700": "59.99 11.08% 25.12%", //    :hsl(59.99 11.08% 25.12%)
  "color-olive-800": "60.04 11.83% 15.08%", //    :hsl(60.04 11.83% 15.08%)
  "color-olive-900": "60.02 13.73% 9.98%", //     :hsl(60.02 13.73% 9.98%)
  "color-olive-950": "60.02 13.63% 4.13%", //     :hsl(60.02 13.63% 4.13%)

  "color-mist-50": "179.98 19.51% 98.11%", //     :hsl(179.98 19.51% 98.11%)
  "color-mist-100": "179.98 7.29% 94.96%", //     :hsl(179.98 7.29% 94.96%)
  "color-mist-200": "191.98 10.78% 89.95%", //    :hsl(191.98 10.78% 89.95%)
  "color-mist-300": "195.02 9.15% 83.14%", //     :hsl(195.02 9.15% 83.14%)
  "color-mist-400": "192.01 8.04% 64.13%", //     :hsl(192.01 8.04% 64.13%)
  "color-mist-500": "191.43 9.22% 44.49%", //     :hsl(191.43 9.22% 44.49%)
  "color-mist-600": "191.25 9.66% 32.52%", //     :hsl(191.25 9.66% 32.52%)
  "color-mist-700": "192.85 10.76% 25.12%", //    :hsl(192.85 10.76% 25.12%)
  "color-mist-800": "193.35 12.19% 15.09%", //    :hsl(193.35 12.19% 15.09%)
  "color-mist-900": "197.18 12.89% 10.03%", //    :hsl(197.18 12.89% 10.03%)
  "color-mist-950": "199.99 14.1% 4.14%", //      :hsl(199.99 14.1% 4.14%)

  "color-taupe-50": "30 23.99% 98.08%", //        :hsl(30 23.99% 98.08%)
  "color-taupe-100": "0.01 7.21% 94.93%", //      :hsl(0.01 7.21% 94.93%)
  "color-taupe-200": "12 10.8% 90.06%", //        :hsl(12 10.8% 90.06%)
  "color-taupe-300": "15.02 9.05% 83.13%", //     :hsl(15.02 9.05% 83.13%)
  "color-taupe-400": "16.02 8.12% 64.12%", //     :hsl(16.02 8.12% 64.12%)
  "color-taupe-500": "17.15 9.19% 44.51%", //     :hsl(17.15 9.19% 44.51%)
  "color-taupe-600": "14.99 9.44% 32.52%", //     :hsl(14.99 9.44% 32.52%)
  "color-taupe-700": "12.85 10.73% 25.12%", //    :hsl(12.85 10.73% 25.12%)
  "color-taupe-800": "13.34 11.39% 15.14%", //    :hsl(13.34 11.39% 15.14%)
  "color-taupe-900": "17.16 13.88% 9.98%", //     :hsl(17.16 13.88% 9.98%)
  "color-taupe-950": "20.06 13.84% 4.12%", //     :hsl(20.06 13.84% 4.12%)
});

export type ColorSystem = {
  "color-background": string;
  "color-foreground": string;

  "color-brand": string;
  "color-brand-foreground": string;
  "color-primary": string;
  "color-primary-foreground": string;
  "color-secondary": string;
  "color-secondary-foreground": string;
  "color-muted": string;
  "color-muted-foreground": string;
  "color-accent": string;
  "color-accent-foreground": string;

  "color-danger": string;
  "color-danger-foreground": string;
  "color-warning": string;
  "color-warning-foreground": string;
  "color-success": string;
  "color-success-foreground": string;
  "color-info": string;
  "color-info-foreground": string;

  "color-border": string;
  "color-input": string;
  "color-ring": string;

  "color-card": string;
  "color-card-foreground": string;
  "color-popover": string;
  "color-popover-foreground": string;

  "color-sidebar": string;
  "color-sidebar-foreground": string;
  "color-sidebar-primary": string;
  "color-sidebar-primary-foreground": string;
  "color-sidebar-accent": string;
  "color-sidebar-accent-foreground": string;
  "color-sidebar-border": string;
  "color-sidebar-ring": string;

  "color-chart-1": string;
  "color-chart-2": string;
  "color-chart-3": string;
  "color-chart-4": string;
  "color-chart-5": string;
};

export const ColorTokens: Tokens<ColorSystem> = /* @__PURE__ */ createTokens({
  "color-background": "0 0% 100%", //                   color-white      :hsl(0 0% 100%)
  "color-foreground": "0 0% 3.94%", //                  color-neutral-950:hsl(0 0% 3.94%)

  "color-brand": "0 0% 9.05%", //                       color-neutral-900:hsl(0 0% 9.05%)
  "color-brand-foreground": "0 0% 98.03%", //           color-neutral-50: hsl(0 0% 98.03%)
  "color-primary": "0 0% 9.05%", //                     color-neutral-900:hsl(0 0% 9.05%)
  "color-primary-foreground": "0 0% 98.03%", //         color-neutral-50: hsl(0 0% 98.03%)
  "color-secondary": "0 0% 96.06%", //                  color-neutral-100:hsl(0 0% 96.06%)
  "color-secondary-foreground": "0 0% 9.05%", //        color-neutral-900:hsl(0 0% 9.05%)
  "color-muted": "0 0% 96.06%", //                      color-neutral-100:hsl(0 0% 96.06%)
  "color-muted-foreground": "0 0% 45.15%", //           color-neutral-500:hsl(0 0% 45.15%)
  "color-accent": "0 0% 96.06%", //                     color-neutral-100:hsl(0 0% 96.06%)
  "color-accent-foreground": "0 0% 9.05%", //           color-neutral-900:hsl(0 0% 9.05%)

  "color-danger": "357.21 100% 45.32%", //              color-red-600:    hsl(357.21 100% 45.32%)
  "color-danger-foreground": "0 0% 98.03%", //          color-neutral-50: hsl(0 0% 98.03%)
  "color-warning": "30.1 100% 44.19%", //               color-amber-600:  hsl(30.1 100% 44.19%)
  "color-warning-foreground": "0 0% 98.03%", //         color-neutral-50: hsl(0 0% 98.03%)
  "color-success": "142.29 100% 32.57%", //             color-green-600:  hsl(142.29 100% 32.57%)
  "color-success-foreground": "0 0% 98.03%", //         color-neutral-50: hsl(0 0% 98.03%)
  "color-info": "221.34 97.06% 53.5%", //               color-blue-600:   hsl(221.34 97.06% 53.5%)
  "color-info-foreground": "0 0% 98.03%", //            color-neutral-50: hsl(0 0% 98.03%)

  "color-border": "0 0% 89.82%", //                     color-neutral-200:hsl(0 0% 89.82%)
  "color-input": "0 0% 89.82%", //                      color-neutral-200:hsl(0 0% 89.82%)
  "color-ring": "0 0% 63.02%", //                       color-neutral-400:hsl(0 0% 63.02%)

  "color-card": "0 0% 100%", //                         color-white:      hsl(0 0% 100%)
  "color-card-foreground": "0 0% 3.94%", //             color-neutral-950:hsl(0 0% 3.94%)
  "color-popover": "0 0% 100%", //                      color-white:      hsl(0 0% 100%)
  "color-popover-foreground": "0 0% 3.94%", //          color-neutral-950:hsl(0 0% 3.94%)

  "color-sidebar": "0 0% 98.03%", //                    color-neutral-50: hsl(0 0% 98.03%)
  "color-sidebar-foreground": "0 0% 3.94%", //          color-neutral-950:hsl(0 0% 3.94%)
  "color-sidebar-primary": "0 0% 9.05%", //             color-neutral-900:hsl(0 0% 9.05%)
  "color-sidebar-primary-foreground": "0 0% 98.03%", // color-neutral-50: hsl(0 0% 98.03%)
  "color-sidebar-accent": "0 0% 96.06%", //             color-neutral-100:hsl(0 0% 96.06%)
  "color-sidebar-accent-foreground": "0 0% 9.05%", //   color-neutral-900:hsl(0 0% 9.05%)
  "color-sidebar-border": "0 0% 89.82%", //             color-neutral-200:hsl(0 0% 89.82%)
  "color-sidebar-ring": "0 0% 63.02%", //               color-neutral-400:hsl(0 0% 63.02%)

  "color-chart-1": "210.69 100% 77.83%", //             color-blue-300:   hsl(210.69 100% 77.83%)
  "color-chart-2": "216.26 100% 58.47%", //             color-blue-500:   hsl(216.26 100% 58.47%)
  "color-chart-3": "221.34 97.06% 53.5%", //            color-blue-600:   hsl(221.34 97.06% 53.5%)
  "color-chart-4": "225.35 84.1% 48.98%", //            color-blue-700:   hsl(225.35 84.1% 48.98%)
  "color-chart-5": "227.1 75.74% 41.14%", //            color-blue-800:   hsl(227.1 75.74% 41.14%)
});
