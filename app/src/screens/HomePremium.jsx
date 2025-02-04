import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons,Feather } from "@expo/vector-icons"; 

export default function HomePremium() {
  return (
    <View>
      <View className='ml-[25px] mt-[35px]'><Text className = "text-orange1  text-[35px] font-mono font-[900]">Choose Your Plan</Text></View>
      <View className='border-2 border-orange1 w-100% h-[100px] ml-[25px] mr-[25px] mt-[20px] rounded-[15]'>
        <View className="flex flex-row mt-[5px]">
          <View className="ml-[20px] mt-[4px] flex-1">
            <Text className='text-[20px] font-[800]'>Yearly</Text>
          </View>
          <View className="ml-[5px] mb-[10px] mt-[5px] pt-[3px] pb-[3px] pl-[20px] pr-[20px] flex-1 bg-orange1 rounded-[45]">
            <Text className='text-white text-center'>Best Value</Text>
          </View>
          <View className="flex-1 mt-[5px] ml-[52px]">
            <Text className='text-[17px] line-through'>$120</Text>
          </View>
        </View>

 
        <View className="flex flex-row -mt-[8px]">
          <View className="ml-[20px] mt-[10px] flex-1">
            <Text className='text-[12px] font-[700]'>+ Save 50%</Text>
          </View>
          <View className="flex-1 pb-[-20px] mr-[30px] items-end -mt-[3px]">
            <Text className='text-[25px] font-[700]'>$60</Text>
          </View>
        </View>

        <View className="flex flex-row -mt-[8px]">
          <View className="ml-[20px]  flex-1">
            <Text className='text-[12px] font-[700]'>+ Get 7 days free</Text>
          </View>
          <View className="flex-1 pb-[-4px] mr-[33px] mt-[2px] items-end ">
            <Text className='text-[14px]'>yearly</Text>
          </View>
        </View>
      </View>
      <View className='border-2 border-orange1 w-100% h-[100px] ml-[25px] mr-[25px] mt-[20px] rounded-[15]'>
        <View className="flex flex-row mt-[5px]">
          <View className="ml-[15px] mt-[4px] flex-1">
            <Text className='text-[20px] font-[800]'>3 Months</Text>
          </View>
          <View className="ml-[5px] mb-[10px] mt-[5px] pt-[3px] pb-[3px] pl-[5px] pr-[5px] flex-1 bg-orange1 rounded-[45]">
            <Text className='text-white text-center'>Most Popular</Text>
          </View>
          <View className="flex-1 mt-[5px] ml-[50px] mr-[-16px]">
            <Text className='text-[17px] line-through'>$30</Text>
          </View>
        </View>

 
        <View className="flex flex-row -mt-[8px]">
          <View className="ml-[16px] mt-[10px] flex-1">
            <Text className='text-[12px] font-[700]'>+ Save 16%</Text>
          </View>
          <View className="flex-1 pb-[-20px] mr-[30px] items-end -mt-[3px]">
            <Text className='text-[25px] font-[700]'>$24</Text>
          </View>
        </View>

        <View className="flex flex-row -mt-[8px]">
          <View className="ml-[16px]  flex-1">
            <Text className='text-[12px] font-[700]'>+ Get 7 days free</Text>
          </View>
          <View className="flex-1 pb-[-4px] mr-[16px] items-end mt-[2px] ">
            <Text className='text-[14px]'>Quarterly</Text>
          </View>
        </View>
      </View>

      <View className='border-2 border-orange1 w-100% h-[100px] ml-[25px] mr-[25px] mt-[20px] rounded-[15]'>
        <View className="flex flex-row mt-[5px] mb-[6px]">
          <View className="ml-[15px] mt-[4px] flex-1">
            <Text className='text-[20px] font-[800]'>1 Months</Text>
          </View>
          {/* <View className="ml-[5px] mb-[10px] mt-[5px] pt-[3px] pb-[3px] pl-[5px] pr-[5px] flex-1 bg-orange1 rounded-[45]">
            <Text className='text-white text-center'>Most Popular</Text>
          </View> */}
          <View className="flex-1 mt-[5px] ml-[50px] mr-[-104px]">
            <Text className='text-[17px] line-through'>$10</Text>
          </View>
        </View>

 
        <View className="flex flex-row -mt-[8px]">
          <View className="ml-[16px] mt-[10px] flex-1">
            <Text className='text-[12px] font-[700]'>+ Save 16%</Text>
          </View>
          <View className="flex-1 pb-[-20px] mr-[30px] items-end -mt-[3px]">
            <Text className='text-[25px] font-[700]'>$8.4</Text>
          </View>
        </View>

        <View className="flex flex-row -mt-[8px]">
          <View className="ml-[16px]  flex-1">
            <Text className='text-[12px] font-[700]'>+ Get 7 days free</Text>
          </View>
          <View className="flex-1 pb-[-4px] mr-[29px] items-end mt-[2px] ">
            <Text className='text-[14px]'>Monthly</Text>
          </View>
        </View>
      </View>

      <View className='border-2 border-orange1 w-[332px] h-[50px] ml-[25px] mt-[20px] rounded-[15] flex flex-row items-center px-4'>
        <View className='flex-1'>
          <Text className='text-[20px] font-mono font-[400]'>Get It For Free</Text>
        </View>
        <View>
          <Feather name="arrow-right" size={30} color="#F9862D" />
        </View>
      </View>

      
      <View className='ml-[23px] mt-[25px] mr-[23px]'>
        <Text className='font-[400] text-justify'>If you choose to purchase this subscription, payment will be craged to your google account, and your account will charged within 24 hours prior to the end of your current plan. You cancel the auto renewal of your subscription anytime by going to the settings>subscription>cancel auto-renewal after the payment. </Text>
      </View>
      <View className='border-2 border-orange1 w-[332px] h-[50px] ml-[25px] bg-orange1 mt-[25px] rounded-[15] flex flex-row justify-center items-center'>
        <Text className='text-white text-center text-[20px] font-semibold'>Continue To Purchase</Text>
      </View>

      <View className='mt-[20px]'>
        <Text className='text-center font-[400]'>Terms and Conditions / Privacy Policy</Text>
      </View>

    </View>
  )
}
