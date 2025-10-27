import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import z from "zod"
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import { fetchMutation , fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";      


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
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
    model:  model || "gpt-4.1-mini",
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

export async function GET(){

  return NextResponse.json({
    message:"api is working "
  })
}
 
export async function POST(req:NextRequest){
  const session = await auth.api.getSession({
    headers: await headers() 
})

if(!session){
  return NextResponse.json({
    message:"unauthorized"
  })
}
  const body = await req.json()
  const verifiedbody =z.object({
    links:z.string().min(5,"Links must required"),
    model:z.string().optional()
  }) 
  const { success , data} = verifiedbody.safeParse(body)
  if(!success){
    return NextResponse.json({message:"please Enter valid links"} , { status:300})
  }
  
  const normalizedlink = data.links.trim().toLowerCase();

  const sourcelinkduplication = await fetchQuery(api.queryexisteddata.getduplictsourcelink , {
    UserId: session.user.id,   
    source:normalizedlink
  })

  if(sourcelinkduplication.length > 0){
    return NextResponse.json({
      message:"data already exist with this link"
    })
  }

  
  try {
      console.log("getting data from website")

     const AI_Responses = await OpenAILLM({contents:normalizedlink})

     console.log("chunking text ....")
     const chunk_text = await textSplitter.splitText(AI_Responses!)
     console.log(chunk_text.length)


     
     console.log("Creating Vector Embeddings...") 
     const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk_text,
      encoding_format: "float",
    });
    

    try {
      console.log("storing vector and chunks .....")

      let storingvectors_result : any[]= []

      for(let i = 0 ; i < chunk_text.length; i++){
        const dupes = await fetchQuery(api.queryexisteddata.getDuplicateEmbeddings, {
          UserId: session.user.id,    
          Name: "Raunak",
          TextChunk: chunk_text[i],
          source: normalizedlink,
        });
        if (dupes.length > 0) {
          return NextResponse.json(
            { message: "Data already exist", },
            { status: 409 }
          );
        }
          

       const storingvectors =  await fetchMutation(api.storevector.storeEmbeddings ,{
          Text_chunks:chunk_text[i],
          Vectors:embedding.data[i].embedding,
          UserId: session.user.id,   
          Name:"Raunak",                                
          source:normalizedlink
        })

        storingvectors_result.push(storingvectors.message)
      }
      
      console.log("saved it ..")
      return NextResponse.json({
        message:storingvectors_result
      } , { status:200})

    } catch (error) {
      return NextResponse.json({
        message:"error while storing vector please try again",
        error
      })
    }

  } catch (error) {
    return NextResponse.json({
      message:"error while getting data from website "
    })
  }

}

