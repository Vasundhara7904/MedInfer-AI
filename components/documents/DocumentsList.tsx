"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

interface Document {
  id: string;
  title: string | null;
  file_name: string;
  document_category: string | null;
  upload_timestamp: string;
  processing_status: string | null;
}

export default function DocumentsList() {
  const [
    documents,
    setDocuments,
  ] = useState<Document[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    async function loadDocs() {
      try {
        const response =
          await fetch(
            "/api/documents"
          );

        const data =
          await response.json();

        setDocuments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDocs();
  }, []);

  if (loading) {
    return (
      <p>
        Loading documents...
      </p>
    );
  }

  if (
    documents.length === 0
  ) {
    return (
      <p>
        No documents found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map(
        (doc) => (
          <div
            key={doc.id}
            className="
              border
              rounded-lg
              p-4
            "
          >
            <Link
              href={`/dashboard/documents/${doc.id}`}
              className="font-bold underline"
            >
              {doc.title ??
                doc.file_name}
            </Link>

            <p>
              Category:{" "}
              {
                doc.document_category
              }
            </p>

            <p>
              Status:{" "}
              {doc.processing_status ===
              "completed"
                ? "🟢 Ready"
                : doc.processing_status ===
                  "processing"
                ? "🟡 Processing"
                : doc.processing_status ===
                  "failed"
                ? "🔴 Failed"
                : "⚪ Pending"}
            </p>

            <p>
              Uploaded:{" "}
              {new Date(
                doc.upload_timestamp
              ).toLocaleDateString(
                "en-GB"
              )}
            </p>
          </div>
        )
      )}
    </div>
  );
}