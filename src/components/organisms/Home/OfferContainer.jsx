import OfferCard from '@/components/molicuels/OfferCard';
import { assets } from '@/utils/AssetImport';

const OfferContainer = () => {
  return (
    <div className=" lg:max-w-7xl mt-12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-4">
      <OfferCard
        className={'bg-[#D2EAEB]'}
        img={assets.cocktail}
        title={'special weekly offers'}
        heading={'Cocktails Summer'}
      />
      <OfferCard
        className={'bg-[#FFE4D7]'}
        img={assets.pineapple}
        title={'special offers'}
        heading={'fruit juice'}
      />
      <OfferCard
        object={'object-top'}
        className={'bg-[#D4DDF2]'}
        img={assets.noodle}
        title={'special offers'}
        heading={'noodles Recipes'}
      />
      <OfferCard
        className={'bg-[#F2DFDF]'}
        img={assets.cocktail}
        title={'special weekly offers'}
        heading={'Cocktail Summer'}
      />
    </div>
  );
};

export default OfferContainer;
