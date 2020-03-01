import bookmarkStyles from "./bookmarkStyles";

const getStyle = (styleFileName: string): object => {
    switch (styleFileName) {
        case "bookmark":
            return bookmarkStyles;
        default:
            return {};
    }
}



export default getStyle;