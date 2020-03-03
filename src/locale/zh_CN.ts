import {ILocale} from "../interfaces/ILocale";

const zh_CN: ILocale = {
    common: {
        snackbarDefaultMessage: "这是 Snackbar 的默认信息!!!",
        drawerButtonTip: "打开 | 关闭抽屉",
        leftDrawerBookmark: "书签管理",
        leftDrawerTag: "标签管理",
        resetButtonValue: "重置",
        cancelButtonValue: "取消",
        submitButtonValue: "确认",
        addFabTip: "添加",
        getServerUrlFail: "获取服务器地址失败",
        addSuccess: "添加成功",
        createTime: "创建时间",
        lastUpdateTime: "最近修改时间",
        action: "操作",
    },
    bookmark: {
        title: "书签管理",
    },
    tag: {
        title: "标签管理",
        addDialogTitle: "添加标签",
        tagNameLabel: "标签名*",
        tagName: "标签名",
        tagDescription: "标签描述",
        tagNameValidateErrorTip: "标签名不能为空或包含 ,(逗号)",
        addFail: "标签添加失败",
        duplicatedError: "标签添加失败,标签名已存在",
        getDataFail: "获取标签数据失败",
    }
};

export default zh_CN;