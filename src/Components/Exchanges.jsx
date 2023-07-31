import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import {server} from '../index'
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorPage from './ErrorPage'
const Exchanges = () => {

  const [exchanges , setExchanges] = useState([])
  const [loading , setLoading] = useState(true)
  const [error , setError] = useState(false)


  useEffect(() => {
    const fetchExchanges = async () =>{
      try {
        
        const {data } = await axios.get(`${server}/exchanges` )
        
        setExchanges(data);
        setLoading(false)

      } catch (error) {
       setError(true)
       setLoading(false)
      }
    }
    fetchExchanges()
  }, [])
  
if(error) return <ErrorPage message = {'Error while fatching Exchanges'}/>

  return (
    <>
      <Container maxW={'container.xl'} >

{ loading ? <Loader/> : <>

<HStack wrap={'wrap'} justifyContent={'space-evenly'}>

{exchanges.map(i=> (

  <ExchangeCard name={i.name} rank={i.trust_score_rank} url={i.url} img={i.image} key={i.id}/>
))}

</HStack>

</>}

      </Container>
    </>
  )
}




const ExchangeCard =({name, img, rank , url})=>(
  
  <a href={url} target='blanck'> 
  
  <VStack w={52} shadow={'lg'} borderRadius={'lg'} p={8} transition={'all 0.3 ' } m={4} css={{
    "&:hover":{
      transform:'scale(1.1)'
    }
  }}> 

  <Image src={img} objectFit={'contain'} w={10} h={10} alt='Exchanges'/>
  <Heading size={'md' } noOfLines={1} > {rank}  </Heading>
  <Text noOfLines={1}> {name}</Text>

  </VStack>
  
  </a>  
)

export default Exchanges
