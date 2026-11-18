import express from 'express'

import {ai , model} from "./01_SDK_Gemini.js"


const PORT = 8081
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Heloo from the Server")
})


app.post('/chat', async (req, res) => {

    try {
        const { prompt } = req.body

    // process the prompt from your llm

    const result = await ai.models.generateContent({
        model,
        contents: prompt,
    });

    // send the response back
    res.send(result.text)
        
    } catch (error) {
        console.log(error)
    }
    // recieve the prompt from the client
    
})




app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})