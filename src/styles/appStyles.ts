import {createStyles, Theme} from "@material-ui/core";

const appStyles = (theme: Theme) => createStyles({
    rootBox: {
        backgroundColor: '#f5f5f5',
        fontFamily: "\"fira-code\",\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    },
    contentBox: {
        flexGrow: 1,
        padding: theme.spacing(2),
        marginTop: 64,
        marginRight: 2,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
});

export default appStyles;