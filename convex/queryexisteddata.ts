import { query } from "./_generated/server";
import { v } from "convex/values";

export const getDuplicateEmbeddings = query({
  args: {
    UserId: v.string(),
    Name: v.optional(v.string()),
    TextChunk: v.optional(v.string()),
    source: v.string(),
  },
  handler: async (ctx, { UserId, Name, TextChunk, source }) => {
    const duplicates = await ctx.db.query("Embedding_vectors")
      .withIndex("by_UserID", (q) => q.eq("UserID", UserId))
      .filter((q) =>
        q.and(
          q.eq(q.field("Name"), Name),
          q.eq(q.field("Text_Chunk"), TextChunk),
          q.eq(q.field("source"), source),
        )
      )
      .collect();

    return duplicates;
  },
});

export const getduplictsourcelink = query({
    args:{
        UserId:v.string(),
        source:v.string()
    },
    handler:async (ctx , { UserId , source})=>{
        const sourceduplicates = await ctx.db.query("Embedding_vectors")
        .withIndex("by_sourcelink", (q)=> q.eq("source" , source))
        .collect()

        return sourceduplicates

    }
})

