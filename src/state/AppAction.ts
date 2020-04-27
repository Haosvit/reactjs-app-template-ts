export interface AppAction {
    type: string;
    payload?: any;
    [extra: string]: any;
}
