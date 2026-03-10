import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { motion } from "motion/react";
import { useAllBlogPosts } from "../hooks/useQueries";

const SKELETON_LINES = [
  "sl-1",
  "sl-2",
  "sl-3",
  "sl-4",
  "sl-5",
  "sl-6",
  "sl-7",
  "sl-8",
];

function formatDate(ns: bigint) {
  const ms = Number(ns) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage() {
  const { id } = useParams({ from: "/blog/$id" });
  const { data: posts, isLoading } = useAllBlogPosts();
  const post = posts?.find((p) => String(p.id) === id);

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div
          className="container mx-auto px-4 sm:px-6 py-16 max-w-3xl"
          data-ocid="blog.post.loading_state"
        >
          <Skeleton className="h-6 w-24 mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-5 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full mb-6" />
          <div className="space-y-3">
            {SKELETON_LINES.map((k, i) => (
              <Skeleton
                key={k}
                className={`h-4 ${i % 4 === 3 ? "w-3/4" : "w-full"}`}
              />
            ))}
          </div>
        </div>
      ) : !post ? (
        <div
          className="container mx-auto px-4 sm:px-6 py-24 text-center"
          data-ocid="blog.post.error_state"
        >
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-4">
            Post not found
          </h2>
          <Button asChild variant="outline">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      ) : (
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Hero */}
          <div
            className="py-24 relative"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.15 0.04 145), oklch(0.25 0.07 148))",
            }}
          >
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 text-xs font-semibold uppercase tracking-widest">
                {post.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="container mx-auto px-4 sm:px-6 py-16 max-w-3xl">
            <div className="prose prose-green prose-lg max-w-none text-foreground">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
                {post.excerpt}
              </p>
              <div className="whitespace-pre-line text-foreground/80 leading-relaxed">
                {post.body}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <Button asChild variant="outline">
                <Link to="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </motion.article>
      )}
    </div>
  );
}
