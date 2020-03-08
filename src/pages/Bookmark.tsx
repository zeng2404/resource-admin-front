import React, {FormEvent, useEffect} from "react";
import {inject, observer} from "mobx-react";
import IStore from "../interfaces/IStore";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Switch,
    TextField,
    Tooltip,
    Typography,
    withStyles,
} from "@material-ui/core";
import {useIntl} from "react-intl";
import {Add, CheckBox, CheckBoxOutlineBlank, Delete, Edit, FileCopy, Forward, Search} from "@material-ui/icons";
import bookmarkStyles from "../styles/bookmarkStyles";
import {formatDateTime, getIntlMessage} from "../utils";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {SelectOption, TableColumnProps} from "../types";
import {Column, DataTypeProvider, IntegratedSelection, SelectionState} from '@devexpress/dx-react-grid';
import {
    Grid as TableGrid,
    Table,
    TableColumnResizing,
    TableFixedColumns,
    TableHeaderRow,
    TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import TablePagination from "@material-ui/core/TablePagination";
import {rowsPerPageOptions} from "../constants";

const Bookmark: React.FunctionComponent<IStore> = (props: IStore) => {

    const intl = useIntl();

    const inputLabel = React.useRef<HTMLLabelElement>(null);

    useEffect(() => {
        store.setLabelWidth(inputLabel.current!.offsetWidth);
    }, [props.commonStore.currentLocaleChooseIndex]);

    const intlArray = [
        "bookmark.title",
        "common.addFabTip",
        "common.batchDeleteFabTip",
        "bookmark.addDialogTitle",
        "common.resetButtonValue",
        "common.cancelButtonValue",
        "common.submitButtonValue",
        "bookmark.bookmarkDescriptionLabel",
        "bookmark.bookmarkUrlLabel",
        "bookmark.bookmarkDescription",
        "bookmark.bookmarkUrl",
        "bookmark.tag",
        "bookmark.bookmarkDescriptionEmptyErrorTip",
        "bookmark.bookmarkUrlEmptyErrorTip",
        "common.createTime",
        "common.lastUpdateTime",
        "common.action",
        "bookmark.copyURLFabTip",
        "bookmark.jumpToURLFabTip",
        "bookmark.editDialogTitle",
        "common.editFabTip",
        "bookmark.deleteDialogTitle",
        "common.deleteDialogTip",
        "bookmark.batchDeleteDialogTip",
        "common.deleteFabTip",
        "common.queryOptionLabel",
        "common.searchFabTip",
        "common.queryConditionLabel",
        "common.queryConditionPlaceholder",
    ];

    const [
        title,
        addFabTip,
        batchDeleteFabTip,
        addDialogTitle,
        resetButtonValue,
        cancelButtonValue,
        submitButtonValue,
        bookmarkDescriptionLabel,
        bookmarkUrlLabel,
        bookmarkDescription,
        bookmarkUrl,
        tag,
        bookmarkDescriptionEmptyErrorTip,
        bookmarkUrlEmptyErrorTip,
        createTime,
        lastUpdateTime,
        action,
        copyURLFabTip,
        jumpToURLFabTip,
        editDialogTitle,
        editFabTip,
        deleteDialogTitle,
        deleteDialogTip,
        batchDeleteDialogTip,
        deleteFabTip,
        queryOptionLabel,
        searchFabTip,
        queryConditionLabel,
        queryConditionPlaceholder,
    ] = getIntlMessage(intl, intlArray);

    const {
        selection,
        bookmarkSaveDialogVisibility,
        bookmarkSaveErrorArray,
        tagMenu,
        tagSelection,
        tableData,
        currentPageNumber,
        pageSize,
        dataCount,
        bookmarkEditDialogVisibility,
        bookmarkEditErrorArray,
        currentHandleBookmark,
        editTagSelection,
        bookmarkDeleteDialogVisibility,
        conditionType,
        labelWidth,
        tagQueryType,
    } = props.bookmarkStore;

    const classes = props.classes;

    const store = props.bookmarkStore;

    const icon = <CheckBoxOutlineBlank fontSize="small"/>;

    const checkedIcon = <CheckBox fontSize="small"/>;

    useEffect(() => {
        store.getTagMenuList();
    }, []);

    useEffect(() => {
        store.getTableData();
    }, [currentPageNumber, pageSize]);

    const columns: Column[] = [
        {name: "bookmarkDescription", title: bookmarkDescription},
        {name: "bookmarkUrl", title: bookmarkUrl},
        {name: "tagNames", title: tag},
        {name: "createTime", title: createTime},
        {name: "lastUpdateTime", title: lastUpdateTime},
        {name: "action", title: action},
    ];

    const tableColumns: TableColumnProps[] = [
        {columnName: "bookmarkDescription", width: 300, align: "center"},
        {columnName: "bookmarkUrl", width: 300, align: "center"},
        {columnName: "tagNames", width: 300, align: "center"},
        {columnName: "createTime", width: 200, align: "center"},
        {columnName: "lastUpdateTime", width: 200, align: "center"},
        {columnName: "action", width: 240, align: "center"},
    ];

    const dateFormatColumns: string[] = ["createTime", "lastUpdateTime"];

    const needTooltipColumns: string[] = ["bookmarkDescription", "bookmarkUrl", "tagNames"];

    const selectOptions: SelectOption[] = [
        {value: "bookmarkDescription", text: bookmarkDescription},
        {value: "bookmarkUrl", text: bookmarkUrl},
        {value: "tags", text: tag},
    ];


    return (
        <Paper className={classes.bookmarkBox}>
            <Dialog open={bookmarkDeleteDialogVisibility}>
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
                            currentHandleBookmark ?
                                deleteDialogTip + currentHandleBookmark.bookmarkDescription + " ?"
                                :
                                batchDeleteDialogTip
                        }</span>
                    </DialogContent>
                    <DialogActions className={classes.dialogAction}>
                        <Button onClick={() => {
                            store.setBookmarkDeleteDialogVisibility(false, undefined);
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
            <Dialog open={bookmarkSaveDialogVisibility}>
                <DialogTitle>
                    {addDialogTitle}
                </DialogTitle>
                <form onSubmit={
                    (event) => {
                        event.preventDefault();
                        const target = event.target as HTMLFormElement;
                        store.saveBookmark({
                            bookmarkDescription: target.bookmarkDescription.value,
                            bookmarkUrl: target.bookmarkUrl.value,
                            tagIds: store.getIdsFromTagSelection(tagSelection),
                        })
                    }
                }>
                    <DialogContent>
                        <TextField
                            label={bookmarkDescriptionLabel}
                            error={bookmarkSaveErrorArray.indexOf("bookmarkDescription") !== -1}
                            fullWidth
                            helperText={
                                bookmarkSaveErrorArray.indexOf("bookmarkDescription") !== -1 ?
                                    bookmarkDescriptionEmptyErrorTip : ""
                            }
                            name={"bookmarkDescription"}
                            className={classes.textField}
                            margin={"normal"}
                            variant={"outlined"}
                        >
                        </TextField>
                        <TextField
                            fullWidth
                            label={bookmarkUrlLabel}
                            error={bookmarkSaveErrorArray.indexOf("bookmarkUrl") !== -1}
                            helperText={bookmarkSaveErrorArray.indexOf("bookmarkUrl") !== -1 ? bookmarkUrlEmptyErrorTip : ""}
                            name={"bookmarkUrl"}
                            className={classes.textField}
                            margin={"normal"}
                            variant={"outlined"}
                        >
                        </TextField>
                        <Autocomplete
                            multiple
                            disableCloseOnSelect
                            options={tagMenu}
                            onChange={(event, value) => {
                                store.setTagSelection(value)
                            }}
                            getOptionLabel={option => option.tagName}
                            renderOption={(option, {selected}) => (
                                <React.Fragment>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        className={classes.checkBoxItem}
                                        checked={selected}
                                    />
                                    {option.tagName}
                                </React.Fragment>
                            )}
                            className={classes.textField}
                            renderInput={params => (
                                <TextField {...params}
                                           variant={"outlined"}
                                           label={tag}
                                           placeholder={tag}
                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions className={classes.dialogAction}>
                        <Button type={'reset'} color="default" variant="contained">
                            {resetButtonValue}
                        </Button>
                        <Button onClick={() => {
                            store.setBookmarkSaveDialogVisibilityStatus(false);
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
            <Dialog open={bookmarkEditDialogVisibility}>
                <DialogTitle>
                    {editDialogTitle}
                </DialogTitle>
                <form onSubmit={
                    (event) => {
                        event.preventDefault();
                        const target = event.target as HTMLFormElement;
                        store.updateBookmark({
                            id: "",
                            bookmarkDescription: target.bookmarkDescription.value,
                            bookmarkUrl: target.bookmarkUrl.value.trim(),
                            tagIds: [],
                        })
                    }
                }>
                    <DialogContent>
                        <TextField
                            label={bookmarkDescriptionLabel}
                            error={bookmarkEditErrorArray.indexOf("bookmarkDescription") !== -1}
                            fullWidth
                            helperText={
                                bookmarkEditErrorArray.indexOf("bookmarkDescription") !== -1 ?
                                    bookmarkDescriptionEmptyErrorTip : ""
                            }
                            defaultValue={currentHandleBookmark?.bookmarkDescription}
                            name={"bookmarkDescription"}
                            className={classes.textField}
                            margin={"normal"}
                            variant={"outlined"}
                        >
                        </TextField>
                        <TextField
                            fullWidth
                            label={bookmarkUrlLabel}
                            error={bookmarkEditErrorArray.indexOf("bookmarkUrl") !== -1}
                            helperText={bookmarkEditErrorArray.indexOf("bookmarkUrl") !== -1 ? bookmarkUrlEmptyErrorTip : ""}
                            defaultValue={currentHandleBookmark?.bookmarkUrl}
                            name={"bookmarkUrl"}
                            className={classes.textField}
                            margin={"normal"}
                            variant={"outlined"}
                        >
                        </TextField>
                        <Autocomplete
                            multiple
                            disableCloseOnSelect
                            options={tagMenu}
                            value={editTagSelection}
                            onChange={(event, value) => {
                                store.setEditTagSelection(value)
                            }}
                            getOptionLabel={option => option.tagName}
                            renderOption={(option) => {
                                return (<React.Fragment>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        className={classes.checkBoxItem}
                                        checked={editTagSelection.some((item) => item.tagName === option.tagName)}
                                    />
                                    {option.tagName}
                                </React.Fragment>)
                            }}
                            className={classes.textField}
                            renderInput={params => {
                                return (
                                    <TextField {...params}
                                               variant={"outlined"}
                                               label={tag}
                                               placeholder={tag}
                                    />)
                            }}
                        />
                    </DialogContent>
                    <DialogActions className={classes.dialogAction}>
                        <Button type={'reset'} color="default" variant="contained">
                            {resetButtonValue}
                        </Button>
                        <Button onClick={() => {
                            store.setBookmarkEditDialogVisibility(false, undefined);
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
                    <Grid item></Grid>
                    <Grid item>
                        {
                            selection.length === 0 ?
                                <Tooltip title={addFabTip} placement={"top"} className={classes.addButton}>
                                    <Fab size={"small"}>
                                        <Add onClick={() => store.setBookmarkSaveDialogVisibilityStatus(true)}/>
                                    </Fab>
                                </Tooltip>
                                :
                                <Tooltip title={batchDeleteFabTip} placement={"top"}
                                         className={classes.batchDeleteButton}>
                                    <Fab size={"small"}>
                                        <Delete onClick={() => {
                                            store.setBookmarkDeleteDialogVisibility(true, undefined);
                                        }}/>
                                    </Fab>
                                </Tooltip>
                        }
                    </Grid>
                </Grid>
                <div className={classes.queryBox}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel}>
                            {queryOptionLabel}
                        </InputLabel>
                        <Select
                            value={conditionType}
                            onChange={event => {
                                store.setConditionType((event.target as HTMLInputElement).value)
                            }}
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
                    <div className={classes.searchRightBox}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                            {
                                conditionType === "tags" ?
                                    <Grid item>
                                        <Autocomplete
                                            multiple
                                            disableCloseOnSelect
                                            options={tagMenu}
                                            onChange={(event, value) => {
                                                store.setQueryTagSelection(value)
                                            }}
                                            getOptionLabel={option => option.tagName}
                                            renderOption={(option, {selected}) => (
                                                <React.Fragment>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        className={classes.checkBoxItem}
                                                        checked={selected}
                                                    />
                                                    {option.tagName}
                                                </React.Fragment>
                                            )}
                                            className={classes.queryTagAutocomplete}
                                            renderInput={params => (
                                                <TextField {...params}
                                                           variant={"outlined"}
                                                           label={tag}
                                                           placeholder={tag}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    :
                                    <Grid item>
                                        <TextField
                                            label={queryConditionLabel}
                                            placeholder={queryConditionPlaceholder}
                                            margin="normal"
                                            variant="outlined"
                                            onBlur={(event => store.setCondition(event.target.value))}
                                        />
                                    </Grid>
                            }
                            {
                                conditionType === "tags" ?
                                    <Grid item className={classes.switchBox}>
                                        <span>AND</span>
                                        <Switch
                                            checked={tagQueryType === "OR"}
                                            onChange={(event, checked) => store.setTagQueryType(checked)}
                                            color="primary"
                                        />
                                        <span>OR</span>
                                    </Grid>
                                    :
                                    <Grid item></Grid>
                            }
                            <Grid>
                                <Tooltip title={searchFabTip} placement={"top"}
                                         className={classes.searchButton}>
                                    <Fab size={"small"}>
                                        <Search onClick={() => {
                                            store.handleSearchButtonClick();
                                        }}/>
                                    </Fab>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div>
                    <TableGrid
                        rows={tableData}
                        columns={columns}
                        getRowId={(row) => row["bookmarkId"]}
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
                                        placement={'top'} title={copyURLFabTip}
                                        children={<Fab variant={'round'} size={'small'}
                                                       className={classes.copyButton}
                                                       onClick={() => store.copy(value.row["bookmarkUrl"])}
                                                       children={<FileCopy/>}/>}/>
                                    <Tooltip
                                        classes={{tooltip: classes.tooltipLargeWidth}}
                                        placement={'top'} title={jumpToURLFabTip}
                                        children={<Fab variant={'round'} size={'small'}
                                                       className={classes.jumpToUrlButton}
                                                       target={"_blank"}
                                                       href={value.row["bookmarkUrl"]}
                                                       onClick={() => store.copy(value.row["bookmarkUrl"])}
                                                       children={<Forward/>}/>}/>
                                    <Tooltip
                                        classes={{tooltip: classes.tooltipLargeWidth}}
                                        placement={'top'} title={editFabTip}
                                        children={<Fab variant={'round'} size={'small'}
                                                       className={classes.editButton}
                                                       onClick={() => store.setBookmarkEditDialogVisibility(true, value.row)}
                                                       children={<Edit/>}/>}/>
                                    <Tooltip
                                        classes={{tooltip: classes.tooltipLargeWidth}}
                                        placement={'top'} title={deleteFabTip}
                                        children={<Fab variant={'round'} size={'small'}
                                                       className={classes.deleteButton}
                                                       onClick={() => {
                                                           store.setBookmarkDeleteDialogVisibility(true, value.row)
                                                       }}
                                                       children={<Delete/>}/>}/>
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
                            leftColumns={[TableSelection.COLUMN_TYPE, "bookmarkDescription"]}
                            rightColumns={["action"]}
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

export default withStyles(bookmarkStyles)(inject("bookmarkStore", "commonStore")(observer(Bookmark)));

