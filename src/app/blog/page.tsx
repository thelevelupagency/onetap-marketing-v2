import { Metadata } from "next";
import { Suspense } from "react";
import { BlogList } from "@/components/marketing/blog-list";

export const metadata: Metadata = {
  title: "Blog | OneTap-Card",
  description: "Networking tips, success stories, and product updates from the OneTap team.",
};

export default function BlogPage() {
  return (
    <div className="flex flex-col w-full pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="container mx-auto px-6 text-center max-w-4xl mb-12">
        <h1 className="font-display text-5xl md:text-7xl text-brand-midnight mb-6">
          The OneTap <span className="italic text-brand-turquoise">Blog</span>
        </h1>
        <p className="text-xl text-brand-midnight/70">
          Best practices, success stories, how-tos, and news for modern professionals.
        </p>
      </div>

      <div className="container mx-auto px-6">
        <Suspense fallback={<div className="text-center text-brand-midnight/50">Loading posts...</div>}>
          <BlogList />
        </Suspense>
      </div>
    </div>
  );
}
