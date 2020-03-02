import {FormattedMessage} from "react-intl";
import {ReactElement} from "react";

export type TagInsertRequestBody = {
    tagName: string;
    tagDescription?: string;
}

export type TableHeaderProps = {
    name: string;
    title: string | ReactElement;
}

export type TableColumnProps = {
    columnName: string;
    width?: number;
    align?: "left" | "right" | "center";

}

