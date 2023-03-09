import { useEffect, useState } from "react";
import {useAuth,logOut} from '../../firebase/firebase';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { IntlProvider,FormattedMessage } from "react-intl";
import LayoutContext from "./layoutContext";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../redux/theme";
import {useCookies} from 'react-cookie';
import {message} from '../../data/langData';
import Link from 'next/link';
import { useRouter} from 'next/router';
import {setLoading} from '../../redux/authentication';


//Using Redux reducers at the top of the component tree
//import {increment,decrement,incrementByAmount} from '../../redux/counter'

//Might be useful for later
//import { useOnScreen,useMediaQuery } from '../../utils/hooks';
//


export default function Layout(props) {
  const [cookie, setCookie] = useCookies(["lang"])

  // const loading = useSelector(state => state.auth.loading);
  const language = useSelector(state => state.theme.language)
  const dispatch = useDispatch();

  const router = useRouter();

  const user = useAuth();
  console.log(user);
    //Get the global state
   
    //using dispatch function to dispatch actions
    


 // const [size, setSize] = useState();
  //const [ref, visible] = useOnScreen({ rootMargin: '-100px' })
  //const size = useMediaQuery(768)
  // useEffect(() => {
  //   setSize(document.body.clientWidth);
  // }, []);
  // useEffect(() => {
  //   const onResize = (e) => {
  //     setSize(e.target.outerWidth);
  //   };
  //   window.addEventListener("resize", onResize);
  //   return () => {
  //     window.removeEventListener("resize", onResize);
  //   };
  // }, []);

  useEffect(()=>{
    if(cookie.lang){
      dispatch(setLanguage(cookie.lang))
    }else if(navigator.language){
      let ln = navigator.language.split("-")
      dispatch(setLanguage(ln[0]))
      setCookie("lang",ln[0])
    }
  },[cookie, dispatch, setCookie])
  
  async function handleLogout(){
    setLoading(true);
    try{
      logOut()
    }catch(error){
      alert(error);
    }
    router.push("/")
  }

  const handleChange = (e) => {
    dispatch(setLanguage(e.target.value))
    setCookie("lang",e.target.value)
  };
  return (
    <>
    <LayoutContext.Provider value={language} >
    <select onChange={handleChange}>
      {['en','tr'].map((x)=>(
        <option value={x} key={x}>{x}</option>
      ))}
    </select>
   
    <IntlProvider locale={language} messages={message[language]} >
    {user ? <button onClick={handleLogout} ><FormattedMessage id="logout_button" defaultMessage="Default" values={{language}} ></FormattedMessage></button> 
    : <div>
    <Link href="/patient-sign-up" ><FormattedMessage id="patient_sign_up_link"/></Link> <br/> 
    <Link href="/doctor-sign-up" ><FormattedMessage id="doctor_sign_up_link"/></Link> <br/>
    <Link href="/patient-login" ><FormattedMessage id="patient_login_link"/></Link> <br/>
    <Link href="/doctor-login" ><FormattedMessage id="doctor_login_link"/></Link> <br/>
    </div>
    
    }

    <Header title={<FormattedMessage id="heading" defaultMessage="Default" values={{language}} />} />
     <main title="Main">
       {props.children}
     </main>
     <Footer footer_title={<FormattedMessage id="heading" defaultMessage="Default" values={{language}} />} />
    
    </IntlProvider>
    </LayoutContext.Provider>
    </>
  );
}