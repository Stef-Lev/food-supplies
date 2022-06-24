import QueueIcon from "@material-ui/icons/Queue";
import GridOnIcon from "@material-ui/icons/GridOn";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const tileColorsArray = ["#F487B6", "#4A76CF", "#57CFCB", "#F7C196"];

const homeTilesData = [
  {
    intlId: "home.page.tile.addProduct",
    defaultMsg: "Add Product",
    icon: <QueueIcon style={{ color: tileColorsArray[0] }} />,
    href: "/product",
  },
  {
    intlId: "header.comp.products",
    defaultMsg: "My Products",
    icon: <ShoppingCartIcon style={{ color: tileColorsArray[1] }} />,
    href: `/user/products`,
  },
  {
    intlId: "home.page.tile.lists",
    defaultMsg: "My Lists",
    icon: <AssignmentIcon style={{ color: tileColorsArray[2] }} />,
    href: `/user/lists`,
  },
  {
    intlId: "home.page.tile.reports",
    defaultMsg: "List Tables",
    icon: <GridOnIcon style={{ color: tileColorsArray[3] }} />,
    href: `/user/tables`,
  },
];

export { homeTilesData, tileColorsArray };
