import {
  BarChart3,
  Briefcase,
  Building2,
  ContactRound,
  Edit3,
  FilePenLine,
  Globe,
  Home,
  Image,
  Inbox,
  LineChart,
  Link2,
  Lock,
  Palette,
  RefreshCw,
  Scale,
  Smartphone,
  Sparkles,
  Upload,
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
import type { SolutionFeatureIconKey } from "@/content/solutions";

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
  filePenLine: FilePenLine,
  inbox: Inbox,
  lineChart: LineChart,
  contactRound: ContactRound,
  link2: Link2,
  palette: Palette,
  users: Users,
};

export const solutionFeatureIcons: Record<SolutionFeatureIconKey, LucideIcon> = {
  zap: Zap,
  link2: Link2,
  userPlus: UserPlus,
  barChart3: BarChart3,
  image: Image,
  refreshCw: RefreshCw,
  lock: Lock,
  users: Users,
  upload: Upload,
  palette: Palette,
  inbox: Inbox,
  contactRound: ContactRound,
};
