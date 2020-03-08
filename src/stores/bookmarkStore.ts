import {action, computed, observable} from "mobx";
import {corsPostRequestBody, corsPutRequestBody, corsRequestBody} from "../constants";
import axios from "axios";
import {BookmarkEntity, BookmarkInsertRequestBody, BookmarkUpdateRequestBody, TagMenuItem} from "../types";
import {stringUtils} from "../utils";
import copy from "copy-to-clipboard";
import CommonStore from "./commonStore";

class BookmarkStore {
    commonStore: CommonStore;

    constructor(commonStore: CommonStore) {
        this.commonStore = commonStore;
    }

    @observable
    bookmarkSaveDialogVisibility: boolean = false;
    @observable
    bookmarkEditDialogVisibility: boolean = false;
    @observable
    bookmarkDeleteDialogVisibility: boolean = false;
    @observable
    bookmarkSaveErrorArray: string[] = [];
    @observable
    bookmarkEditErrorArray: string[] = [];
    @observable
    selection: Array<number | string> = [];
    @observable
    dataCount: number = 0;
    @observable
    pageSize: number = 10;
    @observable
    currentPageNumber: number = 0;
    @observable
    condition: string = "";
    @observable
    conditionType: string = "bookmarkDescription";
    @observable
    tableData: BookmarkEntity[] = [];
    @observable
    currentHandleBookmark?: BookmarkEntity = undefined;
    @observable
    tagMenu: TagMenuItem[] = [];
    @observable
    tagSelection: TagMenuItem[] = [];
    @observable
    editTagSelection: TagMenuItem[] = [];
    @observable
    labelWidth: number = 0;
    @observable
    queryTagSelection: TagMenuItem[] = [];
    @observable
    tagQueryType: "OR" | "AND" = "OR";

    readonly path = "bookmark";

    readonly tagPath = "tag";

    readonly tagSelectionType = "getTagMenuList";

    readonly selectType = "selectBookmarks";

    @computed get submitCondition(): string {
        if (this.conditionType === "tags") {
            const tagIds: string[] = this.queryTagSelection.flatMap((item) => item.id);
            return tagIds.join(",");

        } else {
            return this.condition;
        }
    }

    @computed get submitConditionType(): string {
        if (this.conditionType === "tags") {
            if (this.tagQueryType === "OR") {
                return "tagId-or";
            } else {
                return "tagId-and";
            }
        } else {
            return this.conditionType;
        }
    }

    @action
    setCondition(condition: string) {
        console.log(condition);
        this.condition = condition;
    }

    @action
    setTagQueryType(isOr: boolean) {
        if (isOr) {
            this.tagQueryType = "OR";
        } else {
            this.tagQueryType = "AND";
        }
    }

    @action
    setQueryTagSelection(items: TagMenuItem[]) {
        this.queryTagSelection = items;
    }

    @action
    setEditTagSelection(tagMenuItems: TagMenuItem[]) {
        this.editTagSelection = tagMenuItems;
    }

    @action
    setLabelWidth(width: number) {
        this.labelWidth = width;
    }

    @action
    setConditionType(conditionType: string) {
        this.conditionType = conditionType;
    }

    @action
    setBookmarkDeleteDialogVisibility(isVisible: boolean, currentHandleBookmark: BookmarkEntity | undefined) {
        this.currentHandleBookmark = currentHandleBookmark;
        this.bookmarkDeleteDialogVisibility = isVisible;
    }

    @action
    deleteBookmarks(tagIds: Array<string | number>) {
        const ids: string = tagIds.join(",");
        const url = [this.commonStore.serverUrl, this.path, ids].join("/");
        axios.delete(url, corsRequestBody)
            .then(response => {
                const statusCode = response.data.statusCode;
                if (statusCode === 200) {
                    this.commonStore.setSnackbarMessage("common.deleteSuccess", "success");
                    this.getTableData();
                } else {
                    this.commonStore.setSnackbarMessage("common.deleteFail", "error");
                }
            })
            .catch(error => {
                console.error("error: " + error);
                this.commonStore.setSnackbarMessage("common.deleteFail", "error");
            })
    }

    @action
    handleDeleteDialogSubmit() {
        if (this.currentHandleBookmark) {
            this.deleteBookmarks([this.currentHandleBookmark.bookmarkId]);
        } else {
            this.deleteBookmarks(this.selection);
        }
        this.setBookmarkDeleteDialogVisibility(false, undefined);
    }

    @action
    setBookmarkEditDialogVisibility(isVisible: boolean, currentHandleBookmark: BookmarkEntity | undefined) {
        this.currentHandleBookmark = currentHandleBookmark;
        const tagMenuItems: TagMenuItem[] = [];
        if (currentHandleBookmark) {
            currentHandleBookmark.tagIds.split(",")
                .forEach((item) => {
                    tagMenuItems.push({
                        id: item,
                        tagName: "",
                    })
                });
            currentHandleBookmark.tagNames.split(",")
                .forEach((item, index) => {
                    tagMenuItems[index].tagName = item;
                });
            this.editTagSelection = tagMenuItems;
        }
        this.bookmarkEditDialogVisibility = isVisible;
    }

    @action
    copy(copyContent: string) {
        console.log(copyContent);
        copy(copyContent);
    }

