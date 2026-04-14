import AboutUsSection from "@/components/AboutUsSection";
import HeroSection from "@/components/HeroSection";
import RecentPostsSection from "@/components/RecentPostsSection";
import TrendingSection from "@/components/TrendingSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutUsSection />
      <TrendingSection />
      <RecentPostsSection />
    </div>
  );
};

export default Home;
