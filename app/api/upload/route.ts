import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import cloudinary from "@/lib/cloudinary/cloudinary";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "text/plain",
];

const MAX_SIZE = 20 * 1024 * 1024;

export async function POST(
  request: NextRequest
) {
  try {
    const supabase =
      await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const formData =
      await request.formData();

    const file =
      formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          error: "No file uploaded",
        },
        { status: 400 }
      );
    }

    if (
      !ALLOWED_TYPES.includes(
        file.type
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type",
        },
        { status: 400 }
      );
    }

    if (
      file.size > MAX_SIZE
    ) {
      return NextResponse.json(
        {
          error:
            "File exceeds 20MB",
        },
        { status: 400 }
      );
    }

    const documentId =
      uuidv4();

    const { error: insertError } =
        await supabase
            .from("documents")
            .insert({
            id: documentId,

            user_id: user.id,

            file_name: file.name,

            file_type: file.type,

            document_category: "uploaded_file",

            processing_status: "pending",

            status: "uploading",

            file_size: file.size,

            mime_type: file.type,
            });

    if (insertError) {
      return NextResponse.json(
        {
          error:
            insertError.message,
        },
        { status: 500 }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const uploadResult =
      await new Promise<any>(
        (
          resolve,
          reject
        ) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type:
                  "auto",

                public_id:
                  `medinfer/${user.id}/${documentId}`,
              },

              (
                error,
                result
              ) => {
                if (error)
                  reject(
                    error
                  );
                else
                  resolve(
                    result
                  );
              }
            )
            .end(buffer);
        }
      );

    const { error: updateError } =
        await supabase
            .from("documents")
            .update({
            cloudinary_url:
                uploadResult.secure_url,

            cloudinary_public_id:
                uploadResult.public_id,

            status: "uploaded",
            })
            .eq("id", documentId);

    if (updateError) {
      return NextResponse.json(
        {
          error:
            updateError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      documentId,
      url:
        uploadResult.secure_url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Upload failed",
      },
      { status: 500 }
    );
  }
}