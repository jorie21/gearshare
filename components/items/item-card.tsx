"use client";

import Image from "next/image";
import { Star, Clock } from "lucide-react";
import { Item } from "@/services/lender/query/item.service";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.imageUrl || "/file.svg"}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Badge variant={item.status === 'available' ? 'default' : 'secondary'} className="capitalize shadow-sm">
              {item.status}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3">
             <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                {item.rating}
             </div>
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2 h-10">
            {item.description}
          </p>
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground font-medium">
             <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Instant Booking</span>
             </div>
             <span>•</span>
             <span>{item.reviewsCount} reviews</span>
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-primary">${item.pricePerDay}</span>
            <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider ml-1">/ day</span>
          </div>
          <Button size="sm" className="rounded-full px-5 font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
            Rent Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
