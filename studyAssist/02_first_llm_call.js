import { ai, model } from './01_SDK_Gemini.js'


async function main() {
    try {

        const prompt = "Explain closures in Javascript"


        const result = await ai.models.generateContent({
            model,
            contents: prompt
        })


        console.log(result.text)



    } catch (error) {
        console.log(error)
    }
}

main()