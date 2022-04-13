import React, { useEffect, useState } from "react";
import './chatPage.css';

import { LeftBar } from "../interfaceMainPage/components/leftBar/leftBar";
import { LeftBarChat } from "./components/leftBar/leftBarChatPage";
import { MessageAreaChat } from "./components/rightArea/rightArea";
import { ws } from "components/connections/ws";
import { WsDialogType } from "../../WsDialogType";
import { UserInfoType } from "../../UserInfoType";
import { WsGetMessageType } from "../../WsGetMessageType";

type TProps = {
    openMainLeftBar: React.MutableRefObject<() => void>
}

type WsAnswer = {
    eventNumber: number,
    model: WsGetMessageType
}

export const ChatPage:React.FC<TProps> = React.memo((props) => {
    let init: {dialogInfo: WsDialogType, userInfo:UserInfoType, userAvatar: string};
    const [currentDialog, setCurrentDialog] = useState(init);
    let newMessInit : WsGetMessageType;
    const [newMessage, setNewMessage] = useState(newMessInit);

    ws.onmessage = (e) => { // надо как то обнвоялять демо при приходе новых сообщений
        let data = JSON.parse(e.data) as WsAnswer;
        console.log(data)
        if(data.eventNumber === 1) {
            if(data.model.dialogId === currentDialog?.dialogInfo.id) {
                setNewMessage(data.model);
            }
        }

    }
    
    return <div className="chat-page-main">
        <LeftBarChat onClickOtherButton={props.openMainLeftBar.current} setCurrentDialog={setCurrentDialog} />
        <MessageAreaChat currentDialogData={currentDialog} newMessage={newMessage}/>{/*put <- currentChat*/}
    </div>
})