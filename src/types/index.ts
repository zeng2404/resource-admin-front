export type TagInsertRequestBody = {
    tagName: string;
    tagDescription?: string;
};

export type BookmarkInsertRequestBody = {
    bookmarkDescription: string;
    bookmarkUrl: string;
    tagIds: string[];
};

export type BookmarkUpdateRequestBody = {
    id: string;
} & BookmarkInsertRequestBody;

export type TagUpdateRequestBody = {
    id: string;
} & TagInsertRequestBody;

export type TableColumnProps = {
    columnName: string;
    width: number;
    align: "left" | "right" | "center" | undefined;
};

export type TagEntity = {
    id: string;
    tagName: string;
    tagDescription: string;
    createTime: Date;
    lastUpdateTime: Date;
}

export type BookmarkEntity = {
    bookmarkId: string;
    bookmarkDescription: string;
    bookmarkUrl: string;
    createTime: Date;
    lastUpdateTime: Date;
    tagIds: string;
    tagNames: string;
}

export type TagMenuItem = {
    id: string;
    tagName: string;

}
export type SelectOption = {
    value: string;
    text: string;
}