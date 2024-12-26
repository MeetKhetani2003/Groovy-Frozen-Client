import { Link } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MyDrpDwn = ({ content }) => {
  return (
    <div className=" font-montserrat">
      <DropdownMenu>
        {content.map((item, index) => (
          <div key={index}>
            <DropdownMenuTrigger className="border-none hover:text-main transition-all duration-300 outline-none">
              {item.title}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              {item.menus.map((menu, index) => (
                <DropdownMenuItem key={index}>
                  <Link to={menu.url}>{menu.title}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </div>
        ))}
      </DropdownMenu>
    </div>
  );
};

export default MyDrpDwn;
