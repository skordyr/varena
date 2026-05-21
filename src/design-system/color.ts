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
  "color-black": "#000000",
  "color-white": "#ffffff",

  "color-red-50": "254 242 242",
  "color-red-100": "255 226 226",
  "color-red-200": "255 201 201",
  "color-red-300": "255 162 162",
  "color-red-400": "255 100 103",
  "color-red-500": "251 44 54",
  "color-red-600": "231 0 11",
  "color-red-700": "193 0 7",
  "color-red-800": "159 7 18",
  "color-red-900": "130 24 26",
  "color-red-950": "70 8 9",

  "color-orange-50": "255 247 237",
  "color-orange-100": "255 237 212",
  "color-orange-200": "255 214 167",
  "color-orange-300": "255 184 106",
  "color-orange-400": "255 137 4",
  "color-orange-500": "255 105 0",
  "color-orange-600": "245 73 0",
  "color-orange-700": "202 53 0",
  "color-orange-800": "159 45 0",
  "color-orange-900": "126 42 12",
  "color-orange-950": "68 19 6",

  "color-amber-50": "255 251 235",
  "color-amber-100": "254 243 198",
  "color-amber-200": "254 230 133",
  "color-amber-300": "255 210 48",
  "color-amber-400": "255 185 0",
  "color-amber-500": "254 154 0",
  "color-amber-600": "225 113 0",
  "color-amber-700": "187 77 0",
  "color-amber-800": "151 60 0",
  "color-amber-900": "123 51 6",
  "color-amber-950": "70 25 1",

  "color-yellow-50": "254 252 232",
  "color-yellow-100": "254 249 194",
  "color-yellow-200": "255 240 133",
  "color-yellow-300": "255 223 32",
  "color-yellow-400": "253 199 0",
  "color-yellow-500": "240 177 0",
  "color-yellow-600": "208 135 0",
  "color-yellow-700": "166 95 0",
  "color-yellow-800": "137 75 0",
  "color-yellow-900": "115 62 10",
  "color-yellow-950": "67 32 4",

  "color-lime-50": "247 254 231",
  "color-lime-100": "236 252 202",
  "color-lime-200": "216 249 153",
  "color-lime-300": "187 244 81",
  "color-lime-400": "154 230 0",
  "color-lime-500": "124 207 0",
  "color-lime-600": "94 165 0",
  "color-lime-700": "73 125 0",
  "color-lime-800": "60 99 0",
  "color-lime-900": "53 83 14",
  "color-lime-950": "25 46 3",

  "color-green-50": "240 253 244",
  "color-green-100": "220 252 231",
  "color-green-200": "185 248 207",
  "color-green-300": "123 241 168",
  "color-green-400": "5 223 114",
  "color-green-500": "0 201 80",
  "color-green-600": "0 166 62",
  "color-green-700": "0 130 54",
  "color-green-800": "1 102 48",
  "color-green-900": "13 84 43",
  "color-green-950": "3 46 21",

  "color-emerald-50": "236 253 245",
  "color-emerald-100": "208 250 229",
  "color-emerald-200": "164 244 207",
  "color-emerald-300": "94 233 181",
  "color-emerald-400": "0 212 146",
  "color-emerald-500": "0 188 125",
  "color-emerald-600": "0 153 102",
  "color-emerald-700": "0 122 85",
  "color-emerald-800": "0 96 69",
  "color-emerald-900": "0 79 59",
  "color-emerald-950": "0 44 34",

  "color-teal-50": "240 253 250",
  "color-teal-100": "203 251 241",
  "color-teal-200": "150 247 228",
  "color-teal-300": "70 236 213",
  "color-teal-400": "0 213 190",
  "color-teal-500": "0 187 167",
  "color-teal-600": "0 150 137",
  "color-teal-700": "0 120 111",
  "color-teal-800": "0 95 90",
  "color-teal-900": "11 79 74",
  "color-teal-950": "2 47 46",

  "color-cyan-50": "236 254 255",
  "color-cyan-100": "206 250 254",
  "color-cyan-200": "162 244 253",
  "color-cyan-300": "83 234 253",
  "color-cyan-400": "0 211 242",
  "color-cyan-500": "0 184 219",
  "color-cyan-600": "0 146 184",
  "color-cyan-700": "0 117 149",
  "color-cyan-800": "0 95 120",
  "color-cyan-900": "16 78 100",
  "color-cyan-950": "5 51 69",

  "color-sky-50": "240 249 255",
  "color-sky-100": "223 242 254",
  "color-sky-200": "184 230 254",
  "color-sky-300": "116 212 255",
  "color-sky-400": "0 188 255",
  "color-sky-500": "0 166 244",
  "color-sky-600": "0 132 209",
  "color-sky-700": "0 105 168",
  "color-sky-800": "0 89 138",
  "color-sky-900": "2 74 112",
  "color-sky-950": "5 47 74",

  "color-blue-50": "239 246 255",
  "color-blue-100": "219 234 254",
  "color-blue-200": "190 219 255",
  "color-blue-300": "142 197 255",
  "color-blue-400": "81 162 255",
  "color-blue-500": "43 127 255",
  "color-blue-600": "21 93 252",
  "color-blue-700": "20 71 230",
  "color-blue-800": "25 60 184",
  "color-blue-900": "28 57 142",
  "color-blue-950": "22 36 86",

  "color-indigo-50": "238 242 255",
  "color-indigo-100": "224 231 255",
  "color-indigo-200": "198 210 255",
  "color-indigo-300": "163 179 255",
  "color-indigo-400": "124 134 255",
  "color-indigo-500": "97 95 255",
  "color-indigo-600": "79 57 246",
  "color-indigo-700": "67 45 215",
  "color-indigo-800": "55 42 172",
  "color-indigo-900": "49 44 133",
  "color-indigo-950": "30 26 77",

  "color-violet-50": "245 243 255",
  "color-violet-100": "237 233 254",
  "color-violet-200": "221 214 255",
  "color-violet-300": "196 180 255",
  "color-violet-400": "166 132 255",
  "color-violet-500": "142 81 255",
  "color-violet-600": "127 34 254",
  "color-violet-700": "112 8 231",
  "color-violet-800": "93 14 192",
  "color-violet-900": "77 23 154",
  "color-violet-950": "47 13 104",

  "color-purple-50": "250 245 255",
  "color-purple-100": "243 232 255",
  "color-purple-200": "233 212 255",
  "color-purple-300": "218 178 255",
  "color-purple-400": "194 122 255",
  "color-purple-500": "173 70 255",
  "color-purple-600": "152 16 250",
  "color-purple-700": "130 0 219",
  "color-purple-800": "110 17 176",
  "color-purple-900": "89 22 139",
  "color-purple-950": "60 3 102",

  "color-fuchsia-50": "253 244 255",
  "color-fuchsia-100": "250 232 255",
  "color-fuchsia-200": "246 207 255",
  "color-fuchsia-300": "244 168 255",
  "color-fuchsia-400": "237 106 255",
  "color-fuchsia-500": "225 42 251",
  "color-fuchsia-600": "200 0 222",
  "color-fuchsia-700": "168 0 183",
  "color-fuchsia-800": "138 1 148",
  "color-fuchsia-900": "114 19 120",
  "color-fuchsia-950": "75 0 79",

  "color-pink-50": "253 242 248",
  "color-pink-100": "252 231 243",
  "color-pink-200": "252 206 232",
  "color-pink-300": "253 165 213",
  "color-pink-400": "251 100 182",
  "color-pink-500": "246 51 154",
  "color-pink-600": "230 0 118",
  "color-pink-700": "198 0 92",
  "color-pink-800": "163 0 76",
  "color-pink-900": "134 16 67",
  "color-pink-950": "81 4 36",

  "color-rose-50": "255 241 242",
  "color-rose-100": "255 228 230",
  "color-rose-200": "255 204 211",
  "color-rose-300": "255 161 173",
  "color-rose-400": "255 99 126",
  "color-rose-500": "255 32 86",
  "color-rose-600": "236 0 63",
  "color-rose-700": "199 0 54",
  "color-rose-800": "165 0 54",
  "color-rose-900": "139 8 54",
  "color-rose-950": "77 2 24",

  "color-slate-50": "248 250 252",
  "color-slate-100": "241 245 249",
  "color-slate-200": "226 232 240",
  "color-slate-300": "202 213 226",
  "color-slate-400": "144 161 185",
  "color-slate-500": "98 116 142",
  "color-slate-600": "69 85 108",
  "color-slate-700": "49 65 88",
  "color-slate-800": "29 41 61",
  "color-slate-900": "15 23 43",
  "color-slate-950": "2 6 24",

  "color-gray-50": "249 250 251",
  "color-gray-100": "243 244 246",
  "color-gray-200": "229 231 235",
  "color-gray-300": "209 213 220",
  "color-gray-400": "153 161 175",
  "color-gray-500": "106 114 130",
  "color-gray-600": "74 85 101",
  "color-gray-700": "54 65 83",
  "color-gray-800": "30 41 57",
  "color-gray-900": "16 24 40",
  "color-gray-950": "3 7 18",

  "color-zinc-50": "250 250 250",
  "color-zinc-100": "244 244 245",
  "color-zinc-200": "228 228 231",
  "color-zinc-300": "212 212 216",
  "color-zinc-400": "159 159 169",
  "color-zinc-500": "113 113 123",
  "color-zinc-600": "82 82 92",
  "color-zinc-700": "63 63 70",
  "color-zinc-800": "39 39 42",
  "color-zinc-900": "24 24 27",
  "color-zinc-950": "9 9 11",

  "color-neutral-50": "250 250 250",
  "color-neutral-100": "245 245 245",
  "color-neutral-200": "229 229 229",
  "color-neutral-300": "212 212 212",
  "color-neutral-400": "161 161 161",
  "color-neutral-500": "115 115 115",
  "color-neutral-600": "82 82 82",
  "color-neutral-700": "64 64 64",
  "color-neutral-800": "38 38 38",
  "color-neutral-900": "23 23 23",
  "color-neutral-950": "10 10 10",

  "color-stone-50": "250 250 249",
  "color-stone-100": "245 245 244",
  "color-stone-200": "231 229 228",
  "color-stone-300": "214 211 209",
  "color-stone-400": "166 160 155",
  "color-stone-500": "121 113 107",
  "color-stone-600": "87 83 77",
  "color-stone-700": "68 64 59",
  "color-stone-800": "41 37 36",
  "color-stone-900": "28 25 23",
  "color-stone-950": "12 10 9",

  "color-mauve-50": "250 250 250",
  "color-mauve-100": "243 241 243",
  "color-mauve-200": "231 228 231",
  "color-mauve-300": "215 208 215",
  "color-mauve-400": "168 158 169",
  "color-mauve-500": "121 105 123",
  "color-mauve-600": "89 76 91",
  "color-mauve-700": "70 57 71",
  "color-mauve-800": "42 33 44",
  "color-mauve-900": "29 22 30",
  "color-mauve-950": "12 9 12",

  "color-olive-50": "251 251 249",
  "color-olive-100": "244 244 240",
  "color-olive-200": "232 232 227",
  "color-olive-300": "216 216 208",
  "color-olive-400": "171 171 156",
  "color-olive-500": "124 124 103",
  "color-olive-600": "91 91 75",
  "color-olive-700": "71 71 57",
  "color-olive-800": "43 43 34",
  "color-olive-900": "29 29 22",
  "color-olive-950": "12 12 9",

  "color-mist-50": "249 251 251",
  "color-mist-100": "241 243 243",
  "color-mist-200": "227 231 232",
  "color-mist-300": "208 214 216",
  "color-mist-400": "156 168 171",
  "color-mist-500": "103 120 124",
  "color-mist-600": "75 88 91",
  "color-mist-700": "57 68 71",
  "color-mist-800": "34 41 43",
  "color-mist-900": "22 27 29",
  "color-mist-950": "9 11 12",

  "color-taupe-50": "251 250 249",
  "color-taupe-100": "243 241 241",
  "color-taupe-200": "232 228 227",
  "color-taupe-300": "216 210 208",
  "color-taupe-400": "171 160 156",
  "color-taupe-500": "124 109 103",
  "color-taupe-600": "91 79 75",
  "color-taupe-700": "71 60 57",
  "color-taupe-800": "43 36 34",
  "color-taupe-900": "29 24 22",
  "color-taupe-950": "12 10 9",
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
  "color-accent": string;
  "color-accent-foreground": string;
  "color-muted": string;
  "color-muted-foreground": string;

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
  "color-background": "255 255 255",
  "color-foreground": "10 10 10",

  "color-brand": "23 23 23",
  "color-brand-foreground": "250 250 250",
  "color-primary": "23 23 23",
  "color-primary-foreground": "250 250 250",
  "color-secondary": "245 245 245",
  "color-secondary-foreground": "23 23 23",
  "color-accent": "245 245 245",
  "color-accent-foreground": "23 23 23",
  "color-muted": "245 245 245",
  "color-muted-foreground": "115 115 115",

  "color-danger": "251 44 54",
  "color-danger-foreground": "250 250 250",
  "color-warning": "254 154 0",
  "color-warning-foreground": "250 250 250",
  "color-success": "0 201 80",
  "color-success-foreground": "250 250 250",
  "color-info": "43 127 255",
  "color-info-foreground": "250 250 250",

  "color-border": "229 229 229",
  "color-input": "229 229 229",
  "color-ring": "161 161 161",

  "color-card": "255 255 255",
  "color-card-foreground": "10 10 10",
  "color-popover": "255 255 255",
  "color-popover-foreground": "10 10 10",

  "color-sidebar": "250 250 250",
  "color-sidebar-foreground": "10 10 10",
  "color-sidebar-primary": "23 23 23",
  "color-sidebar-primary-foreground": "250 250 250",
  "color-sidebar-accent": "245 245 245",
  "color-sidebar-accent-foreground": "23 23 23",
  "color-sidebar-border": "229 229 229",
  "color-sidebar-ring": "161 161 161",

  "color-chart-1": "20 71 230",
  "color-chart-2": "0 188 125",
  "color-chart-3": "253 199 0",
  "color-chart-4": "173 70 255",
  "color-chart-5": "255 32 86",
});
