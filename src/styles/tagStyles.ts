import {createStyles, Theme} from "@material-ui/core";
import {blue, red, teal, cyan} from "@material-ui/core/colors";

const tagStyles = (theme: Theme) => createStyles({
    tagBox: {
        padding: 20,
    },
    addButton: {
        marginTop: 10,
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
    batchDeleteButton: {
        marginTop: 10,
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    textField: {
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%'
    },
    dialogAction: {
        marginBottom: 10,
    },
    tooltipLargeWidth: {
        maxWidth: 1200,
        fontSize: 17
    },
    tableOuterBox: {
        maxWidth: 1200,
        margin: "auto",
    },
    tableHeaderBox: {
        marginBottom: 10,
    },
    deleteButton: {
        marginRight: 20,
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    editButton: {
        marginRight: 20,
        color: theme.palette.getContrastText(teal[500]),
        backgroundColor: teal[500],
        '&:hover': {
            backgroundColor: teal[700],
        },
    },
    jumpToBookmarkButton: {
        color: "#fafafa",
        // color: theme.palette.getContrastText(cyan[600]),
        backgroundColor: cyan[600],
        '&:hover': {
            backgroundColor: cyan[800],
        },
    },
    deleteTip: {
        color: "#ff3d00",
    },
    formControl: {
        minWidth: 200,
        marginTop: 16,
        marginLeft: 30,
    },
});

export default tagStyles;