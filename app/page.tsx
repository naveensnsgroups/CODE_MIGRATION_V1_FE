'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/common/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">  
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Migrate Legacy Code <br />
            <span className="bg-gradient-to-r from-muted to-foreground bg-clip-text text-transparent">
              With AI Intelligence.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg mb-12 opacity-70 leading-relaxed">
            Revolutionize your transformation journey. Our platform analyzes, 
            architects, and modernizes your legacy applications with 
            enterprise-grade AI precision.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button className="px-10 h-14 text-base shadow-xl shadow-primary/10">
                Launch Dashboard
              </Button>
            </Link>
            <Button variant="outline" className="px-10 h-14 text-base">
              Explore Docs
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
