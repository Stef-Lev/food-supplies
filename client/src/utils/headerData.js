import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import QueueIcon from "@material-ui/icons/Queue";
import AssignmentIcon from "@material-ui/icons/Assignment";
import GridOnIcon from "@material-ui/icons/GridOn";

const headerData = [
  {
    label: "Home",
    icon: <HomeIcon />,
    href: "/",
  },
  {
    label: "Add Product",
    icon: <QueueIcon />,
    href: "/product",
  },
  {
    label: "Lists",
    icon: <AssignmentIcon />,
    href: `/user/lists`,
  },
  {
    label: "Overview",
    icon: <GridOnIcon />,
    href: `/user/tables`,
  },
  {
    label: "Logout",
    icon: <ExitToAppIcon />,
    href: "/logout",
  },
];

export { headerData };
