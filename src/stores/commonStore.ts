import {action, computed, observable} from "mobx";
import axios from "axios";

class CommonStore {
    @observable
    readonly localeList: string[] = ["zh-CN", "en-US"];
    @observable
    readonly localeDescriptionList: string[] = ["中文", "English"];
    @observable
    currentLocaleChooseIndex: number = 0;
    @observable
    snackbarVisibility: boolean = false;
    @observable
    readonly snackbarAutoHiddenTime = 6000;
    @observable
    snackbarInfoLevel: "success" | "info" | "error" | "warning" = "success";
    @observable
    snackbarMessageIntlId: string = "common.snackbarDefaultMessage";
    @observable
    isLeftDrawerOpen: boolean = false;
    @observable
    localeMenuVisibility: boolean = false;
    @observable
    localeChooseMenuAnchorEl: any = null;
    @observable
    serverUrl: string = window.localStorage["HOST_URL"];


    @action
    setLocaleMenuVisibility(isVisible: boolean) {
        this.localeMenuVisibility = isVisible;
    }

    @action
    async initialServerUrl() {
        await axios.get("serverConfig.json")
            .then(response => {
                window.localStorage['HOST_URL'] = response.data.serverUrl;
            })
            .catch(error => {
                console.error("error: " + error);
                this.setSnackbarMessage("intl_get_serverUrl_fail", "error");
            })
    }

    @action
    openLocaleChooseMenu(element: EventTarget & HTMLDivElement) {
        this.localeChooseMenuAnchorEl = element;
        this.setLocaleMenuVisibility(true);
    }

    @action
    changeCurrentLocaleChooseIndex(index: number) {
        this.currentLocaleChooseIndex = index;
    }

    @action
    changeSnackbarVisibilityStatus(isVisible: boolean): void {
        this.snackbarVisibility = isVisible;
    }

    @action
    changeSnackbarInfoLevel(infoLevel: "success" | "info" | "error" | "warning") {
        this.snackbarInfoLevel = infoLevel;
    }

    @action
    setSnackbarMessage(intlId: string, infoLvel: "success" | "info" | "error" | "warning") {
        this.snackbarMessageIntlId = intlId;
        this.snackbarInfoLevel = infoLvel;
        this.snackbarVisibility = true;
    }

    @action
    changeLeftDrawerOpenStatus(isOpen: boolean) {
        this.isLeftDrawerOpen = isOpen;
    }
}

export default CommonStore;

