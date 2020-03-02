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
import {FormattedMessage, useIntl} from "react-intl";
import {Add} from "@material-ui/icons";
import tagStyles from "../styles/tagStyles";
import {
    SelectionState,
    IntegratedSelection,
    DataTypeProvider, TableColumnVisibility, Column
} from '@devexpress/dx-react-grid';
import {
    Grid as TableGrid,
    Table,
    TableHeaderRow,
    TableFixedColumns,
    TableSelection,
    TableColumnResizing,
} from '@devexpress/dx-react-grid-material-ui';


@inject("tagStore")
@observer
class Tag extends React.Component<IStore, object> {


    componentDidMount(): void {
    }

    render() {

        const classes = this.props.classes;
        const store = this.props.tagStore;

        const {
            tagSaveDialogVisibility,
            tagSaveDialogErrorArray,
        } = this.props.tagStore;

        // const columns: Column[] = [
        //     {name: "tagName", title: <FormattedMessage id={"intl_table_column_tag_name"}/>},
        //     {name: 'tagDescription', title: <FormattedMessage id={'intl_table_column_tag_description'}/>},
        //     {name: 'createTime', title: <FormattedMessage id={'intl_table_column_create_time'}/>},
        //     {name: 'lastUpdateTime', title: <FormattedMessage id={'intl_table_column_last_update_time'}/>},
        //     {name: 'actions', title: <FormattedMessage id={'intl_table_column_actions'}/>},
        // ];
        //
        // const tableColumns: Table.ColumnExtension[] = [
        // ]



        return (
            <Paper className={classes.tagBox}>
                <Typography variant={'h5'}>
                    <FormattedMessage id={"intl_tag_container_title"}/>
                </Typography>
                <Dialog open={tagSaveDialogVisibility}>
                    <DialogTitle>
                        <FormattedMessage id={"intl_tag_add_dialog_title"}/>
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
                                    <FormattedMessage id={"intl_tag_name_label"}/>
                                }
                                error={tagSaveDialogErrorArray.indexOf("tagName") !== -1}
                                helperText={
                                    tagSaveDialogErrorArray.indexOf("tagName") !== -1 ?
                                        <FormattedMessage id={"intl_tag_name_validate_error_tip"}/>
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
                                    <FormattedMessage id={"intl_tag_description_label"}/>
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
                                <FormattedMessage id={"intl_reset_button_value"}/>
                            </Button>
                            <Button onClick={() => {
                                store.changeTagSaveDialogVisibilityStatus(false);
                            }} color="secondary"
                                    variant="contained">
                                <FormattedMessage id={"intl_cancel_button_value"}/>
                            </Button>
                            <Button type={'submit'} color="primary" variant="contained">
                                <FormattedMessage id={"intl_submit_button_value"}/>
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
            </Paper>
        )
    }
}

const Show = (props: {count: number}) => {

    useEffect(() => {
        console.log("show begin");
    }, []);

    return(
        <div></div>
    )
}

export default withStyles(tagStyles)(Tag);