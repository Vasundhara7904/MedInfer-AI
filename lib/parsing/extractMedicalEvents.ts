export interface MedicalEvent {
  eventType: string;
  eventName: string;
  eventDate: string;
  confidence: number;
}

export function extractMedicalEvents(
  text: string
): MedicalEvent[] {

  const events: MedicalEvent[] = [];

  const vaccineRegex =
    /(typhoid|covid|hepatitis|influenza|tetanus).*?(\d{1,2}\s+[A-Za-z]+\s+\d{4})/gi;

  let match;

  while (
    (match =
      vaccineRegex.exec(text))
  ) {

    events.push({
      eventType:
        "vaccination",

      eventName:
        match[1],

      eventDate:
        match[2],

      confidence:
        0.85,
    });
  }

  return events;
}