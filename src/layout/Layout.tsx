import React from "react";
import clsx from "clsx";
import {
    AppBar,
    Button,
    createStyles,
    Divider,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Theme,
    Toolbar,
    Tooltip
} from "@material-ui/core";
import {HashRouter, Link} from 'react-router-dom'
import {Bookmark, ChevronLeft, Label, Menu, Translate} from "@material-ui/icons";
import {withStyles} from '@material-ui/core/styles';
import {useIntl} from "react-intl";
import {inject, observer} from "mobx-react";
import IStore from "../interfaces/IStore";
import {getIntlMessage} from "../utils";

const drawerWidth = 200;

const styles = (theme: Theme) => createStyles({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundImage: 'linear-gradient(-90deg, #29bdd9 0%, #276ace 100%)',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    localeButton: {
        color: 'white',
        width: 150,
    },
    buttonLeftIcon: {
        marginRight: theme.spacing(1),
    },
    localeChoosePopper: {
        zIndex: 2000,
    },
    drawerButton: {
        color: 'white',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(5) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        height: 64,
    },
    listItem: {
        textDecoration: 'none',
    },
    listItemText: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontWeight: 'bold',
    }
});

const Layout: React.FunctionComponent<IStore> = (props: IStore) => {

    const intl = useIntl();

    const intlArray = ["common.drawerButtonTip", "common.leftDrawerBookmark", "common.leftDrawerTag"];

    const [drawerButtonTip, leftDrawerBookmark, leftDrawerTag]: string[] =
        getIntlMessage(intl, intlArray);

    const classes = props.classes;

    const {
        isLeftDrawerOpen,
        localeDescriptionList,
        currentLocaleChooseIndex,
        localeChooseMenuAnchorEl,
        localeMenuVisibility,
    } = props.commonStore;

    const store = props.commonStore;

    return (
        <div>
            <AppBar position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: isLeftDrawerOpen
                    })}
            >
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Tooltip placement={"bottom"} title={
                                drawerButtonTip
                            }>
                                <IconButton className={clsx(classes.drawerButton, {
                                    [classes.hide]: isLeftDrawerOpen,
                                })}
                                            onClick={() => store.changeLeftDrawerOpenStatus(true)}
                                >
                                    <Menu/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                        </Grid>
                        <Grid item>
                            <div
                                onMouseOver={event => store.openLocaleChooseMenu(event.currentTarget)}
                                onMouseLeave={() => store.setLocaleMenuVisibility(false)}
                            >
                                <Button className={classes.localeButton}>
                                    <Translate className={classes.buttonLeftIcon}/>
                                    {localeDescriptionList[currentLocaleChooseIndex]}
                                </Button>
                                <Popper open={localeMenuVisibility} anchorEl={localeChooseMenuAnchorEl}
                                        placement={'bottom'} className={classes.localeChoosePopper}>
                                    <Paper>
                                        <MenuList>
                                            {
                                                localeDescriptionList.map((value, index) => {
                                                    return (
                                                        <MenuItem key={'locale-' + index}
                                                                  onClick={() => store.changeCurrentLocaleChooseIndex(index)}>
                                                            <ListItemText>{value}</ListItemText>
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </MenuList>
                                    </Paper>
                                </Popper>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                variant={"permanent"}
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: isLeftDrawerOpen,
                    [classes.drawerClose]: !isLeftDrawerOpen,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: isLeftDrawerOpen,
                        [classes.drawerClose]: !isLeftDrawerOpen,
                    })
                }}
                open={isLeftDrawerOpen}
            >
                <div className={classes.toolbar}>
                    <IconButton>
                        {
                            isLeftDrawerOpen ?
                                <ChevronLeft
                                    onClick={() => store.changeLeftDrawerOpenStatus(false)}
                                />
                                :
                                ""
                        }
                    </IconButton>
                </div>
                <Divider/>
                <HashRouter>
                    <List>
                        <Link to={'/bookmark'} className={classes.listItem}>
                            <ListItem button key={'left-drawer-bookmark'}>
                                <ListItemIcon>
                                    <Bookmark/>
                                </ListItemIcon>
                                <ListItemText className={classes.listItemText}>
                                    {leftDrawerBookmark}
                                </ListItemText>
                            </ListItem>
                        </Link>
                        <Link to={'/tag'} className={classes.listItem}>
                            <ListItem button key={'left-drawer-tag'}>
                                <ListItemIcon>
                                    <Label/>
                                </ListItemIcon>
                                <ListItemText className={classes.listItemText}>
                                    {leftDrawerTag}
                                </ListItemText>
                            </ListItem>
                        </Link>
                    </List>
                </HashRouter>
            </Drawer>
        </div>
    )
};

export default withStyles(styles)(inject("commonStore")(observer(Layout)));


