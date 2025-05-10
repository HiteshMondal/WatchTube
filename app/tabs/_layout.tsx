import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

const TabIcon = ({ focused, icon, title }: any) => {
  return focused ? (
    <ImageBackground 
      source={images.highlight}
      className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
    >
      <Image source={icon} tintColor="#151312" className="size-5" accessibilityLabel={title} />
      <Text className='text-white font-semibold ml-3'>{title}</Text>
    </ImageBackground>
  ) : (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" accessibilityLabel={title} />
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#151312',
          borderColor: '#151312',
          borderRadius: 50,
          marginHorizontal: 10,
          marginBottom: 30,
          position: 'absolute',
          overflow: 'hidden'
        }
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.home} title="Home" />
        }}
      />
      <Tabs.Screen 
        name="search" 
        options={{ 
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.search} title="Search" />
        }}
      />
      <Tabs.Screen 
        name="saved" 
        options={{ 
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.save} title="Saved" />
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.person} title="Profile" />
        }}
      />
    </Tabs>
  );
}

export default _layout;
