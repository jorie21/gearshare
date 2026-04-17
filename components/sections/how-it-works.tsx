"use client";

import { motion } from "framer-motion";

export function HowItWorks() {
  const steps = [
    { 
      step: '01', 
      title: 'Find Gear', 
      desc: 'Browse our community inventory and find exactly what you need for your next project or adventure.' 
    },
    { 
      step: '02', 
      title: 'Book & Pickup', 
      desc: 'Confirm availability, pay securely through GearShare, and coordinate a pickup with the owner.' 
    },
    { 
      step: '03', 
      title: 'Return & Rate', 
      desc: 'Drop off the gear when you&apos;re done and leave a review to help the community grow.' 
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Gear Sharing Made Easy</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Three simple steps to rent or list gear with total confidence.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-12 md:grid-cols-3 overflow-hidden">
          {steps.map((item, index) => (
            <motion.div 
              key={item.step} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-4"
            >
              <span className="text-5xl font-black text-accent/20 italic leading-none">{item.step}</span>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
