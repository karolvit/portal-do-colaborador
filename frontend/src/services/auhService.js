import {api, requestConfig} from '../utils/config'


const login = async(data) =>{
    const config = requestConfig("POST", data)

    try {
        const res =  await fetch(api + "/login", config)
                    .then((res) => res.json())
                    .catch((err) => err)
        if(res){
            localStorage.setItem("user", JSON.stringify(res))

            setTimeout(() =>{
                localStorage.removeItem("user")
            }, 60000)
        }
        return res;
    } catch (error) {
        console.log(error)
    }
}

const logout = () => {
    localStorage.removeItem("user")
}


const authService = {
    login,
    logout,
}
export default authService
