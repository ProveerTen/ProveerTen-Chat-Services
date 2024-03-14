import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.IA_API_KEY!);


export const classify_text = async (msg: string) => {

    try {
        console.log(process.env.IA_API_KEY!);

    const prompt = "Me podrías decir, si el siguiente texto contiene groserías de cualquier tipo o palabras denigrantes, responde solo con 'SI' o 'NO'";
    let text = `${prompt} ${msg}`

    const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });
    const result = await model.generateContent(text);
    const response = result.response;
    //console.log(response.text());
    /*
    console.log(response.text());
    return response.text();
    */
    if (response.promptFeedback?.blockReason) {
        return 'SI'
    } else {
        return 'NO'
    }
    } catch (error) {
        console.log("La IA NO FUNCIONA");
        console.log(error);
    }
    
}