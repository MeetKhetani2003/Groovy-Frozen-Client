import Hero from '@/components/organisms/Home/Hero';
import Menu from '@/components/organisms/Home/Menu';
import OfferContainer from '@/components/organisms/Home/OfferContainer';
import RecipeContainer from '@/components/organisms/Home/RecipeContainer';

const Home = () => {
  return (
    <div>
      <Hero />
      <OfferContainer />
      <Menu />
      <RecipeContainer />
    </div>
  );
};

export default Home;
