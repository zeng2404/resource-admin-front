import {createStyles, Theme} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";

const tagStyles = (theme: Theme) => createStyles({
    tagBox: {
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
});

export default tagStyles;