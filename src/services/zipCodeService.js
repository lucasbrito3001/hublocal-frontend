import axios from "axios"

export const getAdressByZipCode = async (zipCode) => {
    const { data: { bairro, localidade, logradouro, uf } } = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
    return { 
        district: bairro,
        street: logradouro,
        city: localidade,
        state: uf
    }
}