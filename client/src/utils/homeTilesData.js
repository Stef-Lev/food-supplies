import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import QueueIcon from "@material-ui/icons/Queue";
import TableChartIcon from "@material-ui/icons/TableChart";

const tileColorsArray = ["#F487B6", "#4A76CF", "#57CFCB", "#F7C196"];

const homeTilesData = [
  {
    label: "Add Product",
    icon: <QueueIcon style={{ color: tileColorsArray[0] }} />,
    href: "/product",
  },
  {
    label: "Products List",
    icon: <FormatListNumberedIcon style={{ color: tileColorsArray[1] }} />,
    href: `/user/list`,
  },
  {
    label: "Overview",
    icon: <TableChartIcon style={{ color: tileColorsArray[2] }} />,
    href: `/user/overview`,
  },
  {
    label: "Overview",
    icon: <TableChartIcon style={{ color: tileColorsArray[3] }} />,
    href: `/user/overview`,
  },
];

export { homeTilesData, tileColorsArray };
