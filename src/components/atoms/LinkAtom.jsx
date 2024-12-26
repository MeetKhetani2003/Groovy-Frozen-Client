import { Link } from 'react-router-dom';

const LinkAtom = ({
  title,
  url,
  type = 'default',
  customTextColor,
  customHoverTextColor,
  onClick,
}) => {
  return (
    <Link
      onClick={onClick}
      to={url}
      className={`${
        type === 'default'
          ? 'text-gray-800'
          : type === 'danger'
          ? 'text-red-600'
          : type === 'custom'
          ? customTextColor
          : ''
      } font-montserrat font-medium ${
        type === 'default'
          ? 'hover:text-main'
          : type === 'danger'
          ? 'hover:text-red-600'
          : type === 'custom'
          ? customHoverTextColor
          : ''
      } transition duration-200`}
    >
      {title}
    </Link>
  );
};

export default LinkAtom;
