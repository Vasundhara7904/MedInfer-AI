import { NextResponse }
  from "next/server";

import {
  generateEmbedding,
} from "@/lib/embeddings/generateEmbedding";

export async function GET() {

  const embedding =
    await generateEmbedding(
      "Hello world"
    );

  return NextResponse.json({
    dimensions:
      embedding?.length,
  });
}