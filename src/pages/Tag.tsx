import React, {FormEvent, useEffect, useRef} from "react";
import IStore from "../interfaces/IStore";
import {inject, observer} from "mobx-react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab, FormControl,
    Grid, InputLabel, MenuItem, OutlinedInput,
    Paper, Select,
    TextField,
    Tooltip,
    Typography,
    withStyles
} from "@material-ui/core";
import {useIntl} from "react-intl";
import {Add, Delete, Edit, Forward} from "@material-ui/icons";
import tagStyles from "../styles/tagStyles";
import {formatDateTime, getIntlMessage} from "../utils";
import {Column, DataTypeProvider, IntegratedSelection, SelectionState} from '@devexpress/dx-react-grid';
import {
    Grid as TableGrid,
    Table,
    TableColumnResizing,
    TableFixedColumns,
    TableHeaderRow,
    TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import {SelectOption, TableColumnProps} from "../types";
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
        "common.addFabTip",
        "common.batchDeleteFabTip",
        "common.deleteFabTip",
        "common.editFabTip",
        "tag.jumpToBookmark",
        "tag.deleteDialogTitle",
        "tag.batchDeleteDialogTip",
        "tag.deleteDialogTip",
        "tag.editDialogTitle",
        "common.queryConditionLabel",
        "common.queryConditionPlaceholder",
        "common.queryOptionLabel",
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
        tableData,
        tagDeleteDialogVisibility,
        currentHandleTag,
        tagEditDialogVisibility,
        tagEditDialogErrorArray,
        conditionType,
        condition,
        labelWidth,
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
        action,
        addFabTip,
        batchDeleteFabTip,
        deleteFabTip,
        editFabTip,
        jumpToBookmark,
        deleteDialogTitle,
        batchDeleteDialogTip,
        deleteDialogTip,
        editDialogTitle,
        queryConditionLabel,
        queryConditionPlaceholder,
        queryOptionLabel,
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
        {columnName: "tagDescription", width: 300, align: "center"},
        {columnName: "createTime", width: 200, align: "center"},
        {columnName: "lastUpdateTime", width: 200, align: "center"},
        {columnName: "action", width: 240, align: "center"},
    ];

    const dateFormatColumns: string[] = ["createTime", "lastUpdateTime"];

    const needTooltipColumns: string[] = ["tagName", "tagDescription"];

    const selectOptions: SelectOption[] = [
        {value: "tagName", text: tagName},
        {value: "tagDescription", text: tagDescription},
    ];

    const inputLabel = React.useRef<HTMLLabelElement>(null);

    const inputRef = React.useRef<HTMLInputElement>(null);


    useEffect(() => {
        store.getTableData();
    }, [currentPageNumber, pageSize]);

    useEffect(() => {
        store.setLabelWidth(inputLabel.current!.offsetWidth);
    }, [props.commonStore.currentLocaleChooseIndex]);

    return (
        <Paper className={classes.tagBox}>
            <Dialog open={tagDeleteDialogVisibility}>
                <DialogTitle>
                    {deleteDialogTitle}
                </DialogTitle>
                <form onSubmit={
                    (event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        store.handleDeleteDialogSubmit();
                    }
                }>
                    <DialogContent>
                        <span className={classes.deleteTip}>{
                            currentHandleTag ?
                                deleteDialogTip + currentHandleTag.tagName + " ?"
                                :
                                batchDeleteDialogTip
                        }</span>
                    </DialogContent>
                    <DialogActions className={classes.dialogAction}>
                        <Button onClick={() => {
                            store.setTagDeleteDialogVisibility(false, undefined);
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
            <Dialog open={tagEditDialogVisibility}>
                <DialogTitle>
                    {editDialogTitle}
                </DialogTitle>
                <form onSubmit={
                    (event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const target = event.target as HTMLFormElement;
                        store.updateTag({
                            id: currentHandleTag ? currentHandleTag.id : "",
                            tagName: target.tagSubmitName.value,
                            tagDescription: target.tagDescription.value,
                        })
                    }
                }>
                    <DialogContent>
                        <TextField
                            label={
                                tagNameLabel
                            }
                            error={tagSaveDialogErrorArray.indexOf("tagName") !== -1}
                            helperText={
                                tagEditDialogErrorArray.indexOf("tagName") !== -1 ?
                                    tagNameValidateErrorTip
                                    : ""
                            }
                            fullWidth
                            defaultValue={currentHandleTag ? currentHandleTag.tagName : ""}
                            name={"tagSubmitName"}
                            className={classes.textField}
                            margin={"normal"}
                            variant={"outlined"}
                        />
                        <TextField
                            label={
                                tagDescription
                            }
                            fullWidth
                            defaultValue={currentHandleTag ? currentHandleTag.tagDescription : ""}
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
                            store.setTagEditDialogVisibility(false, undefined);
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

            <div className={classes.tableOuterBox}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    className={classes.tableHeaderBox}
                >
                    <Grid item>
                        <Typography variant={'h5'}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item>

                    </Grid>
                    <Grid item>
                        {
                            selection.length === 0 ?
                                <Tooltip title={addFabTip} placement={"top"} className={classes.addButton}>
                                    <Fab size={"small"}>
                                        <Add onClick={() => store.changeTagSaveDialogVisibilityStatus(true)}/>
                                    </Fab>
                                </Tooltip>
                                :
                                <Tooltip title={batchDeleteFabTip} placement={"top"}
                                         className={classes.batchDeleteButton}>
                                    <Fab size={"small"}>
                                        <Delete onClick={() => {
                                            store.setTagDeleteDialogVisibility(true, undefined);
                                        }}/>
                                    </Fab>
                                </Tooltip>
                        }
                    </Grid>
                </Grid>
                <div>
                    <TextField
                        label={queryConditionLabel}
                        placeholder={queryConditionPlaceholder}
                        margin="normal"
                        variant="outlined"
                        ref={inputRef}
                        value={condition}
                        className={classes.selection}
                        onChange={event => {store.setCondition(event.target.value)}}
                        onKeyPress={event => {if(event.charCode === 13) console.log(inputRef);}}
                    />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel}>
                            {queryOptionLabel}
                        </InputLabel>
                        <Select
                            value={conditionType}
                            onChange={ event => {store.setConditionType((event.target as HTMLInputElement).value)}}
                            input={<OutlinedInput name={queryOptionLabel} labelWidth={labelWidth}/>}
                        >
                            <MenuItem value="" disabled>
                                {queryOptionLabel}
                            </MenuItem>
                            {selectOptions.map((value) => (
                                <MenuItem value={value.value}>{value.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TableGrid
                        rows={tableData}
                        columns={columns}
                        getRowId={(row) => row["id"]}
                    >
                        {
                            needTooltipColumns.map((column) => (
                                <DataTypeProvider for={[column]}
                                                  formatterComponent={
                                                      (value) => (
                                                          <Tooltip
                                                              title={value.row[column] ? value.row[column] : ""}
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
                            dateFormatColumns.map((column) => (
                                <DataTypeProvider
                                    for={[column]}
                                    formatterComponent={
                                        (value) => {
                                            return (
                                                <Tooltip
                                                    classes={{tooltip: classes.tooltipLargeWidth}}
                                                    placement={'top'}
                                                    title={formatDateTime(value.row[column])}
                                                    children={
                                                        <div>{formatDateTime(value.row[column])}</div>}/>
                                            )
                                        }
                                    }
                                />
                            ))
                        }
                        <DataTypeProvider
                            for={['action']}
                            formatterComponent={(value) => {
                                return (<div>
                                    <Tooltip
                                        classes={{tooltip: classes.tooltipLargeWidth}}
                                        placement={'top'} title={editFabTip}
                                        children={<Fab variant={'round'} size={'small'}
                                                       className={classes.editButton}
                                            onClick={() => store.setTagEditDialogVisibility(true,value.row)}
                                                       children={<Edit/>}/>}/>
                                    <Tooltip
                                        classes={{tooltip: classes.tooltipLargeWidth}}
                                        placement={'top'} title={deleteFabTip}
                                        children={<Fab variant={'round'} size={'small'}
                                                       className={classes.deleteButton}
                                                       onClick={() => {
                                                           store.setTagDeleteDialogVisibility(true, value.row)
                                                       }}
                                                       children={<Delete/>}/>}/>
                                    <Tooltip
                                        classes={{tooltip: classes.tooltipLargeWidth}}
                                        placement={'top'} title={jumpToBookmark}
                                        children={<Fab variant={'round'} size={'small'}
                                                       className={classes.jumpToBookmarkButton}
                                            // onClick={() => changeUserDeleteDialog(true,[value.row],0)}
                                                       children={<Forward/>}/>}/>
                                </div>)
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
                        <TableFixedColumns
                            leftColumns={[TableSelection.COLUMN_TYPE, "tagName"]}
                        />
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
                        onChangePage={(event, currentPageNumber) => store.setCurrentPageNumber(currentPageNumber)}
                        onChangeRowsPerPage={(event) => store.setPageSize(Number(event.target.value))}
                    />
                </div>
            </div>
        </Paper>
    )
};

export default withStyles(tagStyles)(inject("tagStore", "commonStore")(observer(Tag)));

