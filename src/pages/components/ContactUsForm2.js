import React, { useState } from 'react'
import TextInput from '../../components/forms/TextInput'
import { Form, Formik } from 'formik'
import TextArea from '../../components/forms/TextArea'
import useContactUsForm from '../../hooks/useContactUsForm'
import { contactValidationSchema } from '../../utils/validation'

const ContactUsForm2 = () => {

    const { handleSubmit, isLoading } = useContactUsForm()
    return (
        <div>
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    mobile: '',
                    message: '',
                }}
                validationSchema={contactValidationSchema}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    setFieldValue,
                    handleChange,
                    handleBlur,
                    errors,
                    setFieldError,
                }) => {
                    return (
                        <Form className="grid grid-cols-2 gap-4">
                            <TextInput

                                type="text"
                                placeholder="Full name"
                                name='fullName'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.fullName}
                            />
                            <TextInput

                                type="email"
                                placeholder="Enter email"
                                name='email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <div className='col-span-2'>
                                <TextInput

                                    type="text"
                                    placeholder="Enter mobile"
                                    name='mobile'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.mobile}
                                />
                            </div>
                            <div className='col-span-2'>
                                <TextArea
                                    placeholder="Enter message"
                                    name='message'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.message}
                                />
                            </div>
                            <div className='flex col-span-2 justify-center items-center'>
                                <button disabled={isLoading} type='submit' className="btn-primary">{isLoading ? 'Loading...' : 'Submit'}</button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default ContactUsForm2