import {action, observable} from "mobx";

type infoLevel = "success" | "info" | "error" | "warning";

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
    snackbarInfoLevel: infoLevel = "success";
    @observable
    snackbarMessageIntlId: string = "intl_snackbar_default_message";
    @observable
    isLeftDrawerOpen: boolean = false;
    @observable
    localeChooseMenuVisibility:boolean = false;
    @observable
    localeChooseMenuAnchorEl: any = null;

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
    changeSnackbarInfoLevel(infoLevel: infoLevel) {
        this.snackbarInfoLevel = infoLevel;
    }

    @action
    SetSnackbarMessageIntlId(intlId: string) {
        this.snackbarMessageIntlId = intlId;
        this.snackbarVisibility = true;
    }

    @action
    changeLeftDrawerOpenStatus(isOpen: boolean) {
        this.isLeftDrawerOpen = isOpen;
    }
}

export default CommonStore;

