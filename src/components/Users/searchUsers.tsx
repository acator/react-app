import React from "react"
import { Formik, Form, Field }  from "formik"
import { filterUsers } from "../../Redux/usersReduser"
import { useSelector } from "react-redux"
import { users } from "../../Redux/selectors/users"

type Props = {
    errorLoading: string | null
    totalCount: number | null
    count: number
    pageNumber : null | number
    setUserSearch: (pageNumber: number | null, term: string, friend: filterUsers["friend"]) => void

}

type Value  = {
    terms: string
    friend: "null" | "false" | "true"
}
const SearchingUsers: React.FC<Props>= (props) => {
    const filter = useSelector(users.filter)
    let submit = (values: Value, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void } ) => {
        props.setUserSearch( props.pageNumber, values.terms, values.friend)
        setSubmitting(false)
    }
   
    
    return (
        <div>
            <Formik
                enableReinitialize ={ true}
                initialValues={{ terms: filter.term, friend: filter.friend }}
                
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="terms" />
                        <Field as="select" type= "checkbox" name="friend">
                            <option value="null">All users</option>
                            <option value="true">Only friends</option>
                            <option value="false">non-subscribed users</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}



export default SearchingUsers