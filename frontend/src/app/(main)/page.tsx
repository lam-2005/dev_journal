import HeroSection from "@/components/HeroSection";
import RecentPostsSection from "@/components/RecentPostsSection";
import TopAuthorSection from "@/components/TopAuthorSection";
import TrendingPostSection from "@/components/TrendingPostSection";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <TrendingPostSection />
      {/* <TopAuthorSection /> */}
      <RecentPostsSection />
    </div>
  );
};

export default Home;
