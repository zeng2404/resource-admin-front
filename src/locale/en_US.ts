import {ILocale} from "../interfaces/ILocale";

const en_US: ILocale = {
    common: {
        snackbarDefaultMessage: "This is Snackbar default message!!!",
        drawerButtonTip: "open | close drawer",
        leftDrawerBookmark: "Bookmark",
        leftDrawerTag: "Tag",
        resetButtonValue: "Reset",
        cancelButtonValue: "Cancel",
        submitButtonValue: "Submit",
        addFabTip: "Add",
        getServerUrlFail: "Get Server Url Error",
        addSuccess: "Add successfully",
        createTime: "Create Time",
        lastUpdateTime: "Last Update Time",
        action: "Action",
    },
    bookmark: {
        title: "Bookmark Management",
    },
    tag: {
        title: "Tag Management",
        addDialogTitle: "Add Tag",
        tagNameLabel: "Tag Name*",
        tagName: "Tag Name",
        tagDescription: "Tag Description",
        tagNameValidateErrorTip: "tag name cannot be empty or contains ,(comma)",
        addFail: "Adding labels failed",
        duplicatedError: "Adding labels failed, Tag Name already exist",
    }

};

export default en_US;