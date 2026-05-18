import FeaturedPets from "@/components/FeaturedPets";
import Hero from "@/components/Hero";
import StaticMarketingSections from "@/components/StaticMarketingSection";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <FeaturedPets></FeaturedPets>
      <StaticMarketingSections></StaticMarketingSections>
    </>
  );
}
