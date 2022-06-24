import HomeIcon from "@material-ui/icons/Home";
import QueueIcon from "@material-ui/icons/Queue";
import AssignmentIcon from "@material-ui/icons/Assignment";
import GridOnIcon from "@material-ui/icons/GridOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LanguageIcon from "@material-ui/icons/Language";

const headerData = [
  {
    intlId: "header.comp.home",
    defaultMsg: "Home",
    icon: <HomeIcon />,
    href: "/",
  },
  {
    intlId: "header.comp.add",
    defaultMsg: "Add Product",
    icon: <QueueIcon />,
    href: "/product",
  },
  {
    intlId: "header.comp.products",
    defaultMsg: "My Products",
    icon: <ShoppingCartIcon />,
    href: `/user/products`,
  },
  {
    intlId: "header.comp.lists",
    defaultMsg: "My Lists",
    icon: <AssignmentIcon />,
    href: `/user/lists`,
  },
  {
    intlId: "header.comp.reports",
    defaultMsg: "Reports",
    icon: <GridOnIcon />,
    href: `/user/tables`,
  },
  {
    intlId: "home.page.tile.language",
    defaultMsg: "Reports",
    icon: <LanguageIcon />,
    href: `/user/language`,
  },
];

export { headerData };
