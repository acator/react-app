import React from "react"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import './login.css'
import { thunkCreatorLogin } from '../../Redux/isAuthReducer'
import { maxLength, required } from "../common/validateForm/validForm"
import { Input } from "../common/formControl/formControl"
import { isAuth } from "../../Redux/selectors/isAuth"
import Notification from '../common/notification/notification'
import { error } from "../../Redux/selectors/error"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"


let maxLength15 = maxLength(50)

const FormForRedux: React.FC<InjectedFormProps<FormType>> = ({ handleSubmit }) => {
    let captcha = useSelector(isAuth.getCaptcha)

    return (
        <form className="form_login" onSubmit={handleSubmit}>
            <Field component={Input}
                name="login"
                placeholder="login"
                validate={[maxLength15, required]} />
            <Field component={Input}
                name='password'
                type="password"
                validate={[maxLength15, required]} />
            <div>
                <label>Remember me:</label>
                <Field component={"input"}
                    type="checkbox"
                    name="rememberMe" />
            </div>
            {captcha &&
                <div>
                    <img alt="captcha"
                        src={captcha} />
                    <Field component={Input}
                        name="captcha"
                        type="text" />
                </div>
            }
            <button>Log in</button>
        </form>
    )
}
type FormType = {
    login: string 
    password: string
    rememberMe: boolean
    captcha?: string | null
    
}
const Login = () => {
    const submit: (formData: FormType) => void = (formData: FormType) => {
        dispatch(thunkCreatorLogin(formData.login,
            formData.password,
            formData.rememberMe,
            formData.captcha))
    }
  
    let auth = useSelector(isAuth.getIsAuth)
    let errorNotification = useSelector(error.sendingError)
    let dispatch = useDispatch()
    
    if (auth) {
        return <Redirect to={"/profile"} />
    }
    return (
        
        <div>
            {errorNotification &&
                <Notification>{errorNotification}</Notification>
            }
            <h1>Form of login</h1>
            <FormLoginRedux 
                onSubmit={submit} />
        </div>
    )
}
 
let FormLoginRedux = reduxForm<FormType>({ form: "login" })(FormForRedux)
export default Login as unknown as  React.ComponentClass;