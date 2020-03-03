import {action, observable} from "mobx";
import {TagEntity, TagInsertRequestBody} from "../types";
import {stringUtils} from "../utils";
import stores from "./index";
import {corsPostRequestBody, corsRequestBody} from "../constants";
import axios from "axios";

export default class TagStore{
    @observable
    tagSaveDialogVisibility: boolean = false;
    @observable
    tagSaveDialogErrorArray: string[] = [];
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

    readonly selectType: string = "getTagsByCondition";

    readonly path = "tag";

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
        if(isVisible === true) {
            this.tagSaveDialogErrorArray = [];
        }
        this.tagSaveDialogVisibility = isVisible;
    }

    @action
    async saveInsertForm(tag: TagInsertRequestBody) {
        if (stringUtils.isNullOrEmpty(tag.tagName.trim()) ||
            stringUtils.hasStr(tag.tagName, ",") ||
            stringUtils.hasStr(tag.tagName, "，")
        ) {
            this.tagSaveDialogErrorArray.push("tagName");
        } else {
            const url = [stores.commonStore.serverUrl, this.path].join("/")
            axios.post(url, tag, corsPostRequestBody)
                .then(response => {
                    const statusCode = response.data.statusCode;
                    if (statusCode === 601) {
                        stores.commonStore.setSnackbarMessage("tag.duplicatedError", "error");
                    } else if (statusCode === 200) {
                        this.changeTagSaveDialogVisibilityStatus(false);
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
    async getTableData(){
        const url = [stores.commonStore.serverUrl, this.path].join("/")
        const requestConfig = {
            params: {
                condition: this.condition,
                conditionType: this.conditionType,
                pageSize: this.pageSize,
                currentPageNumber: this.currentPageNumber,
                selectType: this.selectType,
            },
            ...corsRequestBody
        }
        axios.get(url, requestConfig)
            .then(response => {
                const statusCode = response.data.statusCode;
                if(statusCode === 200) {
                   this.dataCount = response.data.total;
                   this.tableData = response.data.data;
                }
                else {
                    stores.commonStore.setSnackbarMessage("tag.getDataFail", "error");
                }
            })
            .catch(error => {
                console.error(error);
                stores.commonStore.setSnackbarMessage("tag.getDataFail", "error");
            })

    }

}