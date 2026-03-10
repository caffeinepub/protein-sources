import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { BlogPost } from "../backend.d";
import { useBlogPostsByCategory } from "../hooks/useQueries";

const CATEGORIES = ["All", "Nutrition", "Fitness", "Lifestyle"];
const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"];

function formatDate(ns: bigint) {
  const ms = Number(ns) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  Nutrition: "bg-primary/10 text-primary border-primary/20",
  Fitness: "bg-orange-100 text-orange-700 border-orange-200",
  Lifestyle: "bg-purple-100 text-purple-700 border-purple-200",
};

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 6) * 0.08 }}
      data-ocid={`blog.post.item.${index + 1}`}
    >
      <Link to="/blog/$id" params={{ id: String(post.id) }}>
        <Card className="overflow-hidden h-full border-border shadow-card card-hover group">
          <div
            className="h-44 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, oklch(${0.18 + (index % 5) * 0.04} 0.05 ${140 + (index % 5) * 15}), oklch(${0.3 + (index % 4) * 0.04} 0.09 ${150 + (index % 5) * 10}))`,
            }}
          >
            <span className="text-5xl">
              {["📝", "💪", "🥗", "🧬", "🏃", "🥦"][index % 6]}
            </span>
          </div>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <Badge
                variant="outline"
                className={`text-xs font-semibold ${
                  CATEGORY_COLORS[post.category] ??
                  "bg-muted text-muted-foreground"
                }`}
              >
                {post.category}
              </Badge>
            </div>
            <h3 className="font-display font-bold text-lg text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
              Read more <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const [category, setCategory] = useState("All");
  const { data: posts, isLoading } = useBlogPostsByCategory(category);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.15 0.04 145), oklch(0.25 0.07 148))",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 text-xs font-semibold tracking-widest uppercase">
            The Blog
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-4">
            Nutrition & Fitness Insights
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Science-backed articles on protein, training, and performance
            nutrition for busy people.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <Tabs value={category} onValueChange={setCategory} className="mb-10">
          <TabsList className="bg-muted p-1 h-auto flex-wrap gap-1">
            {CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                data-ocid="blog.category_tab"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="blog.post.loading_state"
          >
            {SKELETON_KEYS.map((k) => (
              <Card key={k} className="overflow-hidden">
                <Skeleton className="h-44" />
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !posts || posts.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="blog.post.empty_state"
          >
            <div className="text-5xl mb-4">📝</div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              No posts found
            </h3>
            <p className="text-muted-foreground">
              Check back soon for new articles.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <BlogCard key={String(post.id)} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
