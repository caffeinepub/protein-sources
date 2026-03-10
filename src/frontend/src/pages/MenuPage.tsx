import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import { useState } from "react";
import type { MenuItem } from "../backend.d";
import { useMenuItemsByCategory } from "../hooks/useQueries";

const CATEGORIES = ["All", "High Protein", "Vegan", "Bulk"];
const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"];

function NutritionBar({
  label,
  value,
  max,
  color,
}: { label: string; value: number; max: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="font-semibold text-foreground">{value}g</span>
      </div>
      <div className="nutrition-bar">
        <div
          className="nutrition-bar-fill"
          style={{
            width: `${Math.min((value / max) * 100, 100)}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const price = (Number(item.priceCents) / 100).toFixed(2);
  const protein = Number(item.nutrition.proteinGrams);
  const calories = Number(item.nutrition.calories);
  const carbs = Number(item.nutrition.carbsGrams);
  const fat = Number(item.nutrition.fatGrams);
  const fiber = Number(item.nutrition.fiberGrams);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 6) * 0.07, duration: 0.4 }}
      data-ocid={`menu.item.${index + 1}`}
    >
      <Card className="overflow-hidden h-full border-border shadow-card card-hover">
        <div
          className="h-40 flex items-center justify-center relative"
          style={{
            background: `linear-gradient(135deg, oklch(${0.18 + (index % 4) * 0.04} 0.05 ${140 + (index % 5) * 12}), oklch(${0.32 + (index % 3) * 0.04} 0.09 ${150 + (index % 5) * 8}))`,
          }}
        >
          <span className="text-5xl">
            {["🥗", "🍗", "🥦", "🥩", "🐟", "🫘"][index % 6]}
          </span>
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/20 text-white border-white/20 text-xs">
              {item.category}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary text-primary-foreground text-sm font-bold">
              ${price}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5">
          <h3 className="font-display font-bold text-lg text-card-foreground mb-1">
            {item.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {item.description}
          </p>

          {/* Macro highlights */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "Protein", val: protein, highlight: true },
              { label: "Calories", val: calories, highlight: false },
              { label: "Carbs", val: carbs, highlight: false },
            ].map((m) => (
              <div
                key={m.label}
                className={`rounded-xl p-2.5 text-center ${
                  m.highlight
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-muted"
                }`}
              >
                <div
                  className={`text-base font-bold ${m.highlight ? "text-primary" : "text-foreground"}`}
                >
                  {m.val}
                </div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="space-y-2">
            <NutritionBar
              label="Fat"
              value={fat}
              max={40}
              color="oklch(0.70 0.15 65)"
            />
            <NutritionBar
              label="Fiber"
              value={fiber}
              max={20}
              color="oklch(0.65 0.14 155)"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function MenuPage() {
  const [category, setCategory] = useState("All");
  const { data: items, isLoading } = useMenuItemsByCategory(category);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div
        className="py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.15 0.04 145), oklch(0.25 0.07 148))",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 text-xs font-semibold tracking-widest uppercase">
            Our Menu
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-4">
            Built for your macros.
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Every meal engineered with optimal protein ratios and whole-food
            ingredients.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Category Tabs */}
        <Tabs value={category} onValueChange={setCategory} className="mb-10">
          <TabsList className="bg-muted p-1 h-auto flex-wrap gap-1">
            {CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                data-ocid="menu.category_tab"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Grid */}
        {isLoading ? (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="menu.loading_state"
          >
            {SKELETON_KEYS.map((k) => (
              <Card key={k} className="overflow-hidden">
                <Skeleton className="h-40" />
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-12" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !items || items.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="menu.empty_state"
          >
            <div className="text-5xl mb-4">🥗</div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              No items found
            </h3>
            <p className="text-muted-foreground">
              Try a different category or check back soon.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <MenuCard key={String(item.id)} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
