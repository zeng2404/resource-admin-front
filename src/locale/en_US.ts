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
        batchDeleteFabTip: "Delete Selected",
        getServerUrlFail: "Get Server Url Error",
        addSuccess: "Add successfully",
        createTime: "Create Time",
        lastUpdateTime: "Last Update Time",
        action: "Action",
        deleteSuccess: "Delete Success",
        deleteFail: "Delete Fail",
        deleteFabTip: "Delete",
        editFabTip: "Edit",
        editSuccess: "Edit Success",
        queryConditionLabel: "Query Condition",
        queryConditionPlaceholder: "Enter search conditions",
        queryOptionLabel: "Query Option",
    },
    bookmark: {
        title: "Bookmark Management",
    },
    tag: {
        title: "Tag Management",
        addDialogTitle: "Add Tag",
        deleteDialogTitle: "Delete Tag",
        editDialogTitle: "Edit Tag",
        tagNameLabel: "Tag Name*",
        tagName: "Tag Name",
        tagDescription: "Tag Description",
        tagNameValidateErrorTip: "tag name cannot be empty or contains ,(comma)",
        addFail: "Adding labels failed",
        duplicatedError: "Add failed,Tag Name already exist",
        getDataFail: "Get Tag Data Fail",
        jumpToBookmark: "Jump To Bookmark",
        batchDeleteDialogTip: "Are you sure you want to delete the selected tag ?",
        deleteDialogTip: "Are you sure you want to delete ",
        editFail: "Edit Tag Fail",
    }

};

export default en_US;