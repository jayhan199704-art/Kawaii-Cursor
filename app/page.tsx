"use client";

/**
 * app/page.tsx
 * Kawaii Cursor homepage (English version)
 * - Live cursor preview
 * - Category filtering
 * - localStorage persistence for the last previewed cursor
 */
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  Heart,
  MousePointer2,
  Sparkles,
  MonitorCheck,
  Settings2,
  Search,
  CheckCircle2,
  X,
} from "lucide-react";

import { cursors } from "@/lib/cursors";

type CursorItem = (typeof cursors)[number];

type FilterKey = "All" | "Cat" | "Food" | "Animal" | "Dreamy" | "Girl" | "Starry";

const FILTER_OPTIONS: { key: FilterKey; label: string; sourceCategory: string | null }[] = [
  { key: "All", label: "All", sourceCategory: null },
  { key: "Cat", label: "Cat", sourceCategory: "猫咪系" },
  { key: "Food", label: "Food", sourceCategory: "食物系" },
  { key: "Animal", label: "Animal", sourceCategory: "动物系" },
  { key: "Dreamy", label: "Dreamy", sourceCategory: "梦幻系" },
  { key: "Girl", label: "Girl", sourceCategory: "少女系" },
  { key: "Starry", label: "Starry", sourceCategory: "星空系" },
];

const CATEGORY_EN_MAP: Record<string, string> = {
  猫咪系: "Cat Series",
  食物系: "Food Series",
  动物系: "Animal Series",
  梦幻系: "Dreamy Series",
  少女系: "Girl Series",
  星空系: "Starry Series",
};

const STORAGE_KEY = "kawaii-cursor-active-id";

