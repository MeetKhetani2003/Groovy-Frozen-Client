const Logo = ({ classname }) => {
  return (
    <div className="flex items-center">
      <span
        className={`font-bold Mexcellent3d ${
          classname ? classname : 'text-5xl'
        } text-main tracking-widest`}
      >
        GROOVY
      </span>
    </div>
  );
};

export default Logo;
