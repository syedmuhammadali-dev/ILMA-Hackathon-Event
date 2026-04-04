const colorClasses = {
  blue: {
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-600",
  },
  emerald: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-600",
  },
  amber: {
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-600",
  },
  rose: {
    dot: "bg-rose-500",
    badge: "bg-rose-50 text-rose-600",
  },
  indigo: {
    dot: "bg-indigo-500",
    badge: "bg-indigo-50 text-indigo-600",
  },
};

export function getColorClasses(color = "blue") {
  return colorClasses[color] || colorClasses.blue;
}

export default getColorClasses;
