import { mutation } from "./_generated/server"
import { v } from "convex/values"

export const storeUsersData = mutation({
    args: {
        UserID: v.string(),
        Email: v.string(),
        Name: v.string(),
        CreatedAt: v.number()
    },

    handler: async (ctx, args) => {
        await ctx.db.insert("UserSchema", {
            UserID: args.UserID,
            Email: args.UserID,
            Name: args.Name,
            CreatedAt: Date.now()

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

        const userdata = await ctx.db
            .query("UserSchema")
            .withIndex("by_UserId", q => q.eq("UserID", args.UserId))
            .unique()

        if (!userdata) {
            throw new Error("user doesn't exist")
        }

        await ctx.db.insert("Embedding_vectors", {
            UserID: args.UserId,
            Name: args.Name,
            Text_Chunk: args.Text_chunks,
            Vectors: args.Vectors,
            source: args.source,
            CreatedAt: Date.now()
        })
    }
})
