const RecipeCard = ({ img, heading, dec }) => {
  return (
    <div>
      <div>
        <img
          className="w-full max-h-64 object-cover rounded-2xl shadow-xl shadow-gray-100"
          src={img}
          alt="recipe"
        />
        <p className="mt-7 uppercase font-serif text-xl  text-center ">
          {heading}
        </p>
        <p className="text-gray-600 text-center font-montserrat">{dec}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
