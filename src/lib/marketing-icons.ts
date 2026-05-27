import {
  BarChart3,
  Briefcase,
  Building2,
  ContactRound,
  Edit3,
  Globe,
  Home,
  Image,
  Inbox,
  Palette,
  RefreshCw,
  Scale,
  Smartphone,
  Sparkles,
  UserPlus,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type {
  CardUxIconKey,
  DashboardIconKey,
  PainPointIconKey,
  SolutionIconKey,
} from "@/content/homepage";

export const cardUxIcons: Record<CardUxIconKey, LucideIcon> = {
  zap: Zap,
  contactRound: ContactRound,
  userPlus: UserPlus,
  barChart3: BarChart3,
  image: Image,
  refreshCw: RefreshCw,
  smartphone: Smartphone,
  globe: Globe,
};

export const solutionIcons: Record<SolutionIconKey, LucideIcon> = {
  briefcase: Briefcase,
  home: Home,
  sparkles: Sparkles,
  building2: Building2,
  users: Users,
  scale: Scale,
};

export const dashboardIcons: Record<DashboardIconKey, LucideIcon> = {
  edit3: Edit3,
  barChart3: BarChart3,
  inbox: Inbox,
  palette: Palette,
  users: Users,
};

export const painPointIcons: Record<PainPointIconKey, LucideIcon> = {
  refreshCw: RefreshCw,
  userPlus: UserPlus,
  barChart3: BarChart3,
};
