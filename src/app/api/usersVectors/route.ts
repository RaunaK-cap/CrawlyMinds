import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import OpenAI from "openai";

import { fetchAction, fetchMutation, fetchQuery } from "convex/nextjs"
import { api } from "../../../../convex/_generated/api";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { RateLimiterMemory } from "rate-limiter-flexible"



const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
});

const ratelimiter = new RateLimiterMemory({
    points: 5,
    duration: 60
})


export async function POST(req: NextRequest) {

    try {
        const ip = req.headers.get("x-forwarded-for") || "unknown";

        await ratelimiter.consume(ip); // consume 1 point per request


    } catch {
        return NextResponse.json(
            { responses: "Too many requests" },
            { status: 429 }
        );
    }

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    if(!session){
        return NextResponse.json({
            responses:"unauthorized"
        }, {
            status:402
        })
    }


    const body = await req.json()
    const verifiedinput = z.object({
        UserId: z.string().min(1, "UserId must required").optional(),
        message: z.string().min(1, "question must required")
    })
    const { success, data } = verifiedinput.safeParse(body)
    if (!success) {
        return NextResponse.json({
            message: "Enter valid input"
        }, { status: 302 })
    }

    console.log(data.message)
    


    //1.Converting User Query into Vector embeddings

    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: data.message,
        encoding_format: "float",
    });

    try {

        //2. Vectors search to get similar data 

        const similarVectors = await fetchAction(api.searchvector.similar_vectors, {
            UserID: session.user.id ,         //currently hard code must have to change while calling it from client side 
            user_query_embeddings: embedding.data[0].embedding
        })

        console.log(similarVectors.length)
        if (similarVectors.length <= 0) {
            return NextResponse.json({
                message: "data dooesn't exist"
            })
        }
        // 3. LLM Calls .....

        const contextchunks = similarVectors
            .map((d) => `${d.source}\n${d.Text_Chunk}`)
            .join("\n\n")



        let Context = `your are a helpfull AI assistant for Crawlyminds. Users will ask question about his website link and you will recieve the all context data/summary/similiar data of that website links ,based on that you have to create a humans friendly answer to users , only give answer according to data you will recieved. most important part if you don't recieved any data then simply say data doesn't exist and here's your all website/links data starts: 
            ${contextchunks}`

        //4. Feeding all similar data to LLM 

        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                { role: "assistant", content: Context },
                {
                    role: "user",
                    content: data.message,
                },
            ],
        });

        // 5. Returning human friendly Answers according to users query

        return NextResponse.json({
            message: "Your Answer .. ",
            responses: response.choices[0].message.content
        })


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "error while vector searching",
            error

        })
    }

}