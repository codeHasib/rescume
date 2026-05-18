import CommunityCo from "@/components/CommunityCo";
import FeaturedPets from "@/components/FeaturedPets";
import Hero from "@/components/Hero";
import IntegrationRule from "@/components/IntegrationRule";
import PetCareTips from "@/components/PetCareTips";
import SuccessStories from "@/components/SuccessStories";
import WhyAdoptCats from "@/components/WhyAdopt";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <FeaturedPets></FeaturedPets>
      <WhyAdoptCats></WhyAdoptCats>
      <SuccessStories></SuccessStories>
      <PetCareTips></PetCareTips>
      <IntegrationRule></IntegrationRule>
      <CommunityCo></CommunityCo>
    </>
  );
}
