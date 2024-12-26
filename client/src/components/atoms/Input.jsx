export const TernaryData = (required, byDefault) => {
  return required !== undefined ? required : byDefault;
};

const Input = ({ type, placeholder, onChange, value, required, name }) => {
  return (
    <input
      className="px-4 py-2 w-full rounded-md"
      type={TernaryData(type, 'text')}
      placeholder={TernaryData(placeholder, 'Enter text')}
      onChange={onChange} // Use the passed onChange function
      value={value} // Bind the input value to state
      required={TernaryData(required, false)}
      name={name} // Ensure name attribute is passed
    />
  );
};

export default Input;
