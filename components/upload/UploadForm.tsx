"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] =
    useState<File | null>(null);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleUpload() {
    if (!file) {
      setMessage(
        "Please select a file"
      );
      return;
    }

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await fetch(
          "/api/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        setMessage(
          result.error
        );
        return;
      }

      setMessage(
        "Upload successful"
      );

      setFile(null);
    } catch {
      setMessage(
        "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        type="file"
        accept="
          .pdf,
          .png,
          .jpg,
          .jpeg,
          .txt
        "
        onChange={(e) =>
          setFile(
            e.target.files?.[0] ??
              null
          )
        }
      />

      <button
        onClick={handleUpload}
        disabled={loading}
      >
        {loading
          ? "Uploading..."
          : "Upload"}
      </button>

      <p>{message}</p>
    </div>
  );
}