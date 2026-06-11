import { NextResponse }
  from "next/server";

import {
  searchDocuments,
} from "@/services/searchDocuments";

export async function GET() {

  const results =
    await searchDocuments(
      "f3a0600e-b738-47c6-9994-a61fe87547b4",
      "When did I receive my typhoid vaccine?"
    );

  return NextResponse.json(
    results
  );
}