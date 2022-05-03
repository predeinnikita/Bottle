import React, { useRef, useState } from "react";
import './startPage.css';

import { HeaderStartPage } from "./components/headerStartPage/headerStartPage";
import { BodyStartPage } from "./components/bodyStartPage/bodyStartPage";
import { FooterStartPage } from "./components/footerStartPage/footerStartPage";
import { SignModal } from "./components/signModal/signModal";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "components/connections/apiUrl";

type TProps = {
}

export const StartPage:React.FC<TProps> = React.memo((props) => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(<></>);    

    function toMainPage() {
        navigate('/mainPage');
        // window.history.replaceState({}, document.title)
    }

    async function onSubmitSignUp(data: {email: string, password: string}) {
        closeModal();
        let response = await fetch(`${apiUrl}/api/account`, {
            method: 'POST',
            body: JSON.stringify({
                nickname: data.email.split('@')[0],
                password: data.password,
                email: data.email,
                sex: "?",                
            }),
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            }
        });
        if(response.ok) {
            toMainPage();
            console.log('зарегались')
        } else {
            navigate('/');
            console.log('жопа')
        }
        
    }

    async function onSubmitSignIn(data: {email: string, password: string}) {
        closeModal();
        let type = data.email.includes('@') ? 'email' : 'nickname';
        let responseData;
        if(type === 'email') {
            responseData = {
                email: data.email,
                password: data.password
            }
        } else {
            responseData = {
                nickname: data.email,
                password: data.password
            }
        }
        
        let response = await fetch(`${apiUrl}/api/account/login`, {
            method: 'POST',
            body: JSON.stringify(responseData),
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            }
        });
        
        if(response.ok) {
            toMainPage();
            console.log('вошли')
        } else {
            navigate('/');
            console.log('не вошли жопа')
        }
    }

    function onClickSignIn() {
        setModal(<SignModal title="Вход" submitButtonName="Войти" onClickCloseModal={closeModal} onSubmit={onSubmitSignIn} /> );
    }

    function onClickSignUp() {
        setModal(<SignModal title="Регистрация" submitButtonName="Зарегистрироваться" onClickCloseModal={closeModal} onSubmit={onSubmitSignUp} /> );
    }

    function closeModal() {
        setModal(<></>);
    }

    return <div className="start-page">
        <HeaderStartPage onClickSignUp={onClickSignUp} toMainPage={toMainPage} onClickSignIn={onClickSignIn}/>        
        <BodyStartPage onClickBegin={onClickSignUp}/>
        <FooterStartPage />
        {modal}
    </div>
})