    @action
    handleSearchButtonClick() {
        if (this.currentPageNumber !== 0) {
            this.currentPageNumber = 0;
        } else {
            this.getTableData();
        }
    }

    @action
    getTableData() {
        const url = [this.commonStore.serverUrl, this.path].join("/");
        const requestConfig = {
            params: {
                condition: this.submitCondition,
                conditionType: this.submitConditionType,
                pageSize: this.pageSize,
                currentPageNumber: this.currentPageNumber,
                selectType: this.selectType,
            },
            ...corsRequestBody,
        };
        axios.get(url, requestConfig)
            .then(response => {
                const statusCode = response.data.statusCode;
                if (statusCode === 200) {
                    this.dataCount = response.data.total;
                    this.tableData = response.data.data;
                    this.selection = [];
                } else {
                    this.commonStore.setSnackbarMessage("bookmark.getDataFail", "error");
                }
            })
            .catch(error => {
                console.error(error);
                this.commonStore.setSnackbarMessage("bookmark.getDataFail", "error");
            })
    }

    @action
    setCurrentPageNumber(currentPageNumber: number) {
        this.currentPageNumber = currentPageNumber;
    }

    @action
    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
    }

    @action
    setSelection(selection: Array<number | string>) {
        this.selection = selection;
    }

    @action
    setTagSelection(selection: TagMenuItem[]) {
        this.tagSelection = selection;
    }

    @action
    getIdsFromTagSelection(selection: TagMenuItem[]) {
        const ids: string[] = selection.flatMap((item) => item.id);
        return ids;
    }

    @action
    setBookmarkSaveDialogVisibilityStatus(isVisible: boolean) {
        if (isVisible) {
            this.bookmarkSaveErrorArray = [];
        }
        this.bookmarkSaveDialogVisibility = isVisible;
    }

    @action
    updateBookmark(bookmark: BookmarkUpdateRequestBody) {
        let validateSuccess: boolean = true;
        if (stringUtils.isNullOrEmpty(bookmark.bookmarkDescription)) {
            this.bookmarkEditErrorArray.push("bookmarkDescription");
            validateSuccess = false;
        }
        if (stringUtils.isNullOrEmpty(bookmark.bookmarkUrl)) {
            this.bookmarkEditErrorArray.push("bookmarkUrl");
            validateSuccess = false;
        }
        if (validateSuccess) {
            const ids: string[] = [];
            this.editTagSelection.forEach((item) => {
                if (!ids.includes(item.id)) {
                    ids.push(item.id);
                }
            });
            bookmark.tagIds = ids;
            bookmark.id = this.currentHandleBookmark!.bookmarkId;
            const url = [this.commonStore.serverUrl, this.path, ids.join(",")].join("/");

            const requestBody = {
                handleType: "updateBookmark",
                bookmark,
            };

            axios.put(url, requestBody, corsPutRequestBody)
                .then(response => {
                    const statusCode = response.data.statusCode;
                    if (statusCode === 200) {
                        this.commonStore.setSnackbarMessage("common.editSuccess", "success");
                        this.setBookmarkEditDialogVisibility(false, undefined);
                        this.getTableData();
                    } else {

                        this.commonStore.setSnackbarMessage("common.editFail", "error");
                    }
                })
                .catch(error => {
                    console.error(error);
                    this.commonStore.setSnackbarMessage("common.editFail", "error");
                })


        }
    }

    @action
    saveBookmark(bookmarkBody: BookmarkInsertRequestBody) {
        let validateSuccess: boolean = true;
        if (stringUtils.isNullOrEmpty(bookmarkBody.bookmarkDescription)) {
            this.bookmarkSaveErrorArray.push("bookmarkDescription");
            validateSuccess = false;
        }
        if (stringUtils.isNullOrEmpty(bookmarkBody.bookmarkUrl)) {
            this.bookmarkSaveErrorArray.push("bookmarkUrl");
            validateSuccess = false;
        }
        if (validateSuccess) {
            const url = [this.commonStore.serverUrl, this.path].join("/");
            axios.post(url, bookmarkBody, corsPostRequestBody)
                .then(response => {
                    const statusCode = response.data.statusCode;
                    if (statusCode === 200) {
                        this.setBookmarkSaveDialogVisibilityStatus(false);
                        this.getTableData();
                        this.commonStore.setSnackbarMessage("common.addSuccess", "success");
                    } else {
                        this.commonStore.setSnackbarMessage("common.addFail", "error");
                    }
                })
                .catch(error => {
                    console.error("error: " + error);
                    this.commonStore.setSnackbarMessage("common.addFail", "error");
                });
        }
    }

    @action
    getTagMenuList() {
        const url = [this.commonStore.serverUrl, this.tagPath].join("/");
        const requestConfig = {
            params: {
                selectType: this.tagSelectionType,
                condition: "",
                conditionType: "",
                currentPageNumber: 0,
                pageSize: 0,
            },
            ...corsRequestBody,
        };
        axios.get(url, requestConfig)
            .then(response => {
                const statusCode = response.data.statusCode;
                if (statusCode === 200) {
                    this.tagMenu = response.data.data;
                } else {
                    this.commonStore.setSnackbarMessage("bookmark.getTagMenuFail", "error");
                }
            })
            .catch(error => {
                console.error(error);
                this.commonStore.setSnackbarMessage("bookmark.getTagMenuFail", "error");
            });
    }
}

export default BookmarkStore;