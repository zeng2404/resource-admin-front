import bookmarkStyles from "./bookmarkStyles";
import tagStore from "../stores/tagStore";
import tagStyles from "./tagStyles";

const getStyle = (styleFileName: string): object => {
    switch (styleFileName) {
        case "bookmark":
            return bookmarkStyles;
        case "tag":
            return tagStyles;
        default:
            return {};
    }
}



export default getStyle;