import CommonStore from "../stores/commonStore";

export default interface IStore {
    commonStore: CommonStore;
    classes ?: any;
}