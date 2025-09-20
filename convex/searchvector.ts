import { action, internalQuery  } from "./_generated/server"
import {internal} from "./_generated/api"
import {  v  } from "convex/values"
import { Doc } from "./_generated/dataModel"


export const fetchResults = internalQuery({

    args: { ids: v.array(v.id("Embedding_vectors")) },
    handler: async (ctx, args) => {
      const results = [];
      for (const id of args.ids) {
        const doc = await ctx.db.get(id);
        if (doc === null) {
          continue;
        }
        results.push(doc);
      }
      return results;
    },
  });


export const similar_vectors = action({
    args: {
        UserID:v.string(),
      user_query_embeddings : v.array(v.number())
    },
    handler: async (ctx, args) => {
      // 1. Generate an embedding from your favorite third party API:
    //   const embedding = args.user_query_embeddings
      // 2. Then search for similar foods!
      const results = await ctx.vectorSearch("Embedding_vectors", "by_embedding", {
        vector: args.user_query_embeddings,
        limit: 6,
        filter: q => q.eq("UserID", args.UserID),
        
      });
      const Docs: Array<Doc<"Embedding_vectors">> = await ctx.runQuery(
        internal.searchvector.fetchResults,
        { ids: results.map((result) => result._id) },
      );
      
      return Docs;
    },
  });