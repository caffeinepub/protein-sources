import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Leaf,
  Star,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useAllMenuItems } from "../hooks/useQueries";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const features = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Premium Ingredients",
    desc: "Locally-sourced, whole-food proteins with no artificial fillers or preservatives.",
    image: "/assets/generated/ingredients-flatlay.dim_800x600.jpg",
    badge: "100% Natural",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Meal Convenience",
    desc: "Ready in minutes. Designed for the schedule of students and busy professionals.",
    image: "/assets/generated/meal-prep.dim_800x600.jpg",
    badge: "Ready in 5 min",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Growing Everywhere",
    desc: "Expanding from SF to 10 new cities in 2025. Your next protein fix is never far away.",
    image: null,
    badge: "10 New Cities",
  },
];

const SKELETON_KEYS = ["skel-a", "skel-b", "skel-c"];

export default function HomePage() {
  const { data: menuItems, isLoading } = useAllMenuItems();
  const featured = menuItems?.slice(0, 3) ?? [];

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.15 0.04 145) 0%, oklch(0.22 0.065 148) 60%, oklch(0.30 0.09 155) 100%)",
        }}
      >
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-meal.dim_1200x700.jpg"
            alt="Hero meal"
            className="w-full h-full object-cover opacity-20"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        {/* Decorative grain overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative container mx-auto px-4 sm:px-6 py-24">
          <div className="max-w-2xl">
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
            >
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 text-xs font-semibold tracking-widest uppercase">
                ⚡ Fuel Your Ambition
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-[1.05] tracking-tight mb-6"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
            >
              Protein that powers{" "}
              <span className="text-primary">your best</span> days.
            </motion.h1>

            <motion.p
              className="text-lg text-white/70 mb-10 max-w-lg leading-relaxed"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
            >
              Real food, real protein. Crafted for students and professionals
              who demand high-performance nutrition without the hassle.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeUp}
            >
              <Button
                size="lg"
                id="order"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-8 h-12"
                data-ocid="hero.order_button"
              >
                Order Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 h-12 bg-transparent"
                data-ocid="hero.menu_button"
              >
                <Link to="/menu">View Menu</Link>
              </Button>
            </motion.div>

            <motion.div
              className="mt-12 flex flex-wrap items-center gap-6"
              initial="hidden"
              animate="visible"
              custom={4}
              variants={fadeUp}
            >
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-2 text-white/60 text-sm">
                  4.9 · 2,400+ reviews
                </span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <span className="text-white/60 text-sm">
                30g+ protein per meal
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-4 text-primary border-primary/30 font-semibold tracking-widest text-xs uppercase"
            >
              Why Choose Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Built different. Built better.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div className="rounded-2xl overflow-hidden bg-card border border-border card-hover shadow-card h-full">
                  {f.image ? (
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={f.image}
                        alt={f.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-primary/90 text-primary-foreground text-xs">
                          {f.badge}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="h-52 flex flex-col items-center justify-center relative overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.15 0.04 145), oklch(0.30 0.09 155))",
                      }}
                    >
                      <TrendingUp className="w-16 h-16 text-primary opacity-80 mb-3" />
                      <p className="text-white/70 text-sm font-medium">
                        Expanding in 2025
                      </p>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-primary/90 text-primary-foreground text-xs">
                          {f.badge}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary">
                        {f.icon}
                      </div>
                      <h3 className="font-display font-bold text-lg text-card-foreground">
                        {f.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <Badge
                variant="outline"
                className="mb-3 text-primary border-primary/30 font-semibold tracking-widest text-xs uppercase"
              >
                Featured
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Top picks this week
              </h2>
            </div>
            <Link
              to="/menu"
              className="flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all"
            >
              View full menu <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? SKELETON_KEYS.map((k) => (
                  <Card key={k} className="overflow-hidden">
                    <Skeleton className="h-48" />
                    <CardContent className="p-5 space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))
              : featured.map((item, i) => (
                  <motion.div
                    key={String(item.id)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="overflow-hidden card-hover border-border shadow-card h-full">
                      <div
                        className="h-48 flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, oklch(${0.2 + i * 0.05} 0.06 ${145 + i * 10}), oklch(${0.35 + i * 0.05} 0.10 ${155 + i * 10}))`,
                        }}
                      >
                        <div className="text-center text-white/80">
                          <div className="text-4xl mb-2">🥗</div>
                          <Badge className="bg-white/20 text-white border-white/30 text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-display font-bold text-card-foreground text-lg leading-tight">
                            {item.name}
                          </h3>
                          <span className="text-primary font-bold text-lg ml-2">
                            ${(Number(item.priceCents) / 100).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {item.description}
                        </p>
                        <div className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-foreground text-sm">
                              {String(item.nutrition.proteinGrams)}g
                            </span>
                            <span className="text-xs text-muted-foreground">
                              protein
                            </span>
                          </div>
                          <div className="w-px bg-border" />
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-foreground text-sm">
                              {String(item.nutrition.calories)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              kcal
                            </span>
                          </div>
                          <div className="w-px bg-border" />
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-foreground text-sm">
                              {String(item.nutrition.carbsGrams)}g
                            </span>
                            <span className="text-xs text-muted-foreground">
                              carbs
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-foreground" id="order">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-primary-foreground mb-4">
              Ready to fuel your goals?
            </h2>
            <p className="text-primary-foreground/60 text-lg mb-8 max-w-lg mx-auto">
              Join 10,000+ students and professionals who've leveled up their
              nutrition.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-10 h-12"
              data-ocid="hero.order_button"
            >
              Start Ordering <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
