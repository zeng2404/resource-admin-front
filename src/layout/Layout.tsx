import React, {Component} from "react";
import clsx from "clsx";
import {
    AppBar,
    Toolbar,
    Tooltip,
    IconButton,
    Button,
    Popper,
    MenuList,
    Paper,
    MenuItem,
    ListItemText,
    Grid,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon, Theme, createStyles
} from "@material-ui/core";
import {HashRouter, Link} from 'react-router-dom'
import {Translate, Menu, ChevronLeft, Bookmark, Label} from "@material-ui/icons";
import {withStyles} from '@material-ui/core/styles';
import {FormattedMessage} from "react-intl";
import {inject, observer} from "mobx-react";
import IStore from "../interfaces/IStore";

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
})

@inject("commonStore")
@observer
class Layout extends Component<IStore, object> {

    render() {
        const classes = this.props.classes;

        const {
            isLeftDrawerOpen,
            localeDescriptionList,
            currentLocaleChooseIndex,
            localeChooseMenuVisibility,
            localeChooseMenuAnchorEl
        } = this.props.commonStore;

        const store = this.props.commonStore;

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
                                    <FormattedMessage id={"intl_drawer_button_tip"}/>
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
                                    onMouseLeave={() => store.changeLocaleChooseMenuVisibilityStatus(false)}
                                >
                                    <Button className={classes.localeButton}>
                                        <Translate className={classes.buttonLeftIcon}/>
                                        {localeDescriptionList[currentLocaleChooseIndex]}
                                    </Button>
                                    <Popper open={localeChooseMenuVisibility} anchorEl={localeChooseMenuAnchorEl}
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
                                isLeftDrawerOpen?
                                    <ChevronLeft
                                        onClick={() => store.changeLeftDrawerOpenStatus(false)}
                                    />
                                    :
                                    <div></div>
                            }
                        </IconButton>
                    </div>
                    <Divider/>
                    <HashRouter>
                        <List>
                            <Link to={'/test'} className={classes.listItem}>
                                <ListItem button key={'left-drawer-bookmark'} >
                                    <ListItemIcon>
                                        <Bookmark/>
                                    </ListItemIcon>
                                    <ListItemText className={classes.listItemText}>
                                        <FormattedMessage id={"intl_left_drawer_bookmark"}/>
                                    </ListItemText>
                                </ListItem>
                            </Link>
                            <Link to={'/second'} className={classes.listItem}>
                                <ListItem button key={'left-drawer-tag'} >
                                    <ListItemIcon>
                                        <Label/>
                                    </ListItemIcon>
                                    <ListItemText className={classes.listItemText}>
                                        <FormattedMessage id={"intl_left_drawer_tag"} />
                                    </ListItemText>
                                </ListItem>
                            </Link>
                        </List>
                    </HashRouter>
                </Drawer>
            </div>
        )
    }
}

export default withStyles(styles)(Layout);
