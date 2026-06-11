import { NextResponse }
  from "next/server";

import { createClient }
  from "@/lib/supabase/server";

import {
  searchDocuments,
} from "@/services/searchDocuments";

export async function POST(
  request: Request
) {
  try {

    const supabase =
      await createClient();

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        { status: 401 }
      );
    }

    const {
      query,
    } =
      await request.json();

    const results =
      await searchDocuments(
        user.id,
        query
      );

    return NextResponse.json({
      results,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Search failed",
      },
      { status: 500 }
    );
  }
}