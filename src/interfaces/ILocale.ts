export interface CommonIntlProps {
    snackbarDefaultMessage: string;
    drawerButtonTip: string;
    leftDrawerBookmark: string;
    leftDrawerTag: string;
    resetButtonValue: string;
    cancelButtonValue: string;
    submitButtonValue: string;
    addFabTip : string;
    batchDeleteFabTip: string;
    getServerUrlFail: string;
    addSuccess: string;
    addFail: string;
    createTime: string;
    lastUpdateTime: string;
    action: string;
    deleteSuccess: string;
    deleteFail: string;
    deleteFabTip: string;
    editFabTip: string;
    editSuccess: string;
    queryConditionLabel: string;
    queryConditionPlaceholder: string;
    queryOptionLabel: string;
    allConditionType: string;
    copyFabTip: string;
    editFail: string;
    deleteDialogTip: string;
    searchFabTip: string;
}

export interface BookmarkIntlProps {
    title: string;
    addDialogTitle: string;
    deleteDialogTitle: string;
    editDialogTitle: string;
    bookmarkDescription: string;
    bookmarkDescriptionLabel: string;
    bookmarkUrl: string;
    bookmarkUrlLabel: string;
    bookmarkDescriptionEmptyErrorTip: string;
    bookmarkUrlEmptyErrorTip: string;
    tag: string;
    getTagMenuFail: string;
    getDataFail: string;
    copyURLFabTip: string;
    jumpToURLFabTip: string;
    batchDeleteDialogTip: string;
}

export interface TagIntlProps {
    title: string;
    addDialogTitle: string;
    deleteDialogTitle: string;
    editDialogTitle: string;
    tagName: string;
    tagNameLabel: string;
    tagDescription: string;
    tagNameValidateErrorTip: string;
    addFail: string;
    duplicatedError: string;
    getDataFail: string;
    jumpToBookmark: string;
    batchDeleteDialogTip: string;
    editFail: string;

}
export interface ILocale extends Record<string, any>{
    common: CommonIntlProps;
    bookmark: BookmarkIntlProps;
    tag: TagIntlProps;

}