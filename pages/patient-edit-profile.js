import {signUp,useAuth} from '../firebase/firebase';
import { useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {setLoading} from '../redux/authentication';
import { IntlProvider,FormattedMessage } from "react-intl";
import {message} from '../data/langData';

const EditProfile = () =>{
    const loading = useSelector(state => state.auth.loading);
    const language = useSelector(state => state.theme.language)
    const dispatch = useDispatch();

    const name = useRef();
    const surname = useRef();
    const ID = useRef();
    const currentUser = useAuth();
   
    console.log(currentUser == undefined ? "" : currentUser.email )

    return <IntlProvider locale={language} messages={message[language]} >
        <FormattedMessage id="edit_profile_heading" defaultMessage="default" values={{language}} /> : 
        <div id="fields" >
            <input ref={name} placeholder='Name' />
            <input ref={surname} placeholder='Surname' />
            <input ref={ID} placeholder='ID No.' />
        </div>
    </IntlProvider>
}
export default EditProfile