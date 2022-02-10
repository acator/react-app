import React, { ComponentType } from 'react'
import { useDispatch } from 'react-redux'
import { DecoratedComponentClass, DecoratedFormProps, Field, InjectedFormProps, reduxForm} from 'redux-form'
import { sendChatMessages } from '../../Redux/chatReducser'
type FormProps ={

    message?: string 
    dis: boolean
}

type Form= {
    dis: boolean
    sendMessage: (formData: { message: string }) => void 

}

const FormForMessage: React.FC<InjectedFormProps<Form, FormProps> & FormProps >= (props) => {
    return (
        <form onSubmit={props.handleSubmit}
            className="createMessages">
            <Field component={"textarea"}
                name="message" />
            <button disabled={props.dis}>Отправить</button>
        </form>
    )
}

const CreateMessage: React.FC<FormProps > = (props) => {
    const dispatch = useDispatch()
    const sendMessage = (formData: {message?:string } ) => {
        
        dispatch(sendChatMessages(formData.message))
        formData.message = ""
    }
    return (
        <FormForMessageRedux onSubmit={sendMessage} dis={props.dis} sendMessage={sendMessage} />
    )
}
const FormForMessageRedux = reduxForm<FormProps, Form>({ form: "message" })(FormForMessage as unknown as ComponentType<Form & InjectedFormProps<FormProps, Form>>) as unknown as DecoratedComponentClass<FormProps, DecoratedFormProps<FormProps, Form>>

export default CreateMessage