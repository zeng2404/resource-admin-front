import IRouteComponent from "./interfaces/IRouteComponent";
import Bookmark from "./pages/Bookmark";
import Tag from "./pages/Tag";

const routes: IRouteComponent[] = [
    {
        key: "bookmark",
        path: "/bookmark",
        component: Bookmark,
    },
    {
        key: "tag",
        path: "/tag",
        component: Tag,
    },
];

export default routes;

