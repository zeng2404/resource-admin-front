import React, {useEffect} from "react";
import {observer, inject} from "mobx-react";
import IStore from "../interfaces/IStore";
import {
    Typography,
    Paper,
    TextField,
    Tooltip,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button, withStyles,
} from "@material-ui/core";
import {FormattedMessage, useIntl} from "react-intl";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Add} from "@material-ui/icons";
import bookmarkStyles from "../styles/bookmarkStyles";

@inject("bookmarkStore")
@observer
class Bookmark extends React.Component<IStore, object> {
    componentDidMount(): void {
        console.log("bookmark");
    }

    render() {
        const classes = this.props.classes;

        return (
            <Paper className={classes.bookmarkBox}>
                <Show/>
                <Typography variant={'h5'}>
                    <FormattedMessage id={"intl_bookmark_container_title"}/>
                </Typography>
                <div>

                </div>
                <div>
                    <Tooltip title={"test"} placement={"top"} className={classes.addButton}>
                        <Fab size={"small"}>
                            <Add/>
                        </Fab>
                    </Tooltip>
                </div>
            </Paper>
        )
    }
}

const Show = (props: {}) => {

    const intl = useIntl();

    const text = intl.formatMessage({id: "test.text"})

    return(
        <div>{text}</div>
    )
}


export default withStyles(bookmarkStyles)(Bookmark);