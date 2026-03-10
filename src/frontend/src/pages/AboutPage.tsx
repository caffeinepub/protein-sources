import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Leaf, MapPin, Target, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Quality First",
    desc: "We partner with certified farms and suppliers to ensure every ingredient meets our rigorous standards. No compromises.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Convenience by Design",
    desc: "Every meal is engineered for your schedule. From batch prep to single-serve, protein nutrition is always within reach.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Nutritional Excellence",
    desc: "Our dietitians and chefs collaborate to craft meals that hit optimal macro ratios — without sacrificing taste.",
  },
];

const timeline = [
  {
    year: "2021",
    event: "Founded in San Francisco by two nutrition-obsessed engineers",
    done: true,
  },
  {
    year: "2022",
    event: "Launched first 10 menu items, served 5,000 customers",
    done: true,
  },
  { year: "2023", event: "Expanded to Los Angeles and Portland", done: true },
  {
    year: "2024",
    event: "Hit $2M ARR, partnership with 3 university campuses",
    done: true,
  },
  {
    year: "2025",
    event: "Launching in 10 new cities including NYC, Chicago, Austin",
    done: false,
  },
  {
    year: "2026",
    event: "National coverage with same-day delivery",
    done: false,
  },
];

export default function AboutPage() {
  return (
    <div data-ocid="about.page">
      {/* Hero */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.15 0.04 145), oklch(0.25 0.07 148))",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 text-xs font-semibold tracking-widest uppercase">
              Our Story
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white leading-tight mb-6 max-w-3xl">
              Built for those who{" "}
              <span className="text-primary">demand more</span> from their
              meals.
            </h1>
            <p className="text-white/60 text-xl max-w-xl leading-relaxed">
              We believe high-quality protein nutrition shouldn't be a luxury —
              it should be the default for everyone chasing their potential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="outline"
                className="mb-4 text-primary border-primary/30 font-semibold tracking-widest text-xs uppercase"
              >
                Origin Story
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                From a dorm kitchen to a movement.
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  It started in 2021 when co-founders Maya Chen and Jordan Park
                  were both finishing their engineering degrees at UC Berkeley.
                  Between 18-hour study sessions and internship deadlines,
                  eating well felt impossible.
                </p>
                <p>
                  The campus cafeteria offered carb-heavy comfort food; the
                  protein bars were chalky and expensive. So Maya and Jordan
                  started meal prepping in their dorm kitchen —
                  precision-portioned, high-protein meals that could be grabbed
                  on the go.
                </p>
                <p>
                  Their hallmates noticed. Then their friends. Then their
                  friends' friends. Within a semester, they were meal prepping
                  for 80 students weekly. Protein Sources was born.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div
                className="rounded-3xl overflow-hidden aspect-[4/3]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.18 0.05 145), oklch(0.35 0.10 155))",
                }}
              >
                <img
                  src="/assets/generated/ingredients-flatlay.dim_800x600.jpg"
                  alt="Premium ingredients"
                  className="w-full h-full object-cover opacity-90"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-display font-bold text-xl text-foreground">
                      10,000+
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Happy customers
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="mb-4 text-primary border-primary/30 font-semibold tracking-widest text-xs uppercase"
            >
              Our Values
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              The principles behind every meal.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="bg-card border border-border rounded-2xl p-8 shadow-card card-hover"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                  {v.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-card-foreground mb-3">
                  {v.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expansion Timeline */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="mb-4 text-primary border-primary/30 font-semibold tracking-widest text-xs uppercase"
            >
              Expansion Plans
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Protein Sources is going national.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              From a Berkeley dorm to kitchens across America. Our growth
              journey.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className="flex gap-6 mb-8 last:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.done
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted border-2 border-dashed border-primary/40 text-primary"
                    }`}
                  >
                    {item.done ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </div>
                  {i < timeline.length - 1 && (
                    <div
                      className={`w-0.5 flex-1 mt-2 ${
                        item.done ? "bg-primary/30" : "bg-border"
                      }`}
                      style={{ minHeight: "32px" }}
                    />
                  )}
                </div>
                <div className="pb-8">
                  <span className="font-display font-bold text-primary text-sm">
                    {item.year}
                  </span>
                  <p
                    className={`text-base mt-1 ${
                      item.done ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
