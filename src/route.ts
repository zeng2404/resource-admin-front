import IRouteComponent from "./interfaces/IRouteComponent";
import Bookmark from "./pages/Bookmark";

const routes: IRouteComponent[] = [
    {
        key: "bookmark",
        path: "/bookmark",
        component: Bookmark,
        styleFileName: "bookmark",
    }
];

export default routes;

