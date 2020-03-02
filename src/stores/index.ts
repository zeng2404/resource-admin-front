import CommonStore from "./commonStore"
import BookmarkStore from "./bookmarkStore";
import TagStore from "./tagStore";

let commonStore: CommonStore = new CommonStore();
let bookmarkStore: BookmarkStore = new BookmarkStore();
let tagStore: TagStore = new TagStore();


const stores = {
    commonStore,
    bookmarkStore,
    tagStore,
};

export default stores;

