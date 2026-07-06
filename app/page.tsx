import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import StatsCounter from "@/components/StatsCounter";
import QuickMenu from "@/components/QuickMenu";
import RegionGrid from "@/components/RegionGrid";
import OngoingExhibitions from "@/components/OngoingExhibitions";
import FeaturedPlaces from "@/components/FeaturedPlaces";
import PartnershipTeaser from "@/components/PartnershipTeaser";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsCounter />
        <QuickMenu />
        <RegionGrid />
        <OngoingExhibitions />
        <FeaturedPlaces />
        <PartnershipTeaser />
      </main>
      <Footer />
    </>
  );
}
