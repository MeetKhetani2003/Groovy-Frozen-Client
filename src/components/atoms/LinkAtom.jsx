// eslint-disable-next-line simple-import-sort/imports
import { useLocation, Link } from 'react-router-dom';

const LinkAtom = ({
  title,
  url,
  type = 'default',
  customTextColor,
  customHoverTextColor,
  onClick,
}) => {
  const location = useLocation(); // Hook to get the current route path

  return (
    <Link
      onClick={onClick}
      to={url}
      className={`
        ${
          location.pathname === url
            ? `text-${customHoverTextColor || 'main'} hover:text-${
                customHoverTextColor || 'main'
              }`
            : ''
        }
        ${
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
