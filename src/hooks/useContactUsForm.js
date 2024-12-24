import React, { useState } from 'react'
import { toast } from 'react-toastify';
import ToastMsg from '../components/toast/ToastMsg';
import { contactUsRequest } from '../api/api';

const useContactUsForm = () => {
    const [isLoading,setIsLoading] = useState(false)
    const handleSubmit = async (values, actionForm) => {
        setIsLoading(true)
        try {
          let formData = { ...values };
          const res = await contactUsRequest(formData);
          const { status, data } = res;
          if (status >= 200 && status < 300) {
            toast.success(<ToastMsg title={`Sent Successfully`} />);
            actionForm.resetForm()
          } else {
            toast.error(<ToastMsg title={data.message} />);
          }
        } catch (error) {
          console.log(error, 'while contacting admin error')
          toast.error(<ToastMsg title={error?.response?.data?.message} />);
        } finally { 
            setIsLoading(false)
         }
    
      };

    return {
        isLoading,
      handleSubmit
  
 
}
}

export default useContactUsForm