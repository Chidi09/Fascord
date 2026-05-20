import React from 'react';
import dynamic from 'next/dynamic';
import TopBanner from '@/components/layout/TopBanner';
import Navbar from '@/components/layout/Navbar';
import StatsBar from '@/components/home/StatsBar';
import ServicesGrid from '@/components/home/ServicesGrid';
import SendingOptions from '@/components/home/SendingOptions';
import ServiceFeatures from '@/components/home/ServiceFeatures';
import WhyUs from '@/components/home/WhyUs';
import HelpfulTools from '@/components/home/HelpfulTools';
import Destinations from '@/components/home/Destinations';
import BusinessHub from '@/components/home/BusinessHub';
import CTASection from '@/components/home/CTASection';
import ReviewsStrip from '@/components/home/ReviewsStrip';
import Footer from '@/components/layout/Footer';

// HeroSection uses useRouter() which must NOT run during SSR prerender.
// Loading it client-only prevents "Router action dispatched before initialization"
// errors that silently break hydration for ALL client components on the page.
const HeroSection = dynamic(() => import('@/components/home/HeroSection'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '520px', background: 'var(--color-primary-dark)' }} />,
});

export default function Home() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <HeroSection />
        <StatsBar />
        <ServicesGrid />
        <SendingOptions />
        <ServiceFeatures />
        <WhyUs />
        <HelpfulTools />
        <Destinations />
        <BusinessHub />
        <CTASection />
        <ReviewsStrip />
      </main>
      <Footer />
    </>
  );
}


