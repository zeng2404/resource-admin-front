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
        batchDeleteFabTip: "删除所选",
        getServerUrlFail: "获取服务器地址失败",
        addSuccess: "添加成功",
        createTime: "创建时间",
        lastUpdateTime: "最近修改时间",
        action: "操作",
        deleteSuccess: "删除成功",
        deleteFail: "删除失败",
        deleteFabTip: "删除",
        editFabTip: "修改",
        editSuccess: "修改成功",
        queryConditionLabel: "查询条件",
        queryConditionPlaceholder: "请输入查询条件",
        queryOptionLabel: "查询类型",
    },
    bookmark: {
        title: "书签管理",
    },
    tag: {
        title: "标签管理",
        addDialogTitle: "添加标签",
        deleteDialogTitle: "删除标签",
        editDialogTitle: "修改标签",
        tagNameLabel: "标签名*",
        tagName: "标签名",
        tagDescription: "标签描述",
        tagNameValidateErrorTip: "标签名不能为空或包含 ,(逗号)",
        addFail: "标签添加失败",
        duplicatedError: "标签添加失败,标签名已存在",
        getDataFail: "获取标签数据失败",
        jumpToBookmark: "跳转到书签",
        batchDeleteDialogTip: "你确定要删除选中的标签么?",
        deleteDialogTip: "你确定要删除 ",
        editFail: "修改标签失败",
    }
};

export default zh_CN;