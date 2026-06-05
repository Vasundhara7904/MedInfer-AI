import { v4 as uuidv4 }
  from "uuid";

import { createClient }
  from "@/lib/supabase/server";

import {
  MedicalEvent,
} from "@/lib/parsing/extractMedicalEvents";

export async function
storeMedicalEvents(
  userId: string,
  documentId: string,
  events: MedicalEvent[]
) {

  const supabase =
    await createClient();

  for (
    const event of events
  ) {

    await supabase
      .from(
        "medical_events"
      )
      .insert({
        id:
          uuidv4(),

        user_id:
          userId,

        document_id:
          documentId,

        event_type:
          event.eventType,

        event_name:
          event.eventName,

        event_date:
          event.eventDate,

        confidence:
          event.confidence,
      });
  }
}