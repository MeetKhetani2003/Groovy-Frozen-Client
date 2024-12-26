const AuthContainer = ({ children }) => {
  return (
    <div className="flex bg-primaryBg justify-center items-center  min-h-screen">
      {children}
    </div>
  );
};

export default AuthContainer;
