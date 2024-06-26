import { Button, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <HStack p={4} gap={8} justifyContent={'center'} shadow={'base'} bgColor={'blackAlpha.900'} pos={'sticky'} top={0} >
        
        <Button variant={'unstyled'} color={'white'} > 
        <Link to={'/'}> Home</Link>
        </Button>
        
        <Button variant={'unstyled'} color={'white'} > 
        <Link to={'/coins'}> Coins</Link>
        </Button>
        
        <Button variant={'unstyled'} color={'white'} > 
        <Link to={'/exchanges'}> Exchanges</Link>
        </Button>
        
         </HStack>

    </>
  )
}

export default Header
