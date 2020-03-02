import {action, observable} from "mobx";
import {TagInsertRequestBody} from "../types";
import {stringUtils} from "../utils";
import stores from "./index";
import {corsPostRequestBody} from "../constants";
import axios from "axios";

export default class TagStore{
    @observable
    tagSaveDialogVisibility: boolean = false;
    @observable
    tagSaveDialogErrorArray: string[] = [];

    readonly path = "tag";

    @action
    changeTagSaveDialogVisibilityStatus(isVisible: boolean) {
        if(isVisible === true) {
            this.tagSaveDialogErrorArray = [];
        }
        this.tagSaveDialogVisibility = isVisible;
    }

    @action
    async saveInsertForm(tag: TagInsertRequestBody) {
        if(stringUtils.isNullOrEmpty(tag.tagName.trim()) ||
            stringUtils.hasStr(tag.tagName, ",") ||
            stringUtils.hasStr(tag.tagName, "，")
        ){
            this.tagSaveDialogErrorArray.push("tagName");
        }
        else {
            const url = [stores.commonStore.serverUrl, this.path].join("/")
            axios.post(url, tag, corsPostRequestBody)
                .then(response => {
                    const statusCode = response.data.statusCode;
                    if (statusCode === 601) {
                        stores.commonStore.setSnackbarMessage("intl_tag_name_duplicated_error", "error");
                    } else if (statusCode === 200) {
                        this.changeTagSaveDialogVisibilityStatus(false);
                        stores.commonStore.setSnackbarMessage("intl_add_success", "success");
                    } else {
                        stores.commonStore.setSnackbarMessage("intl_tag_add_fail", "error");
                    }
                })
                .catch(error => {
                    console.error(error);
                    stores.commonStore.setSnackbarMessage("intl_tag_add_fail", "error");
                });
        }
    }



}