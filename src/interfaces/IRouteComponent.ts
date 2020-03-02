import React, {ComponentClass} from 'react';
import IStore from "./IStore";

export default interface IRouteComponent {
    key: string;
    path: string;
    component: any;
}