interface Response {
    token:string;
    user:{
        name:string;
        email:string;
    };
}

export function signIn(): Promise<Response>{
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve({
                token: '#fff90489',
                user:{
                    name: 'José Thomaz',
                    email:'jtsoares17@hotmail.com'
                },
            })
        }, 2000);
    });
}