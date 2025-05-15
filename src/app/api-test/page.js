"use client"

import { useEffect, useState } from "react";
import axios from "@/lib/axios.js";

export default function TestApi() {
    const [message, setMessage] = useState();

    useEffect(() => {
        axios.get('/test')
            .then(res => setMessage(res.data.message))
        .catch(err => setMessage('Fel' + err.message))
    }, [])

    return (
        <>
            <h2>Test av API</h2>
            <p>{ message }</p>
        </>
    )
}