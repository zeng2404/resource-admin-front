import CommonStore from "../stores/commonStore";
import BookmarkStore from "../stores/bookmarkStore";
import TagStore from "../stores/tagStore";

export default interface IStore {
    commonStore: CommonStore;
    bookmarkStore: BookmarkStore;
    tagStore: TagStore;
    classes?: any;
}