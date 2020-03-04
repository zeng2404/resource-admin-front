import {action, observable} from "mobx";
import {TagEntity, TagInsertRequestBody, TagUpdateRequestBody} from "../types";
import {stringUtils} from "../utils";
import stores from "./index";
import {corsPostRequestBody, corsPutRequestBody, corsRequestBody} from "../constants";
import axios from "axios";

export default class TagStore {
    @observable
    tagSaveDialogVisibility: boolean = false;
    @observable
    tagSaveDialogErrorArray: string[] = [];
    @observable
    tagEditDialogErrorArray: string[] = [];
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
    conditionType: string = "";
    @observable
    tableData: TagEntity[] = [];
    @observable
    tagDeleteDialogVisibility: boolean = false;
    @observable
    currentHandleTag?: TagEntity = undefined;
    @observable
    tagEditDialogVisibility: boolean = false;
    @observable
    labelWidth: number = 0;

    readonly selectType: string = "getTagsByCondition";

    readonly path = "tag";

    @action
    setLabelWidth(labelWidth: number) {
        this.labelWidth = labelWidth;
    }

    @action
    handleConditionInputKeyDown(charCode: number, inputValue: string) {
        if(charCode === 13) {
            if(this.currentPageNumber !== 0) {
                this.currentPageNumber = 0;
            }
            else {
                this.getTableData();
            }
        }
    }

    @action
    setTagEditDialogVisibility(isVisible: boolean, currentHandleTag: TagEntity | undefined) {
        if(isVisible) {
            this.tagEditDialogErrorArray = [];
        }
        this.tagEditDialogVisibility = isVisible;
        this.currentHandleTag = currentHandleTag;
    }

    @action
    setTagDeleteDialogVisibility(isVisible: boolean, currentHandleTag: TagEntity | undefined) {
        this.tagDeleteDialogVisibility = isVisible;
        this.currentHandleTag = currentHandleTag;
    }

    @action
    handleDeleteDialogSubmit() {
        if(this.currentHandleTag) {
            this.deleteTag([this.currentHandleTag.id]);
        }
        else {
            this.batchDeleteTag();
        }
        this.setTagDeleteDialogVisibility(false, undefined);
    }

    @action
    setCondition(condition: string) {
        this.condition = condition;
    }

    @action
    setConditionType(conditionType: string) {
        this.conditionType = conditionType;
    }

    @action
    setDataCount(dataCount: number) {
        this.dataCount = dataCount;
    }

    @action
    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
    }

    @action
    setCurrentPageNumber(currentPageNumber: number) {
        this.currentPageNumber = currentPageNumber;
    }

    @action
    setSelection(selection: Array<number | string>) {
        this.selection = selection;
    }

    @action
    changeTagSaveDialogVisibilityStatus(isVisible: boolean) {
        if (isVisible) {
            this.tagSaveDialogErrorArray = [];
        }
        this.tagSaveDialogVisibility = isVisible;
    }

    @action
    batchDeleteTag() {
        this.deleteTag(this.selection);
    }

    @action
    deleteTag(tagIds: Array<string | number>) {
        const ids: string = tagIds.join(",");
        const url = [stores.commonStore.serverUrl, this.path, ids].join("/");
        axios.delete(url, corsRequestBody)
            .then(response => {
                const statusCode = response.data.statusCode;
                if (statusCode === 200) {
                    stores.commonStore.setSnackbarMessage("common.deleteSuccess", "success");
                    if (this.currentPageNumber !== 0 && this.currentPageNumber === (this.dataCount / this.pageSize)) {
                        if (tagIds.length >= this.dataCount % this.pageSize) {
                            this.currentPageNumber -= 1;
                        }
                    }
                    else {
                        this.getTableData();
                    }
                } else {
                    stores.commonStore.setSnackbarMessage("tag.deleteFail", "error");
                }
            })
            .catch(error => {
                console.error(error);
                stores.commonStore.setSnackbarMessage("tag.deleteFail", "error");
            })
    }


    @action
    async updateTag(tag: TagUpdateRequestBody) {
        if (stringUtils.isNullOrEmpty(tag.tagName.trim()) ||
            stringUtils.hasStr(tag.tagName, ",") ||
            stringUtils.hasStr(tag.tagName, "，")
        ) {
            this.tagEditDialogErrorArray.push("tagName");
        }
        else {
            if(this.currentHandleTag) {
                const url = [stores.commonStore.serverUrl, this.path, this.currentHandleTag.id].join("/");

                const requestBody = {
                    handleType: "updateTag",
                    tag,
                };

                axios.put(url, requestBody, corsPutRequestBody)
                    .then(response => {
                        const statusCode = response.data.statusCode;
                        if (statusCode === 601) {
                            stores.commonStore.setSnackbarMessage("tag.duplicatedError", "error");
                        } else if (statusCode === 200) {
                            this.setTagEditDialogVisibility(false, undefined);
                            stores.commonStore.setSnackbarMessage("common.editSuccess", "success");
                            this.getTableData();
                        } else {
                            stores.commonStore.setSnackbarMessage("tag.editFail", "error");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        stores.commonStore.setSnackbarMessage("tag.editFail", "error");
                    })

            }
        }

    }

    @action
    async saveInsertForm(tag: TagInsertRequestBody) {
        if (stringUtils.isNullOrEmpty(tag.tagName.trim()) ||
            stringUtils.hasStr(tag.tagName, ",") ||
            stringUtils.hasStr(tag.tagName, "，")
        ) {
            this.tagSaveDialogErrorArray.push("tagName");
        } else {
            const url = [stores.commonStore.serverUrl, this.path].join("/");
            axios.post(url, tag, corsPostRequestBody)
                .then(response => {
                    const statusCode = response.data.statusCode;
                    if (statusCode === 601) {
                        stores.commonStore.setSnackbarMessage("tag.duplicatedError", "error");
                    } else if (statusCode === 200) {
                        this.changeTagSaveDialogVisibilityStatus(false);
                        this.currentPageNumber = 0;
                        // this.getTableData();
                        stores.commonStore.setSnackbarMessage("common.addSuccess", "success");
                    } else {
                        stores.commonStore.setSnackbarMessage("tag.addFail", "error");
                    }
                })
                .catch(error => {
                    console.error(error);
                    stores.commonStore.setSnackbarMessage("tag.addFail", "error");
                });
        }
    }

    @action
    async getTableData() {
        const url = [stores.commonStore.serverUrl, this.path].join("/");
        const requestConfig = {
            params: {
                condition: this.condition,
                conditionType: this.conditionType,
                pageSize: this.pageSize,
                currentPageNumber: this.currentPageNumber,
                selectType: this.selectType,
            },
            ...corsRequestBody
        };
        axios.get(url, requestConfig)
            .then(response => {
                const statusCode = response.data.statusCode;
                if (statusCode === 200) {
                    this.dataCount = response.data.total;
                    this.tableData = response.data.data;
                    this.selection = [];
                } else {
                    stores.commonStore.setSnackbarMessage("tag.getDataFail", "error");
                }
            })
            .catch(error => {
                console.error(error);
                stores.commonStore.setSnackbarMessage("tag.getDataFail", "error");
            })

    }

}