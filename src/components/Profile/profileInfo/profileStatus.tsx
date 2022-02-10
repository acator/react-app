import  React, { ComponentType } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { LoginType } from '../../../DAL/typeRequest'
import {  thunkCreatorProfileSetStatus } from '../../../Redux/profileReduser'
import { ThunkAppDispatch } from '../../../Redux/storeRedux'
import {  InputStatus } from '../../common/formControl/formControl'
type Props = {
    isAuth:boolean
    isOur:boolean
    status:string | null
}
const ProfileStatus: React.FC<Props> = ({ isOur, status, isAuth}) => {
   
    let [open, setOpen] = useState(true)
    const dispatch: ThunkAppDispatch = useDispatch();
    let submit =  (formData: StatusType) => {
        if (!formData.status) {
            formData.status = ""
        }
        dispatch(thunkCreatorProfileSetStatus(formData.status)).then(response => {
            if (response !== undefined){
            if (response.resultCode   === 1 ) {return  undefined}else{ setOpen(true)}
            }
        })
    }
    let statusCreate = () => {
        if (isOur) {
            setOpen(false)
        }
    }
   
    return (
        <>
            {open &&
                <div onDoubleClick={() => { statusCreate() }}>
                    <span>Статус: </span>
                    <span>{status}</span>
                </div>
            }
            
            {!open &&
            
                <StatusReduxForm initialValues={status as Partial<Status>}
                onSubmit={submit} isAuth={isAuth} isOur={isOur} status={status}
                />
                   
            }
        </>
    )
}
type Status = {
    submit: (formData: StatusType) => void
    initialValues?: Partial<StatusType>
    status: string | null

}
type StatusType  ={
    status: string | null
   
}
const StatusForm: React.FC<InjectedFormProps<Status> > = ({error, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field component={InputStatus}
                error={error}
                name="status"
                type="text" />
            <button>Отправить</button>
        </form>
    )
}
let StatusReduxForm = reduxForm<Status, Props, string>({ form: "status" })(StatusForm as ComponentType<Props & InjectedFormProps<Status, Props, string>>)
export default ProfileStatus;