/*import React, { createContext } from 'react';

const obj = {
    signed:false,
    token:'#fff90489',
    user: {

    }
}
COMENTADO É COMO SERIA SEM TYPESCRIPT

const AuthContext = createContext({});
//tipagem, pois e tsx, mas sem typescript, e so mudar a extensão para javascript, e tirar a tipagem
export const AuthProvider = ({ children })=>(
    <AuthContext.Provider value={{signed:false}}>
        {children}
    </AuthContext.Provider>
);

export default AuthContext;
*/

import React, { createContext, useState, useEffect } from 'react';
import { View, ActivityIndicator, AsyncStorage, Text } from 'react-native';
import * as auth from '../services/auth';
import api from '../services/api';


interface User {

    name: string;
    email: string;
}

interface AuthContextData {
    signed:boolean;
    user: User | null;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData); //tipágem
//tipagem, pois e tsx, mas sem typescript, e so mudar a extensão para javascript, e tirar a tipagem
export const AuthProvider: React.FC = ({ children })=>{ // children pr passar td dentro dessa variavel como children

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadStorageData(){ 
            //pega do storage e ve se tem usuario, funciona como verificacão do  cookie ou session no php
            const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

            if(storagedUser && storagedToken){
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
                setUser(JSON.parse(storagedUser));
                setLoading(false);  //qd terminar de carregar da um setLoading false, pra parar de carregar
            }
            else if (!storagedUser && !storagedToken) {
                setLoading(false);
            }
            else{
                setLoading(false)
                alert("OOOPSS, you 've got an error")
            }
        }
        loadStorageData();
    }, []);

    async function signIn(){
        const response = await auth.signIn();
        setUser(response.user);

        api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user) );
        await AsyncStorage.setItem('@RNAuth:token', response.token );
    }

    function signOut(){
        AsyncStorage.clear().then(()=>{
            setUser(null);
        }); 
    }

    //se o user existir/logado(true) retorna que está logado, caso contrário retorna que está logado = false
    //passa o nome do usuário

    return(
        <AuthContext.Provider value={{signed: Boolean(user), user,loading, signIn, signOut }}> 
            {children}
        </AuthContext.Provider>
    );
    
};

export default AuthContext;

