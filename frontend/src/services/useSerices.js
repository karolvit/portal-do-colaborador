import {api, requestConfig} from '../utils/config'


const perfil = async(data, token) => {
    const config = requestConfig("GET", data, token);


    try {
        const res = await fetch(api + "/dado", config)
                .then((res) => res.json())
                .catch((err) => err)
                return res
    } catch (error) {
        console.log(error)
    }
}

const updatePerfil = async(data, token) =>{
    const config = requestConfig("PUT", data, token, true)

    try {
        const res = await fetch(api + "/meuperfil/update", config)
            .then((res) => res.json())
            .catch((err) => err)
    } catch (error) {
        console.log(error)
    }
}


const userService = {
    perfil,
    updatePerfil,
}

export default userService