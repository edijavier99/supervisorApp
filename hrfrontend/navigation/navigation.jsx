import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Profile } from "../components/profile";
import { Team } from "../components/team";

const Tab = createBottomTabNavigator()

export const TabNavigator = () =>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="Team" component={Team} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}