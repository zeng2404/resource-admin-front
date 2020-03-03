import React from "react";
import {inject, observer} from "mobx-react";
import IStore from "../interfaces/IStore";
import {Fab, Paper, Tooltip, Typography, withStyles,} from "@material-ui/core";
import {useIntl} from "react-intl";
import {Add} from "@material-ui/icons";
import bookmarkStyles from "../styles/bookmarkStyles";
import {getIntlMessage} from "../utils";

const Bookmark: React.FunctionComponent<IStore> = (props: IStore) => {

    const intl = useIntl();

    const intlArray = ["bookmark.title"];

    const [title] = getIntlMessage(intl, intlArray);

    const classes = props.classes;

    return (
        <Paper className={classes.bookmarkBox}>
            <Typography variant={'h5'}>
                {title}
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
};

export default withStyles(bookmarkStyles)(inject("bookmarkStore")(observer(Bookmark)));

