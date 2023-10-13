import React from "react";
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, register, reset } from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner'
import * as Components from './Components';

function LogReg() {
    const [formData, setFormData] = useState({
      nic: '',
      name: '',
      email: '',
      password: '',
      passwordReg2: '',
      })
      const [signIn, toggle] = React.useState(true);

      const { nic, name, email, password, passwordReg2 } = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
    
      const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        // if (isSuccess || user) {
        //   navigate('/dashboard');
        // }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }

      const onSubmitLog = (e) => {
        e.preventDefault()
    
        const userData = {
          nic,
          password,
        }
    
        dispatch(login(userData)).then((res) => {
          if (res.payload.token) {
            navigate('/dashboard');
          }
        })
      }

      const onSubmitReg = (e) => {
        e.preventDefault()
    
        if (password !== passwordReg2) {
          toast.error('Passwords do not match')
        } else {
          const userDataReg = {
            nic,
            name,
            email,
            password,
            userRole : 1,
          }
    
          dispatch(register(userDataReg)).then((res)=>{
            if (res.payload) {
              toast.success(res.payload)
            }
          })
        }
      }
    
      if (isLoading) {
        return <Spinner />
      }

     return(
      <Components.PageBackground>
        <br/><br/>
         <Components.Container>
             <Components.SignUpContainer signinIn={signIn}>
                 <Components.Form onSubmit={onSubmitReg}>
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input type='text' placeholder='NIC Number' id='nic' name='nic' value={nic} onChange={onChange}/>
                     <Components.Input type='text' placeholder='Name' id='name' name='name' value={name} onChange={onChange}/>
                     <Components.Input type='email' placeholder='Email' id='email' name='email' value={email} onChange={onChange}/>
                     <Components.Input type='password' placeholder='Password' id='password' name='password' value={password} onChange={onChange}/>
                     <Components.Input type='password' placeholder='Confirm Password' id='passwordReg2' name='passwordReg2' value={passwordReg2} onChange={onChange}/>
                     <Components.Button>Sign Up</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={signIn}>
                  <Components.Form onSubmit={onSubmitLog}>
                      <Components.Title>Sign in</Components.Title>
                      <Components.Input type='text' placeholder='NIC Number' id='nic' name='nic' value={nic} onChange={onChange}/>
                      <Components.Input type='password' placeholder='Password' id='password' name='password' value={password} onChange={onChange} />
                      <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                      <Components.Button>Sigin In</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signIn}>
                 <Components.Overlay signinIn={signIn}>

                 <Components.LeftOverlayPanel signinIn={signIn}>
                     <Components.Title>Welcome Back!</Components.Title>
                     <Components.Paragraph>
                         To keep connected with us please login with your personal info
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title>Welcome Back!</Components.Title>
                       <Components.Paragraph>
                           Enter Your personal details and start journey with us
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sigin Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>

         </Components.Container>
         </Components.PageBackground>
     )
}

export default LogReg;