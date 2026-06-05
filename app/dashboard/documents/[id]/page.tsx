import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import DeleteButton from "@/components/documents/DeleteButton";



interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function DocumentPage(
  { params }: Props
) {
  const { id } =
    await params;

  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const {
    data: document,
  } = await supabase
    .from("documents")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!document) {
    notFound();
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        {
          document.title ??
          document.file_name
        }
      </h1>
      
      <DeleteButton id={document.id} />

      <div>
        <strong>
          Category:
        </strong>{" "}
        {
          document.document_category
        }
      </div>

      <div>
        <strong>
          File Type:
        </strong>{" "}
        {
          document.file_type
        }
      </div>

      {document.extracted_text && (
        <div>
          <h2 className="font-bold text-xl mb-2">
            Content
          </h2>

          <div className="border rounded p-4 whitespace-pre-wrap">
            {
              document.extracted_text
            }
          </div>
        </div>
      )}

      {document.cloudinary_url && (
        <a
          href={
            document.cloudinary_url
          }
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Open Original File
        </a>
      )}
    </div>
  );
}