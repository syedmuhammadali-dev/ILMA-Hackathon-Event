/**
 * Tailwind scans source files for complete class names at build time, so a
 * template literal like `bg-${color}-500` never produces any CSS — the element
 * silently renders unstyled. Every accent colour used by the UI is therefore
 * spelled out here as a literal string.
 *
 * Add a colour by copying a block and replacing the name in every slot.
 */
const colorClasses = {
  blue: {
    dot: "bg-blue-500",
    text: "text-blue-500",
    textSoft: "text-blue-400",
    textStrong: "text-blue-600",
    glow: "bg-blue-500/5",
    iconWrap: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    iconWrapLight: "bg-blue-50 border-blue-100 dark:bg-blue-500/10",
    badge: "bg-blue-500/10 text-blue-600 border-blue-500/10",
    chip: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    outlineBtn:
      "border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white",
  },
  emerald: {
    dot: "bg-emerald-500",
    text: "text-emerald-500",
    textSoft: "text-emerald-400",
    textStrong: "text-emerald-600",
    glow: "bg-emerald-500/5",
    iconWrap: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    iconWrapLight: "bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10",
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/10",
    chip: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    outlineBtn:
      "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white",
  },
  purple: {
    dot: "bg-purple-500",
    text: "text-purple-500",
    textSoft: "text-purple-400",
    textStrong: "text-purple-600",
    glow: "bg-purple-500/5",
    iconWrap: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    iconWrapLight: "bg-purple-50 border-purple-100 dark:bg-purple-500/10",
    badge: "bg-purple-500/10 text-purple-600 border-purple-500/10",
    chip: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    outlineBtn:
      "border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-white",
  },
  amber: {
    dot: "bg-amber-500",
    text: "text-amber-500",
    textSoft: "text-amber-400",
    textStrong: "text-amber-600",
    glow: "bg-amber-500/5",
    iconWrap: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    iconWrapLight: "bg-amber-50 border-amber-100 dark:bg-amber-500/10",
    badge: "bg-amber-500/10 text-amber-600 border-amber-500/10",
    chip: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    outlineBtn:
      "border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-white",
  },
  rose: {
    dot: "bg-rose-500",
    text: "text-rose-500",
    textSoft: "text-rose-400",
    textStrong: "text-rose-600",
    glow: "bg-rose-500/5",
    iconWrap: "bg-rose-500/10 border-rose-500/20 text-rose-400",
    iconWrapLight: "bg-rose-50 border-rose-100 dark:bg-rose-500/10",
    badge: "bg-rose-500/10 text-rose-600 border-rose-500/10",
    chip: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    outlineBtn:
      "border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white",
  },
  indigo: {
    dot: "bg-indigo-500",
    text: "text-indigo-500",
    textSoft: "text-indigo-400",
    textStrong: "text-indigo-600",
    glow: "bg-indigo-500/5",
    iconWrap: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    iconWrapLight: "bg-indigo-50 border-indigo-100 dark:bg-indigo-500/10",
    badge: "bg-indigo-500/10 text-indigo-600 border-indigo-500/10",
    chip: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    outlineBtn:
      "border-indigo-500/30 text-indigo-400 hover:bg-indigo-500 hover:text-white",
  },
  slate: {
    dot: "bg-slate-500",
    text: "text-slate-500",
    textSoft: "text-slate-400",
    textStrong: "text-slate-600",
    glow: "bg-slate-500/5",
    iconWrap: "bg-slate-500/10 border-slate-500/20 text-slate-400",
    iconWrapLight: "bg-slate-50 border-slate-100 dark:bg-slate-500/10",
    badge: "bg-slate-500/10 text-slate-600 border-slate-500/10",
    chip: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    outlineBtn:
      "border-slate-500/30 text-slate-400 hover:bg-slate-500 hover:text-white",
  },
};

export function getColorClasses(color = "blue") {
  return colorClasses[color] || colorClasses.blue;
}

export default getColorClasses;
