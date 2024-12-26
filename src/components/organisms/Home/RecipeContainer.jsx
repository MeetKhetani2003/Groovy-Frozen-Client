import RecipeCard from '@/components/molicuels/RecipeCard';
import { assets } from '@/utils/AssetImport';

const RecipeContainer = () => {
  return (
    <div className="mt-20 mx-8 lg:max-w-7xl lg:mx-auto ">
      <h1 className="text-5xl uppercase font-semibold font-serif text-center ">
        recipes & tips
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 mt-24">
        <RecipeCard
          img={assets.re1}
          heading={'Sweet orange yellow from Australia'}
          dec={'2021-08-27  No Comments'}
        />
        <RecipeCard
          img={assets.re1}
          heading={'Sweet orange yellow from Australia'}
          dec={'2021-08-27  No Comments'}
        />
        <RecipeCard
          img={assets.re1}
          heading={'Sweet orange yellow from Australia'}
          dec={'2021-08-27  No Comments'}
        />
        <RecipeCard
          img={assets.re1}
          heading={'Sweet orange yellow from Australia'}
          dec={'2021-08-27  No Comments'}
        />
        <RecipeCard
          img={assets.re1}
          heading={'Sweet orange yellow from Australia'}
          dec={'2021-08-27  No Comments'}
        />
        <RecipeCard
          img={assets.re1}
          heading={'Sweet orange yellow from Australia'}
          dec={'2021-08-27  No Comments'}
        />
      </div>
    </div>
  );
};

export default RecipeContainer;
