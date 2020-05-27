import React, { useContext } from 'react';
import { View, Button, Text } from 'react-native';
import  AuthContext  from '../../contexts/auth';

export default function Dashboard(){
    const { user, signOut } = useContext(AuthContext);
    /*async function handleSignOut(){
        await signOut();
    }*/
    function handleSignOut(){
        signOut(); // como é so deslogar nao precisa enviar e nem pegar nada do backend, então nao precisa de async await
    }

    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{marginBottom:20, fontWeight:'bold'}}>Olá, {user?.name}</Text>
            <Button title="Sign out" onPress={handleSignOut} />
        </View>
    );
}