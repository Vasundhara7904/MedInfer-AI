import { NextResponse }
  from "next/server";

import {
  createCollection,
} from "@/lib/qdrant/createCollection";

export async function GET() {

  await createCollection();

  return NextResponse.json({
    success: true,
  });
}