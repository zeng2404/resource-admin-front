import {createStyles, Theme} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";

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
    }

});

export default bookmarkStyles;