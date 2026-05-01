"use client";

import { useState, useMemo } from "react";
import { Item, Category } from "@/services/lender/query/item.service";
import { ItemCard } from "./item-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ItemGridProps {
  items: Item[];
  categories: Category[];
}

export function ItemGrid({ items = [], categories = [] }: ItemGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? item.categoryId === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className="sticky top-4 z-30 bg-background/80 backdrop-blur-xl p-4 rounded-3xl border shadow-xl flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search for cameras, drones, tents..."
            className="pl-11 h-12 bg-muted/50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="h-12 px-6 rounded-2xl font-bold border-2 hover:bg-primary hover:text-white hover:border-primary transition-all gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {selectedCategory && (
              <span className="ml-1 bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span>
            )}
          </Button>
          <Button className="h-12 px-8 rounded-2xl font-bold shadow-lg shadow-primary/20">
            Search
          </Button>
        </div>
      </div>

      {/* Category Filter Pills */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            className="rounded-full px-6 font-bold transition-all"
            onClick={() => setSelectedCategory(null)}
          >
            All Gear
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className="rounded-full px-6 font-bold transition-all"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
          {selectedCategory && (
             <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full gap-2 text-muted-foreground hover:text-destructive"
              onClick={() => setSelectedCategory(null)}
             >
               <X className="w-4 h-4" />
               Clear
             </Button>
          )}
        </div>
      )}

      {/* Filter Stats */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
          Showing {filteredItems.length} results
        </p>
      </div>

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <motion.div 
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed"
        >
          <div className="bg-muted p-6 rounded-full mb-4">
             <Search className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold">No gear found</h3>
          <p className="text-muted-foreground mt-2 max-w-xs text-center">
            {items.length === 0 
              ? "The gear library is currently empty. Check back later!"
              : `We couldn't find any results matching "${searchQuery}". Try adjusting your filters.`
            }
          </p>
          {items.length > 0 && (
            <Button 
              variant="link" 
              className="mt-4 font-bold"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
            >
              Clear all filters
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
}
