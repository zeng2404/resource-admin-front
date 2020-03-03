import React, {FormEvent, useEffect} from "react";
import IStore from "../interfaces/IStore";
import {inject, observer} from "mobx-react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Paper,
    TextField,
    Tooltip,
    Typography,
    withStyles
} from "@material-ui/core";
import {useIntl} from "react-intl";
import {Add} from "@material-ui/icons";
import tagStyles from "../styles/tagStyles";
import {getIntlMessage} from "../utils";
import {Column, DataTypeProvider, IntegratedSelection, SelectionState} from '@devexpress/dx-react-grid';
import {
    Grid as TableGrid,
    Table,
    TableColumnResizing,
    TableHeaderRow,
    TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import {TableColumnProps} from "../types";
import TablePagination from "@material-ui/core/TablePagination";
import {rowsPerPageOptions} from "../constants";

const Tag: React.FunctionComponent<IStore> = (props: IStore) => {

    const intl = useIntl();
    const intlArray = [
        "tag.addDialogTitle",
        "tag.tagNameLabel",
        "tag.tagNameValidateErrorTip",
        "tag.tagDescription",
        "common.resetButtonValue",
        "common.cancelButtonValue",
        "common.submitButtonValue",
        "tag.title",
        "tag.tagName",
        "common.createTime",
        "common.lastUpdateTime",
        "common.action",
    ];
    const classes = props.classes;
    const store = props.tagStore;

    const {
        tagSaveDialogVisibility,
        tagSaveDialogErrorArray,
        selection,
        dataCount,
        currentPageNumber,
        pageSize,
        tableData
    } = props.tagStore;

    const [
        addDialogTitle,
        tagNameLabel,
        tagNameValidateErrorTip,
        tagDescription,
        resetButtonValue,
        cancelButtonValue,
        submitButtonValue,
        title,
        tagName,
        createTime,
        lastUpdateTime,
        action
    ] = getIntlMessage(intl, intlArray);

    const columns: Column[] = [
        {name: "tagName", title: tagName},
        {name: "tagDescription", title: tagDescription},
        {name: "createTime", title: createTime},
        {name: "lastUpdateTime", title: lastUpdateTime},
        {name: "action", title: action},
    ];

    const tableColumns: TableColumnProps[] = [
        {columnName: "tagName", width: 200, align: "center"},
        {columnName: "tagDescription", width: 200, align: "center"},
        {columnName: "createTime", width: 200, align: "center"},
        {columnName: "lastUpdateTime", width: 200, align: "center"},
        {columnName: "action", width: 300, align: "center"},
    ];

    const dateFormatColumns: string[] = ["createTime", "lastUpdateTime"];

    const needTooltipColumns: string[] = ["tagName", "tagDescription"];

    useEffect(() => {
        store.getTableData();
    }, []);

    return (
        <Paper className={classes.tagBox}>
            <Typography variant={'h5'}>
                {title}
            </Typography>
            <Dialog open={tagSaveDialogVisibility}>
                <DialogTitle>
                    {addDialogTitle}
                </DialogTitle>
                <form onSubmit={
                    (event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const target = event.target as HTMLFormElement;
                        store.saveInsertForm({
                            tagName: target.tagSubmitName.value,
                            tagDescription: target.tagDescription.value,
                        })
                    }
                }>
                    <DialogContent>
                        <TextField
                            id={"tagSubmitName"}
                            label={
                                tagNameLabel
                            }
                            error={tagSaveDialogErrorArray.indexOf("tagName") !== -1}
                            helperText={
                                tagSaveDialogErrorArray.indexOf("tagName") !== -1 ?
                                    tagNameValidateErrorTip
                                    : ""
                            }
                            fullWidth
                            name={"tagSubmitName"}
                            className={classes.textField}
                            margin={"normal"}
                            variant={"outlined"}
                        />
                        <TextField
                            id={"tagDescription"}
                            label={
                                tagDescription
                            }
                            fullWidth
                            name={"tagDescription"}
                            className={classes.textField}
                            margin={"normal"}
                            variant={"outlined"}
                        />
                    </DialogContent>
                    <DialogActions className={classes.dialogAction}>
                        <Button type={'reset'} color="default" variant="contained">
                            {resetButtonValue}
                        </Button>
                        <Button onClick={() => {
                            store.changeTagSaveDialogVisibilityStatus(false);
                        }} color="secondary"
                                variant="contained">
                            {cancelButtonValue}
                        </Button>
                        <Button type={'submit'} color="primary" variant="contained">
                            {submitButtonValue}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <div>

            </div>
            <div>
                <Tooltip title={"test"} placement={"top"} className={classes.addButton}>
                    <Fab size={"small"}>
                        <Add onClick={() => store.changeTagSaveDialogVisibilityStatus(true)}/>
                    </Fab>
                </Tooltip>
            </div>
            <div>
                <TableGrid
                    rows={tableData}
                    columns={columns}
                >
                    {
                        needTooltipColumns.map((column) => (
                            <DataTypeProvider for={[column]}
                                              formatterComponent={
                                                  (value) => (
                                                      <Tooltip title={value.row[column]}
                                                               placement={"top"}
                                                               classes={{tooltip: classes.tooltipLargeWidth}}
                                                               children={
                                                                   <div>{value.row[column]}</div>
                                                               }
                                                      />)
                                              }
                            />
                        ))
                    }
                    {
                        dateFormatColumns.map((column, index) => (
                            <DataTypeProvider
                                for={[column]}
                                formatterComponent={
                                    (value) => {
                                        return (
                                            <Tooltip
                                                classes={{tooltip: classes.tooltipLargeWidth}}
                                                placement={'top'}
                                                title={new Date(value.row[column]['time']).toLocaleString()}
                                                children={
                                                    <div>{new Date(value.row[column]['time']).toLocaleString()}</div>}/>
                                        )
                                    }
                                }
                            />
                        ))
                    }
                    <DataTypeProvider
                        for={['action']}
                        formatterComponent={(value) => {
                            return (<div></div>)
                        }}
                    />
                    <SelectionState selection={selection}
                                    onSelectionChange={selection => {
                                        store.setSelection(selection)
                                    }}
                    />
                    <IntegratedSelection/>
                    <Table columnExtensions={tableColumns}/>
                    <TableSelection showSelectAll highlightRow/>
                    <TableColumnResizing
                        defaultColumnWidths={tableColumns}/>
                    <TableHeaderRow/>
                </TableGrid>
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={dataCount}
                    rowsPerPage={pageSize}
                    page={currentPageNumber}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={(event,currentPageNumber) => store.setCurrentPageNumber(currentPageNumber)}
                    onChangeRowsPerPage={(event) => store.setPageSize(Number(event.target.value))}
                />
            </div>
        </Paper>
    )
};

export default withStyles(tagStyles)(inject("tagStore")(observer(Tag)));

