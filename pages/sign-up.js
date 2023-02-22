import {signUp,useAuth} from '../firebase/firebase';
import { useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {setLoading} from '../redux/authentication';

const SignUp = () => {
    const loading = useSelector(state => state.auth.loading);
    const dispatch = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();
    const currentUser = useAuth();

    async function handleSignUp(){
        dispatch(setLoading(true))
        try{
          await signUp(emailRef.current.value,passwordRef.current.value);
        }catch{
          alert("Error!")
        }
        dispatch(setLoading(false))
      }

    return <div>
      <div id="fields" >
      <input ref={emailRef} placeholder='Email' />
      <input ref={passwordRef} type="password" placeholder='Password' />
      </div>
      <button disabled={loading || currentUser !== null} onClick={handleSignUp} >Sign Up</button>
    </div>
}

export default SignUp