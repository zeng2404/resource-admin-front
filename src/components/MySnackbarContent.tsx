import React, {FC, FunctionComponent} from "react";
import {CheckCircle, Warning, Error, Info, Close,} from "@material-ui/icons";
import {amber, teal, lightBlue} from '@material-ui/core/colors';
import {createStyles, IconButton, Theme} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';

import SnackbarContent from '@material-ui/core/SnackbarContent';
import clsx from 'clsx';
import {FormattedMessage} from "react-intl";

type infoLevel = "success" | "info" | "error" | "warning";

const variantIcon = {
    success: CheckCircle,
    info: Info,
    error: Error,
    warning: Warning
}


const styles = (theme: Theme) => createStyles({
    success: {
        backgroundColor: teal[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: lightBlue[700],
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.8,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});


interface MySnackbarContentProps {
    classes: any;
    infoLevel: infoLevel;
    messageIntlId: string;
    onClose: () => void;
}


const MySnackbarContent: FunctionComponent<MySnackbarContentProps> = (props: MySnackbarContentProps) => {
    const {infoLevel, messageIntlId, onClose, classes} = props;
    const Icon = variantIcon[infoLevel];
    return (
        <SnackbarContent
            className={classes[infoLevel]}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                        <Icon className={clsx(classes.icon, classes.iconVariant)}/>
                    {
                        <FormattedMessage id={messageIntlId}/>
                    }
                    </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <Close className={classes.icon}/>
                </IconButton>,
            ]}
        >
        </SnackbarContent>
    )
};

export default withStyles(styles)(MySnackbarContent);
