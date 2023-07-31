import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, StatUpArrow, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import axios  from 'axios'
import {server} from '../index'
import { useParams } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Chart from './Chart'
import { wrap } from 'framer-motion'

const CoinDetails = () => {
  
  const [coin , setCoin] = useState([])
  const [loading , setLoading] = useState(true)
  const [error , setError] = useState(false)
  const [page , setPage] = useState(1)
  const [currency , setCurrency] = useState("inr")
  const [days , setDays] = useState('24h')
  const [chartArray , setChartArray] = useState([])
  const params = useParams();
  
  const currencySymbol = currency === "inr" ? "₹" :currency === "eur" ? "€" :"$"
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    
    const fetchCoin = async () =>{
   
      
      try {
        const {data} = await axios.get(`${server}/coins/${params.id}` )
        const {data : chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}` )
      
        setCoin(data);
        setChartArray(chartData.prices)
        setLoading(false)

      } catch (error) {
        console.log('error');
       setError(true)
       setLoading(false)
      }
    }
    fetchCoin()
  }, [params.id , days , currency])
if(error) return <ErrorPage message = {'Error while fatching Coin'}/>
  

  return (
    <Container maxW={'container.xl'}>


    {loading ? <Loader/>:
<>

<HStack p={4} wrap={'wrap'}>
  {btns.map((i)=>(
    <Button key={i} onClick={()=>switchChartStats(i)}>{i} </Button>
  ))}


</HStack>
<Box w={'full'} borderWidth={1}>
  <Chart arr={chartArray} currency={currencySymbol} days={days}/>

</Box>

<VStack  >
<RadioGroup value={currency} onChange={setCurrency} p={8} >
    <HStack spacing={4}>
      <Radio value='inr'>INR</Radio>
      <Radio value='eur'>EUR</Radio>
      <Radio value='usd'>USD</Radio>
    </HStack>

</RadioGroup>
</VStack>


<VStack alignItems={'flex-start'} spacing={4} p={16} > 
<Text fontSize={'small'} alignSelf={'center'} opacity={0.7}>
  Last Updated On {Date(coin.market_data.last_updated).split('G')[0]} 
</Text>
<Image src={coin.image.large} w={16}h={16} objectFit={'contain'}>

</Image>
<Stat>
  <StatLabel>{coin.name}</StatLabel>
  <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
  <StatHelpText>
    <StatUpArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase":"decrease"}/>
      {coin.market_data.price_change_percentage_24h }%
  </StatHelpText>
</Stat>

<Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'}>{coin.market_cap_rank}</Badge>
<CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}/>
<Box>
  <Item title={'Max Supply'} value={coin.market_data.max_supply}/>
  <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply}/>
  <Item title={'Market Cap'} value={`${currencySymbol}${coin.market_data.market_cap[currency]} `}/>
  <Item title={'All Time Low'} value={`${currencySymbol}${coin.market_data.atl[currency]} `}/>
  <Item title={'All Time High'} value={`${currencySymbol}${coin.market_data.ath[currency]} `}/>
</Box>
</VStack>
</>
    
    }
    </Container>
    )
}



const Item = ({title ,value}) => (
  <HStack justifyContent={'space-between'} w={'full'} my={4}>
    <Text fontFamily={'Bebas Neua'} letterSpacing={'widest'}> {title}</Text>
    <Text>{value}</Text>
  </HStack>
)

const CustomBar = ({high , low})=>(
  <VStack w={'full'}>
    <Progress value={50} colorScheme='teal' w={'full'}/>
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme='red'/>
      <Text fontSize={'sm'}>24h Range</Text>
      <Badge children={high} colorScheme='green'/>
    </HStack>

  </VStack>
)

export default CoinDetails
