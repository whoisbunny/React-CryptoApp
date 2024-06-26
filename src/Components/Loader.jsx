import { Box, Spinner, VStack } from '@chakra-ui/react'

const Loader = () => {
  return (
    <>
   <VStack h={'90vh'} justifyContent={'center'}>
    <Box transform={'scale(3)'}></Box>
    <Spinner size={'xl'}/>
    
    </VStack> 
    </>
  )
}

export default Loader
