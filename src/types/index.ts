export type TagInsertRequestBody = {
    tagName: string;
    tagDescription?: string;
};

export type TagUpdateRequestBody = {
    id: string;
} & TagInsertRequestBody;

export type BasicSelectRequestBody = {
    condition: string;
    conditionType: string;
    pageSize: number;
    currentPageSize: number;
};

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

export type SelectOption = {
    value: string;
    text: string;
}