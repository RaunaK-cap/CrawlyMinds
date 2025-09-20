import { defineSchema , defineTable} from "convex/server"
import { v} from "convex/values"

export default  defineSchema({

    UserSchema:defineTable({                // User data data for to stor user specific data 
        UserID:v.string(),
        Email:v.string(),
        Name:v.string(),
        CreatedAt:v.number()
    }).index("by_UserId" , ["UserID"]),       


    Embedding_vectors : defineTable({
        
        UserID:v.string(),
        Name:v.string(),
        Text_Chunk: v.string(),             //text chunks 
        Vectors:v.array(v.float64()),       // vector embeddings of the text chunks 
        source:v.string(),                  // urls ,
        CreatedAt:v.number()                //created time 
    })
    .vectorIndex("by_embedding" , {          // For Vector indexing/quering 
        vectorField:"Vectors",              // Give  your stored vector access
        dimensions:1536,                    // Check Open AI embeddeing model dimensions 
        filterFields:["UserID"]             //For user specific Filteration
                                             
    })
    .index("by_UserID" , [ "UserID"])      // For Normal indexing/quering 
})