export default function HomePage() {
  // Active cursor preview
  const [activeCursor, setActiveCursor] = useState<CursorItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");

  // Build CSS cursor value (supports .cur/.png fallback behavior by browser)
  const cursorCssValue = useMemo(() => {
    if (!activeCursor) return "auto";
    return `url("${activeCursor.cursorUrl}") 0 0, auto`;
  }, [activeCursor]);

  const filteredCursors = useMemo(() => {
    const current = FILTER_OPTIONS.find((item) => item.key === activeFilter);
    if (!current || !current.sourceCategory) return cursors;
    return cursors.filter((item) => item.category === current.sourceCategory);
  }, [activeFilter]);

  // On first load: restore last preview cursor from localStorage
  useEffect(() => {
    const rawId = window.localStorage.getItem(STORAGE_KEY);
    if (!rawId) return;

    const parsedId = Number(rawId);
    if (!Number.isFinite(parsedId)) return;

    const matched = cursors.find((item) => item.id === parsedId) ?? null;
    setActiveCursor(matched);
  }, []);

  // Sync active cursor to localStorage when changed
  useEffect(() => {
    if (activeCursor) {
      window.localStorage.setItem(STORAGE_KEY, String(activeCursor.id));
      return;
    }

    // If user resets to default cursor, clear the cache
    window.localStorage.removeItem(STORAGE_KEY);
  }, [activeCursor]);

  const resetCursorPreview = () => {
    setActiveCursor(null);
  };

  return (
    <main
      className="page-shell cursor-preview-var min-h-screen px-4 pb-16 pt-6 md:px-8 md:pt-8"
      style={
        {
          "--cursor-url": cursorCssValue,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* =========================
            1) Hero
           ========================= */}
        <section className="relative overflow-hidden rounded-[2rem] border border-pink-200/60 bg-white/70 p-6 shadow-[0_12px_30px_rgba(255,173,214,0.28)] backdrop-blur md:p-10">
          {/* Decorative background blobs */}
          <div className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-pink-200/45 blur-2xl" />
          <div className="pointer-events-none absolute -right-8 top-1/3 h-28 w-28 rounded-full bg-purple-200/45 blur-2xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-sky-200/40 blur-2xl" />

          {/* Preview status (visible on desktop + mobile) */}
          <div className="relative z-10 mb-4 flex justify-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-purple-700 shadow-sm md:text-sm">
              <MousePointer2 size={14} className="text-fuchsia-600" />
              <span>
                {activeCursor
                  ? `Now previewing: ${activeCursor.name}`
                  : "Now previewing: Default cursor"}
              </span>

              {activeCursor && (
                <button
                  type="button"
                  onClick={resetCursorPreview}
                  className="ml-1 inline-flex items-center gap-1 rounded-full border border-pink-300 bg-pink-100 px-2 py-0.5 text-[11px] font-bold text-pink-700 transition hover:bg-pink-200"
                  aria-label="Close preview and restore default cursor"
                >
                  <X size={12} />
                  Close
                </button>
              )}
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-100/80 px-3 py-1 text-sm font-semibold text-pink-700">
              <Sparkles size={16} />
              Give your Windows mouse a kawaii makeover
            </div>

            <h1 className="kawaii-title text-4xl font-extrabold tracking-tight md:text-6xl">
              Kawaii Cursor ✨
            </h1>

            <p className="text-lg font-semibold text-fuchsia-700 md:text-2xl">
              Make your Windows mouse super cute! 💕
            </p>

            <p className="max-w-2xl text-sm text-purple-700/80 md:text-base">
              Download adorable .cur cursors → Set them on your computer easily
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <a
                href="#cursor-gallery"
                className="kawaii-btn inline-flex items-center gap-2 text-base md:text-lg"
              >
                <Heart size={18} className="fill-pink-300 text-pink-500" />
                Browse Cursor Library
              </a>

              <button
                type="button"
                onClick={resetCursorPreview}
                className="kawaii-btn inline-flex items-center gap-2 text-sm md:text-base"
              >
                <Sparkles size={14} />
                Restore Default
              </button>
            </div>
          </div>
        </section>

        {/* =========================
            2) Popular cursor gallery
           ========================= */}
        <section id="cursor-gallery" className="mt-12">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="kawaii-title text-2xl font-extrabold md:text-4xl">
                Popular Cute Cursors
              </h2>
              <p className="mt-2 text-sm text-purple-700/75 md:text-base">
                Click “Preview” to instantly switch the page cursor
              </p>
            </div>
          </div>

          {/* Category filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((filter) => {
              const selected = filter.key === activeFilter;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-bold transition-all duration-200",
                    "border shadow-sm",
                    selected
                      ? "border-pink-300 bg-pink-200/90 text-pink-800 shadow-[0_6px_16px_rgba(255,143,196,0.35)]"
                      : "border-pink-100 bg-white/80 text-purple-700 hover:-translate-y-0.5 hover:border-pink-200 hover:bg-pink-50",
                  ].join(" ")}
                  aria-pressed={selected}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Responsive grid: mobile 1-2 / tablet 3 / desktop 4-5 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filteredCursors.map((item, index) => {
              const isActive = activeCursor?.id === item.id;
              const categoryLabel = CATEGORY_EN_MAP[item.category] ?? item.category;

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.38, delay: index * 0.03 }}
                  className={`kawaii-card cursor-card relative overflow-hidden p-4 ${
                    isActive
                      ? "ring-2 ring-pink-300/90 shadow-[0_14px_32px_rgba(255,143,196,0.34)]"
                      : ""
                  }`}
                >
                  {/* Cute particle layer */}
                  <div className="heart-particles" aria-hidden>
                    <span className="heart-particle h1">💗</span>
                    <span className="heart-particle h2">✨</span>
                    <span className="heart-particle h3">💖</span>
                    <span className="heart-particle h4">⭐</span>
                  </div>

                  {/* Square preview image */}
                  <div className="relative mx-auto mb-3 flex aspect-square w-full max-w-[160px] items-center justify-center rounded-3xl bg-gradient-to-br from-pink-100 via-purple-100 to-sky-100 p-4 shadow-inner">
                    <img
                      src={item.previewImage}
                      alt={item.name}
                      className="h-full w-full rounded-2xl object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Name + category + description */}
                  <h3 className="line-clamp-1 text-base font-extrabold text-purple-900">
                    {item.name}
                  </h3>

                  <div className="mt-1 inline-flex rounded-full border border-pink-200 bg-pink-50 px-2.5 py-1 text-xs font-semibold text-pink-700">
                    {categoryLabel}
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm text-purple-700/80">
                    {item.description}
                  </p>

                  {/* Action buttons */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveCursor(item)}
                      className={`kawaii-btn inline-flex items-center justify-center gap-1 text-sm ${
                        isActive ? "brightness-105" : ""
                      }`}
                    >
                      <MousePointer2 size={14} />
                      {isActive ? "Previewing" : "Preview"}
                    </button>

                    <a
                      href={item.cursorUrl || "#"}
                      download
                      className="kawaii-btn inline-flex items-center justify-center gap-1 text-sm"
                    >
                      <ArrowDownToLine size={14} />
                      Download .cur
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredCursors.length === 0 && (
            <div className="mt-5 rounded-2xl border border-pink-200/70 bg-white/75 p-4 text-sm text-purple-700">
              No cursors found in this category yet. Try another one ✨
            </div>
          )}
        </section>

        {/* =========================
            3) Windows guide
           ========================= */}
        <section className="mt-14">
          <div className="kawaii-card rounded-[2rem] p-5 md:p-8">
            <h2 className="kawaii-title text-2xl font-extrabold md:text-4xl">
              How to set a cute cursor on Windows
            </h2>
            <p className="mt-2 text-sm text-purple-700/75 md:text-base">
              Just 4 simple steps to make your pointer adorable.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {/* Step 1 */}
              <div className="rounded-3xl border border-pink-200/70 bg-white/80 p-4 shadow-sm">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-sm font-bold text-pink-700">
                  <ArrowDownToLine size={16} />
                  Step 1
                </div>
                <h3 className="font-extrabold text-purple-900">Download the .cur file</h3>
                <p className="mt-1 text-sm text-purple-700/80">
                  Click “Download .cur” on any card and save the file to your computer.
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-3xl border border-purple-200/70 bg-white/80 p-4 shadow-sm">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700">
                  <Search size={16} />
                  Step 2
                </div>
                <h3 className="font-extrabold text-purple-900">Open Mouse Pointer settings</h3>
                <p className="mt-1 text-sm text-purple-700/80">
                  In Windows Search, find “Mouse settings”, then open “Additional mouse options” and go to the “Pointers” tab.
                </p>
              </div>

              {/* Step 3 */}
              <div className="rounded-3xl border border-sky-200/70 bg-white/80 p-4 shadow-sm">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-bold text-sky-700">
                  <Settings2 size={16} />
                  Step 3
                </div>
                <h3 className="font-extrabold text-purple-900">Browse and replace pointer type</h3>
                <p className="mt-1 text-sm text-purple-700/80">
                  Select a pointer role (like Normal Select), click “Browse”, and choose your downloaded .cur file.
                </p>
              </div>

              {/* Step 4 */}
              <div className="rounded-3xl border border-emerald-200/70 bg-white/80 p-4 shadow-sm">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
                  <CheckCircle2 size={16} />
                  Step 4
                </div>
                <h3 className="font-extrabold text-purple-900">Apply and enjoy</h3>
                <p className="mt-1 text-sm text-purple-700/80">
                  Click “Apply” and then “OK” — your new kawaii cursor is now active.
                </p>
              </div>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-700">
              <MonitorCheck size={14} />
              Pro tip: Use a matching cursor set for a cleaner and cuter desktop vibe.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
