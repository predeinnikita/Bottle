import { apiUrl } from "components/connections/apiUrl";
import { MapModal } from "components/pages/MainPage/components/questModal/questModal";
import { ContextLogin } from "loginContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import './commercRegisterPage.css';
import { DataContainer } from "./dataContainer"; 
import { DocumentContainer } from "./documentsContainer";
import letterModalIcon from '../../../MainPage/components/questModal/letterModalIcon.svg';
import { CSSTransition } from "react-transition-group";
import { ContextForRegisterOrdinaryCommerc } from "registerOrdinaryToCommercContext";
import { ReviewCard } from "./reviewCard/reviewCard";
import reviewFirstIcon from './reviewCard/reviewFirstIcon.svg';
import reviewSecondIcon from './reviewCard/reviewSecondIcon.svg';
import reviewThirdIcon from './reviewCard/reviewThirdIcon.svg';

type CommercialData = {
    fullname: string
    // firstName: string
    // secondName: string
    // patronymic: string
    email: string
    password: string
    secondPassword: string
    companyName: string
    itn: string
    psrn: string
    document: FormData
}

export const CommercRegistrationPage:React.FC = React.memo(() => {
    const [commercData, setCommercData] = useState<CommercialData>();
    const [documentHref, setDocumentHref] = useState<JSX.Element>();
    const [infoModal, setInfoModal] = useState(<></>);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const {registerOrdinaryUserToCommerc, setRegisterOrdinaryUserToCommerc} = useContext(ContextForRegisterOrdinaryCommerc);
    const loginData = useContext(ContextLogin);
    const navigate = useNavigate();


    function updateCommercData(currentField: string, value: string) {
        setCommercData({...commercData, [currentField]: value});
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();        

        if(commercData.password !== commercData.secondPassword) {
            alert('Пароли не совпадают');
            return;
        }

        // let response = await fetch(`${apiUrl}/api/account`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         nickname: commercData.email.split('@')[0],
        //         password: commercData.password,
        //         email: commercData.email,
        //         sex: "?"                   
        //     }),
        //     credentials: 'include',
        //     headers: {
        //         "content-type": 'application/json'
        //     }
        // });
        
        if(registerOrdinaryUserToCommerc?.email) {
            let responseRegisterCommercialUser = await registerCommercialUser();
            if(responseRegisterCommercialUser.ok) {                
                console.log('регистрация коммерции успешна');
                // let responseDocument = await fetch(`${apiUrl}/api/commercial/document`, {
                //     method: 'POST',
                //     body: commercData.document,
                //     credentials: 'include'                    
                // });

                let responseDocument = await sendDocument();
                if(responseDocument.ok) {
                    console.log('документ отправлен');
                    showSuccsessModal();                    
                } else {
                    navigate('/');
                    console.log('документ не отправлен..')
                }
            } else {
                navigate('/');
                console.log('регистрация коммерции неуспешна..')
            }
        } else {
            let responseRegisterOrdinaryUser = await registerOrdinaryUser();
            if(responseRegisterOrdinaryUser.ok) {
                console.log('регистрация обычного акк успешна');
    
                // let responseCommerc = await fetch(`${apiUrl}/api/commercial/make`, {
                //     method: 'POST',
                //     body: JSON.stringify({
                //         // fullName: `${commercData.secondName} ${commercData.firstName} ${commercData.patronymic}`,
                //         fullName: commercData.fullname,
                //         contactPerson: commercData.companyName,
                //         email: commercData.email,
                //         phoneNumber: '?',
                //         identificationNumber: commercData.itn,
                //         psrn: commercData.psrn
                //     }),
                //     credentials: 'include',
                //     headers: {
                //         "content-type": 'application/json'
                //     }
                // });
    
                let responseRegisterCommercialUser = await registerCommercialUser();
                if(responseRegisterCommercialUser.ok) {                
                    console.log('регистрация коммерции успешна');
                    // let responseDocument = await fetch(`${apiUrl}/api/commercial/document`, {
                    //     method: 'POST',
                    //     body: commercData.document,
                    //     credentials: 'include'                    
                    // });
    
                    let responseDocument = await sendDocument();
                    if(responseDocument.ok) {
                        console.log('документ отправлен');
                        showSuccsessModal();                    
                    } else {
                        navigate('/');
                        console.log('документ не отправлен..')
                    }
                } else {
                    navigate('/');
                    console.log('регистрация коммерции неуспешна..')
                }
            } else {
                navigate('/');
                console.log('регистрация обычного аккаунта неуспешна..')
            }
        }
    }

    async function registerOrdinaryUser() {
        let response = await fetch(`${apiUrl}/api/account`, {
            method: 'POST',
            body: JSON.stringify({
                nickname: commercData.email.split('@')[0],
                password: commercData.password,
                email: commercData.email,
                sex: "?"                   
            }),
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            }
        });
        return response;
    }

    async function registerCommercialUser() {
        let responseCommerc = await fetch(`${apiUrl}/api/commercial/make`, {
            method: 'POST',
            body: JSON.stringify({
                // fullName: `${commercData.secondName} ${commercData.firstName} ${commercData.patronymic}`,
                fullName: commercData.fullname,
                contactPerson: commercData.companyName,
                email: registerOrdinaryUserToCommerc?.email ? registerOrdinaryUserToCommerc?.email : commercData.email,
                phoneNumber: '?',
                identificationNumber: commercData.itn,
                psrn: commercData.psrn
            }),
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            }
        });
        setRegisterOrdinaryUserToCommerc({email: ''});
        return responseCommerc;
    }

    async function sendDocument() {
        let responseDocument = await fetch(`${apiUrl}/api/commercial/document`, {
            method: 'POST',
            body: commercData.document,
            credentials: 'include'                    
        });
        return responseDocument;
    }

    function showSuccsessModal() {
        setInfoModal(<MapModal 
            imageUrl={letterModalIcon}
            titleQuest='Мы отправили данные на проверку'
            quest="Вы можете использовать наше приложение прямо сейчас, однако пока ваши документы не прошли проверку, возможности бизнес-аккаунта будут закрыты. Мы же постараемся проверить их как можно скорее"
            onClickOkButton={() => {
                navigate('/main-page');
                loginData.setIsLogin(true);
            }}
        />);
        setShowInfoModal(true);
    }
    

    async function onLoadDocument(e: React.ChangeEvent<HTMLInputElement>) {
        let document = e.target.files[0];
        let formData = new FormData();
        formData.append('file', document);

        let url = URL.createObjectURL(document);
        setDocumentHref(<a className="commerc-registration-data-side-document-container-input-field-icon-href-document" href={url} rel="noopener noreferrer" target={'_blank'}>Ваш документ</a>);

        setCommercData({...commercData, document: formData});
    }

    return <div className="commerc-registration-page">
        <form className="commerc-registration-data-side" id='commerc-registration-data-side-form' onSubmit={e => onSubmit(e)}>
            <div className="commerc-registration-data-side-header">
                Регистрация
            </div>
                <DataContainer 
                    headerName="Данные владельца компании:"
                    fieldsNames={[
                        {field: 'fullname' , title: 'ФИО'},
                        // {field: 'secondName' , title: 'Фамилия'},
                        // {field: 'firstName', title: 'Имя'},
                        // {field: 'patronymic', title: 'Отчество'},
                        {
                            field: 'email', 
                            title: 'Email', 
                            type: 'email',
                            accessChange: registerOrdinaryUserToCommerc?.email ? true: false,
                            value: registerOrdinaryUserToCommerc?.email ? registerOrdinaryUserToCommerc.email: ''
                        },     
                    ]}
                    updateData={updateCommercData}
                />
                <DataContainer 
                    headerName="Данные компании:"
                    fieldsNames={[
                        {field: 'companyName', title: 'Наименование'},
                        {field: 'itn', title: 'ИНН компании'},
                        {field: 'psrn', title: 'ОГРН компании'}
                    ]}
                    updateData={updateCommercData}
                />                
                <div className="commerc-registration-data-side-documents">
                    <DocumentContainer 
                        titleName="Скан свидетельства ИНН и ОГРН (одним файлом):" 
                        onLoadDocument={onLoadDocument}
                        visualDocument={documentHref}
                    />
                </div>
                <DataContainer 
                    headerName=""
                    fieldsNames={[
                        {field: 'password', title:'Пароль', type: 'password'},
                        {field: 'secondPassword', title:'Повторите пароль', type: 'password'}
                    ]}
                    updateData={updateCommercData}
                />
            <button 
                type="submit" 
                className="commerc-registration-data-side-register-button" 
                form="commerc-registration-data-side-form"
            >
                Зарегистрироваться
            </button>
        </form>
        <div className="commerc-registration-description-side">
            <ReviewCard
                cards={[
                    {
                        imageUrl: reviewFirstIcon,
                        title: "Кому подойдет бизнес-аккаунт?",
                        description: "Если вы предприниматель, заинтересованный в быстром и легком продвижении ваших услуг, то данный аккаунт специально для вас"
                    },
                    {
                        imageUrl: reviewSecondIcon,
                        title: "Продвижение вашего бизнеса?",
                        description: "Наш сервиса поможет обратить внимание людей на ваши услуги, без особых затрат "
                    },
                    {
                        imageUrl: reviewThirdIcon,
                        title: "Особые бутылочки",
                        description: "После офрмления бизнес-аккаунта, вам становятся доступны бутылочки с расширенным функционалом "
                    },                    
                ]}
                
            />
        </div>
        <CSSTransition
            in={showInfoModal}
            timeout={300}
            classNames='show-info-modal'
            unmountOnExit
        >
            {infoModal}
        </CSSTransition>
    </div>
})