import CommonStore from "./commonStore"
import BookmarkStore from "./bookmarkStore";

let commonStore: CommonStore = new CommonStore();
let bookmarkStore: BookmarkStore = new BookmarkStore();


const stores = {
    commonStore,
    bookmarkStore,
};

export default stores;

