import { mutation } from "./_generated/server"
import { v } from "convex/values"

export const storeUsersData = mutation({
    args: {
        UserID: v.string(),
        Email: v.string(),
        Name: v.string(),
        
    },
    
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
                .query("UserSchema")
                .withIndex("by_UserId" , q => q.eq("UserID" , args.UserID))
                .unique()

        if(existingUser){
            await ctx.db.patch(existingUser._id , {
                Email:args.Email,
                Name:args.Name
            })
            return existingUser._id
        }

        return await ctx.db.insert("UserSchema", {
            UserID: args.UserID,
            Email: args.Email,
            Name: args.Name,  
        })
    }
})


export const storeEmbeddings = mutation({
    args: {
        UserId: v.string(),
        Name: v.string(),
        Text_chunks: v.string(),
        Vectors: v.array(v.float64()),
        source: v.string(),
    },
    handler: async (ctx, args) => {
        const normalized = args.source.trim().toLowerCase();

        const user = await ctx.db
          .query("UserSchema")
          .withIndex("by_UserId", q => q.eq("UserID", args.UserId))
          .unique();
        if (!user) return { success:false, message:"user doesn't exist" };

        const existing = await ctx.db
          .query("Embedding_vectors")
          .withIndex("by_user_name_Text_source", q =>
            q.eq("UserID", args.UserId)
             .eq("Name", args.Name)
             .eq("Text_Chunk", args.Text_chunks)
             .eq("source", normalized)
          )
          .first();

        if (existing) return { success:false, message:"data already exist" };

        await ctx.db.insert("Embedding_vectors", {
          UserID: args.UserId,
          Name: args.Name,
          Text_Chunk: args.Text_chunks,
          Vectors: args.Vectors,
          source: normalized,
        });

        return { success:true, message:"Data saved" };
    }
});
