import CommonStore from "./commonStore"
import BookmarkStore from "./bookmarkStore";
import TagStore from "./tagStore";

let commonStore: CommonStore = new CommonStore();
let bookmarkStore: BookmarkStore = new BookmarkStore(commonStore);
let tagStore: TagStore = new TagStore(commonStore);


const stores = {
    commonStore,
    bookmarkStore,
    tagStore,
};

export default stores;

