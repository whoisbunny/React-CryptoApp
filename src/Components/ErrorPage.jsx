import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorPage = ({message}) => {
  return (
    <>
<Alert status='error' pos={'fixed'} bottom={8} left={'50%'} transform={'translateX(-50%)' } w={'container.lg'}>
    <AlertIcon/>
     {message}


</Alert>
    
    </>
  )
}

export default ErrorPage
