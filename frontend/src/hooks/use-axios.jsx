import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from '../config/constants'


export default function useAxios() {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const operation = async (path, method, body = null) => {
        try {
            setLoading(true)
            const response = await axios.request({
                method: method,
                baseURL: BACKEND_URL,
                url: path,
                data: body
            })

            setData(response.data)

        } catch (e) {
            if (e.response.data) {
                setError(e.response.data.message)
            } else {
                setError(e)
            }
        } finally {
            setLoading(false)
        }
    }

    return { data, error, loading, operation }
}