import React from "react";
import { Award, Diamond, Rocket, ShieldCheck, Star, Zap } from "lucide-react";

export const SUBSCRIPTION_ICON_OPTIONS = [
  {
    key: "award",
    label: "Award",
    description: "Balanced and trusted plan",
    icon: Award,
    iconClassName: "text-amber-500",
    surfaceClassName: "bg-amber-50 border-amber-200",
  },
  {
    key: "shield",
    label: "Shield",
    description: "Verified and secure plan",
    icon: ShieldCheck,
    iconClassName: "text-emerald-600",
    surfaceClassName: "bg-emerald-50 border-emerald-200",
  },
  {
    key: "diamond",
    label: "Diamond",
    description: "Premium flagship package",
    icon: Diamond,
    iconClassName: "text-violet-500",
    surfaceClassName: "bg-violet-50 border-violet-200",
  },
  {
    key: "rocket",
    label: "Rocket",
    description: "Growth and launch focused",
    icon: Rocket,
    iconClassName: "text-sky-500",
    surfaceClassName: "bg-sky-50 border-sky-200",
  },
  {
    key: "star",
    label: "Star",
    description: "Popular high-visibility plan",
    icon: Star,
    iconClassName: "text-blue-500",
    surfaceClassName: "bg-blue-50 border-blue-200",
  },
  {
    key: "bolt",
    label: "Bolt",
    description: "Fast and practical option",
    icon: Zap,
    iconClassName: "text-[#D4AF37]",
    surfaceClassName: "bg-[#D4AF37]/10 border-[#E7C66A]",
  },
];

const FALLBACK_ICON = SUBSCRIPTION_ICON_OPTIONS[0];

export const getSubscriptionIconOption = (iconKey) =>
  SUBSCRIPTION_ICON_OPTIONS.find((option) => option.key === iconKey) || FALLBACK_ICON;

export function SubscriptionIcon({
  iconKey,
  className = "w-12 h-12 rounded-2xl border",
  iconSize = 22,
  strokeWidth = 2.4,
}) {
  const option = getSubscriptionIconOption(iconKey);
  const Icon = option.icon;

  return (
    <div
      className={`${className} ${option.surfaceClassName} flex items-center justify-center`}
    >
      <Icon size={iconSize} strokeWidth={strokeWidth} className={option.iconClassName} />
    </div>
  );
}
