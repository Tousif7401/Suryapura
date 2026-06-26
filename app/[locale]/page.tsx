import SiteHeader from '@/components/EnhancedSiteHeader';
import Hero from '@/components/Hero';
import PhotoSlider from '@/components/PhotoSlider';
import VillageGallery from '@/components/VillageGallery';
import ComprehensiveSchemes from '@/components/ComprehensiveSchemes';
import NoticeBoard from '@/components/NoticeBoard';
import SiteFooter from '@/components/EnhancedSiteFooter';
import MobileTabBar from '@/components/MobileTabBar';

export default function Home() {
  return (
    <div className="text-gray-800 antialiased pb-24 md:pb-0 transition-colors duration-300">
      <SiteHeader />
      <main>
        <Hero />
        <PhotoSlider />
        <VillageGallery />
        <ComprehensiveSchemes />
        <NoticeBoard />
        <SiteFooter />
      </main>
      <MobileTabBar />
    </div>
  );
}
