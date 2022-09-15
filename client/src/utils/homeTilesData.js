import GridOnIcon from "@material-ui/icons/GridOn";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";

const tileColorsArray = ["#F487B6", "#4A76CF", "#57CFCB", "#F7C196"];

const homeTilesData = [
  {
    intlId: "home.page.tile.lists",
    defaultMsg: "My Lists",
    icon: <AssignmentIcon style={{ color: tileColorsArray[0] }} />,
    href: `/user/lists`,
  },
  {
    intlId: "header.comp.shopping",
    defaultMsg: "My Products",
    icon: <ShoppingCartIcon style={{ color: tileColorsArray[1] }} />,
    href: `/user/products`,
  },
  {
    intlId: "home.page.tile.reports",
    defaultMsg: "Reports",
    icon: <GridOnIcon style={{ color: tileColorsArray[2] }} />,
    href: `/user/tables`,
  },
  {
    intlId: "home.page.tile.profile",
    defaultMsg: "Profile",
    icon: <PersonIcon style={{ color: tileColorsArray[3] }} />,
    href: "/product",
  },
];

export { homeTilesData, tileColorsArray };
