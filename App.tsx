import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index';
import  AuthContext  from './src/contexts/auth';
import { AuthProvider } from './src/contexts/auth';

export default function App(){

    const [signed, setSigned] = useState(false);

    return(
        <NavigationContainer>
                <AuthProvider>
                    <Routes />
                </AuthProvider>
        </NavigationContainer>
        
    );
}
