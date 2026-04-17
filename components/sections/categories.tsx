"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  { name: 'Outdoor & Camping', count: 24 },
  { name: 'Photography', count: 18 },
  { name: 'Audio Gear', count: 12 },
  { name: 'Power Tools', count: 15 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

export function Categories() {
  return (
    <section className="bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-end justify-between gap-4 md:flex-row md:items-center"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Popular Categories</h2>
            <p className="mt-2 text-muted-foreground">The most shared gear in the community this week.</p>
          </div>
          <Link href="/categories" className="font-bold text-accent hover:underline">
            View all Categories →
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-100px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((cat) => (
            <motion.div key={cat.name} variants={itemVariants}>
              <CategoryCard name={cat.name} count={cat.count} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CategoryCard({ name, count }: { name: string, count: number }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-card transition-shadow hover:shadow-2xl cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-sm text-zinc-300">{count}+ Items available</p>
      </div>
    </motion.div>
  );
}
