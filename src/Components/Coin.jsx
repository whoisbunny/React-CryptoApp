import  { useEffect, useState } from 'react'
import axios  from 'axios'
import { Button, Container, HStack, Radio, RadioGroup, VStack, } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorPage from './ErrorPage'
import CoinCard from './CoinCard'
const server = import.meta.env.VITE_SERVER;


const Coin = () => {

  const [coins , setCoins] = useState([])
  const [loading , setLoading] = useState(true)
  const [error , setError] = useState(false)
  const [page , setPage] = useState(1)
  const [currency , setCurrency] = useState("inr")

  const currencySymbol = currency === "inr" ? "₹" :currency === "eur" ? "€" :"$"

  const changePage = (page) => {
    setPage(page)
    setLoading(true)

  }
const btns = new Array(32).fill(1)

  useEffect(() => {
    const fetchCoins = async () =>{
      try {
        
        const {data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}` )
        
        setCoins(data);
       
        setLoading(false)

      } catch (error) {
       setError(true)
       setLoading(false)
      }
    }
    fetchCoins()
  }, [currency , page])
  
if(error) return <ErrorPage message = {'Error while fatching Coins'}/>

  return (
    <>
      <Container maxW={'container.xl'} >

{ loading ? <Loader/> : <>
<VStack  >

<RadioGroup value={currency} onChange={setCurrency} p={8} >
    <HStack spacing={4}>
      <Radio value='inr'>INR</Radio>
      <Radio value='eur'>EUR</Radio>
      <Radio value='usd'>USD</Radio>
    </HStack>

</RadioGroup>
</VStack>


<HStack wrap={'wrap'} justifyContent={'space-evenly'}>

{coins.map(i=> (

  <CoinCard 
   name={i.name} 
   symbol={i.symbol}
     currencySymbol={currencySymbol} 
    img={i.image} 
    key={i.id}
    id={i.id}
    price={i.current_price}
    />
))}

</HStack>
<HStack w={'full'} overflowX={'auto'}>
  {btns.map((item , index)=> (
    <Button key={index} onClick={()=>changePage(index + 1) } color={'white'} bgColor={'blackAlpha.900'}> 
    {index + 1}
  </Button>
  ))}
</HStack>

</>}

      </Container>
    </>
  )
}




export default Coin
