import { PersonaSwitcher } from "@/components/persona-switcher";
import { B2BShowcase } from "@/components/b2b-showcase";

export default function SolutionsPage() {
  return (
    <main className="pt-24">
      <B2BShowcase />
      <PersonaSwitcher />
    </main>
  );
}
