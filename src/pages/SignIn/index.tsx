import React, { useContext } from 'react';
import { View, Button } from 'react-native';
import  AuthContext  from '../../contexts/auth';

export default function SignIn(){
    const { signed, user, signIn } = useContext(AuthContext);
    async function handleSignIn(){
        await signIn();  //chamada da API aqui
        //const response = await signIn();
        //response.data
    }

    return(
        <View style={{flex:1, justifyContent:'center'}}>
            <Button title="Sign in" onPress={handleSignIn}/>
        </View>
    );
}