import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import z from "zod"
import { CharacterTextSplitter } from "@langchain/textsplitters";


const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const textSplitter = new CharacterTextSplitter({
  chunkSize: 200,
  chunkOverlap: 0,
});

type LLMschema ={
  model?:string
  contents:string
}


async function OpenAILLM({model , contents}: LLMschema ){
  const response = await openai.chat.completions.create({
    model:  model || "gemini-2.0-flash",
    messages: [
        { role: "system", content: "You are a helpful assistant.Users will give you website links you have to go through that links and grab the Context,content, text, some important things only and give it back to user with explaining all about it only in 500-600 words and there could be 2-3 links so so do not mix up different links data to each other instead give it separate data for separate links something like link1 : link1-data then link2:link-data  " },
        {
            role: "user",
            content: contents,
        },
    ],
});

  console.log("Crawling Website......")
return response.choices[0].message.content

}

export function GET(){
  return NextResponse.json({
    message:"api is working "
  })
}
 
export async function POST(req:NextRequest){
  const body = await req.json()
  const verifiedbody =z.object({
    links:z.string().min(5,"Links must required"),
    model:z.string().optional()
  })
   
  const { success , data} = verifiedbody.safeParse(body)
  if(!success){
    return NextResponse.json({message:"please Enter valid links"} , { status:300})
  }

  try {
     const AI_Responses = await OpenAILLM({contents:data.links})
     const chunk_text = await textSplitter.splitText(AI_Responses!)
     console.log("chunking text ....")
     return NextResponse.json({
        chunk_text
     })
  } catch (error) {
    return NextResponse.json({
      message:"error "
    })
  }

}

