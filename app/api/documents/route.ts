import { NextResponse } from "next/server";

import { createClient }
  from "@/lib/supabase/server";

export async function GET() {
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
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const {
      data,
      error,
    } = await supabase
      .from("documents")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .order(
        "upload_timestamp",
        {
          ascending: false,
        }
      );

    if (error) {
      return NextResponse.json(
        {
          error:
            error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      data
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch documents",
      },
      { status: 500 }
    );
  }
}