import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { createClient } from "@/lib/supabase/server";



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
      title,
      content,
    } = await request.json();

    if (
      !title ||
      !content
    ) {
      return NextResponse.json(
        {
          error:
            "Missing fields",
        },
        { status: 400 }
      );
    }

    const documentId =
      uuidv4();

    const { error } =
      await supabase
        .from("documents")
        .insert({
          id: documentId,

          user_id:
            user.id,

          title,

          file_name:
            `${title}.txt`,

          file_type:
            "text/plain",

          document_category:
            "medical_note",

          extracted_text:
            content,

          processing_status:
            "pending",

          status:
            "uploaded",

          file_size:
            content.length,

          mime_type:
            "text/plain",
        });

    if (error) {
      return NextResponse.json(
        {
          error:
            error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to save note",
      },
      { status: 500 }
    );
  }
}