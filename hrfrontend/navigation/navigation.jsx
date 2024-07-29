import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Profile } from "../components/profile";
import { Team } from "../components/team";
import { Building } from "../components/building";
import { Shifts } from "../components/shifts";
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator()

export const TabNavigator = () =>{
    return(
        <Tab.Navigator
            screenOptions={({route})=>({
                tabBarIcon: ({focused , color , size})=>{
                    let iconName;
                    if (route.name === 'Profile') {
                        iconName = focused
                            ? 'person-circle'
                            : 'person-circle-outline';
                    } else if (route.name === 'Team') {
                        iconName = focused ? 'people' : 'people-outline';
                    } else if (route.name === 'Building') {
                        iconName = focused ? 'business' : 'business-outline';
                    } else if (route.name === 'Shifts') {
                        iconName = focused ? 'time' : 'time-outline';
                    }    
                    return <Ionicons name={iconName} size={size} color={color} />                
                }
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Team" component={Team} />
            <Tab.Screen name="Building" component={Building}/>
            <Tab.Screen name="Shifts" component={Shifts} />
        </Tab.Navigator>
    )
}