import {action, observable} from "mobx";
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
    snackbarMessageIntlId: string = "intl_snackbar_default_message";
    @observable
    isLeftDrawerOpen: boolean = false;
    @observable
    localeChooseMenuVisibility:boolean = false;
    @observable
    localeChooseMenuAnchorEl: any = null;
    @observable
    serverUrl: string = "http://localhost:7777";

    @action
    setServerUrl(url: string) {
        this.serverUrl = url;
    }

    @action
    async initialServerUrl() {
        axios.get("serverConfig.json")
            .then(response => {
                this.setServerUrl(response.data.serverUrl);
            })
            .catch(error => {
                console.error(error);
                this.setSnackbarMessage("intl_get_serverUrl_fail", "error");
            })

    }


    @action
    changeLocaleChooseMenuVisibilityStatus(isVisible: boolean) {
        this.localeChooseMenuVisibility = isVisible;
    }

    @action
    openLocaleChooseMenu(element: EventTarget & HTMLDivElement) {
        this.localeChooseMenuAnchorEl = element;
        this.localeChooseMenuVisibility = true;
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

