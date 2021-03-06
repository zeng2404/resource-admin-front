import React, {Component} from 'react';
import routes from "./route";
import {HashRouter, Route, Switch} from "react-router-dom";
import IRouteComponent from "./interfaces/IRouteComponent";
import {IntlProvider} from "react-intl";
import {Snackbar} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import zh_CN from "./locale/zh_CN";
import en_US from "./locale/en_US";
import {ILocale} from "./interfaces/ILocale";
import appStyles from "./styles/appStyles";
import {inject, observer} from "mobx-react";
import IStore from "./interfaces/IStore";
import MySnackbarContent from "./components/MySnackbarContent";
import Layout from "./layout/Layout";
import {flattenMessages} from "./utils";

@inject("commonStore")
@observer
class App extends Component<IStore, object> {
    componentDidMount(): void {
        this.props.commonStore.initialServerUrl();
    }

    render() {
        const getLocale = (language: string): ILocale => {
            switch (language.split("-")[0]) {
                case "en":
                    return en_US;
                    break;
                case "zh":
                    return zh_CN;
                    break;
                default:
                    return en_US;
            }
        };

        const {
            currentLocaleChooseIndex,
            localeList,
            snackbarVisibility,
            snackbarAutoHiddenTime,
            snackbarInfoLevel,
            snackbarMessageIntlId,
            isLeftDrawerOpen
        } = this.props.commonStore;

        const store = this.props.commonStore;

        const {classes, ...other} = this.props;


        return (
            <div className={classes.rootBox}>
                <IntlProvider locale={localeList[currentLocaleChooseIndex]}
                              messages={flattenMessages(getLocale(localeList[currentLocaleChooseIndex]))}>
                    <Layout {...other}/>
                    <div className={classes.contentBox} style={{marginLeft: isLeftDrawerOpen ? 210 : 58}}>
                        <Snackbar open={snackbarVisibility}
                                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                  autoHideDuration={snackbarAutoHiddenTime}
                                  onClose={() => store.changeSnackbarVisibilityStatus(false)}
                                  ContentProps={{
                                      'aria-describedby': 'message-id',
                                  }}>
                            <MySnackbarContent
                                infoLevel={snackbarInfoLevel}
                                messageIntlId={snackbarMessageIntlId}
                                onClose={() => store.changeSnackbarVisibilityStatus(false)}
                            />
                        </Snackbar>
                        <HashRouter>
                            <Switch>
                                {
                                    routes.map((route: IRouteComponent) => (
                                        <Route exact {...route}/>
                                    ))
                                }
                            </Switch>
                        </HashRouter>
                    </div>
                </IntlProvider>
            </div>
        );
    }
}

export default withStyles(appStyles)(App);
