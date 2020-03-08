import {createStyles, Theme} from "@material-ui/core";
import {blue, cyan, green, red, teal, deepOrange} from "@material-ui/core/colors";

const bookmarkStyles = (theme: Theme) => createStyles({
    bookmarkBox: {
        padding: 20,
    },
    addButton: {
        marginTop: 20,
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
    batchDeleteButton: {
        marginTop: 20,
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    textField: {
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        maxWidth: 350,
    },
    dialogAction: {
        marginBottom: 10,
    },
    tooltipLargeWidth: {
        maxWidth: 1200,
        fontSize: 17
    },
    checkBoxItem: {
        marginRight: 8,
    },
    tableOuterBox: {
        maxWidth: 1600,
        margin: "auto",
    },
    tableHeaderBox: {
        marginBottom: 10,
    },
    copyButton: {
        color: "#fafafa",
        backgroundColor: green[600],
        '&:hover': {
            backgroundColor: green[800],
        },
    },
    jumpToUrlButton: {
        color: "#fafafa",
        marginLeft: 10,
        backgroundColor: cyan[600]!,
        '&:hover': {
            backgroundColor: cyan[800],
        },
    },
    editButton: {
        marginLeft: 10,
        color: theme.palette.getContrastText(teal[500]),
        backgroundColor: teal[500],
        '&:hover': {
            backgroundColor: teal[700],
        },
    },
    deleteButton: {
        marginLeft: 10,
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    searchButton: {
        marginLeft: 20,
        marginTop: 8,
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        '&:hover': {
            backgroundColor: deepOrange[700],
        },
    },
    formControl: {
        minWidth: 200,
        marginTop: 16,
        marginRight: 20,
    },
    queryBox: {
        marginBottom: 10,
    },
    searchRightBox: {
        display: "inline-block",
    },
    queryTagAutocomplete: {
        width: 300,
        marginTop: 16,
    },
    switchBox: {
        width: 120,
        marginLeft: 20,
        marginTop: 9,
    }
});

export default bookmarkStyles;