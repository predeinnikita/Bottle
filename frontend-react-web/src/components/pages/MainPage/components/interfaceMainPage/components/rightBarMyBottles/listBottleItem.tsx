import React from "react";

import { IconCategory } from "./iconCategory";
import { InfoContainerTitle } from "./itemInfoContainerTitle";
import { IconDelete } from "./iconDelete";

import changeIcon from '../leftBar/renameButtonIcon.svg';
import deleteItemIcon from './deleteIcon.svg';

type TProps = {
    title: string
    demoDescript: string,
    urlIcon: string
}

export const ListBottleItem:React.FC<TProps> = React.memo((props) => {
    return <div className="right-bar-map-my-bottles-item">
        <IconCategory urlIcon={props.urlIcon}/>        
        <div className="right-bar-map-my-bottles-item-information-container">
            <InfoContainerTitle title={props.title}/>            
            <div className="right-bar-map-my-bottles-item-information-descritpion">
                {props.demoDescript}
            </div>
        </div>
        <IconDelete />
    </div>
})