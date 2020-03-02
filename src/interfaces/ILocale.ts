export interface CommonIntlProps {
    snackbarDefaultMessage: string;
    drawerButtonTip: string;
    leftDrawerBookmark: string;
    leftDrawerTag: string;
    resetButtonValue: string;
    cancelButtonValue: string;
    submitButtonValue: string;
    addFabTip : string;
    getServerUrlFail: string;
    addSuccess: string;
    createTime: string;
    lastUpdateTime: string;
    action: string;
}

export interface BookmarkIntlProps {
    title: string;
}

export interface TagIntlProps {
    title: string;
    addDialogTitle: string;
    tagName: string;
    tagNameLabel: string;
    tagDescription: string;
    tagNameValidateErrorTip: string;
    addFail: string;
    duplicatedError: string;

}
export interface ILocale extends Record<string, any>{
    common: CommonIntlProps;
    bookmark: BookmarkIntlProps;
    tag: TagIntlProps;

}