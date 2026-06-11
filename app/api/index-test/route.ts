import { NextResponse }
  from "next/server";

import {
  indexText,
} from "@/services/indexText";

export async function GET() {

  const result =
    await indexText(
      "test-user",
      "test-document",

      `
      Patient received
      Typhoid vaccine
      on 15 July 2024.

      Reports occasional
      stomach pain.
      `
    );

  return NextResponse.json(
    result
  );
}