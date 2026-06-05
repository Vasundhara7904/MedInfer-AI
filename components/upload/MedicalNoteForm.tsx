"use client";

import { useState }
  from "react";

export default function
MedicalNoteForm() {

  const [title,
    setTitle] =
    useState("");

  const [content,
    setContent] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  async function
  handleSave() {

    const response =
      await fetch(
        "/api/notes",
        {
          method:
            "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              title,
              content,
            }),
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
      "Medical note saved"
    );

    setTitle("");
    setContent("");
  }

  return (
    <div className=
      "flex flex-col gap-4">

      <h2 className=
        "font-bold">

        Add Medical Note

      </h2>

      <input
        placeholder=
          "Title"

        value={title}

        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
      />

      <textarea
        placeholder=
          "Enter medical information..."

        rows={8}

        value={content}

        onChange={(e) =>
          setContent(
            e.target.value
          )
        }
      />

      <button
        onClick=
          {handleSave}>
        Save Note
      </button>

      <p>{message}</p>

    </div>
  );
}