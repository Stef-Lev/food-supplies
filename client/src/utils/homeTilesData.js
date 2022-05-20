import QueueIcon from "@material-ui/icons/Queue";
import GridOnIcon from "@material-ui/icons/GridOn";
import AssignmentIcon from "@material-ui/icons/Assignment";
import TouchAppIcon from "@material-ui/icons/TouchApp";

const tileColorsArray = ["#F487B6", "#4A76CF", "#57CFCB", "#F7C196"];

const homeTilesData = [
  {
    label: "Add Product",
    icon: <QueueIcon style={{ color: tileColorsArray[0] }} />,
    href: "/product",
  },
  {
    label: "Products List",
    icon: <AssignmentIcon style={{ color: tileColorsArray[1] }} />,
    href: `/user/lists`,
  },
  {
    label: "Overview",
    icon: <GridOnIcon style={{ color: tileColorsArray[2] }} />,
    href: `/user/overview`,
  },
  {
    label: "Test",
    icon: <TouchAppIcon style={{ color: tileColorsArray[3] }} />,
    href: `/user/test`,
  },
];

export { homeTilesData, tileColorsArray };
