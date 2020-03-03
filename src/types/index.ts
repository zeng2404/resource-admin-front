import {ReactElement} from "react";

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

export type TagSelectRequestBody = {
    selectType: string;
} & BasicSelectRequestBody;

export type TableHeaderProps = {
    name: string;
    title: string | ReactElement;
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
