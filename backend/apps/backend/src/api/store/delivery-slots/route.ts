import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

type DeliverySlot = {
  id: string
  label: string
  timeRange: string
  available: boolean
}

function getSlots(dateStr?: string): DeliverySlot[] {
  const date = dateStr ? new Date(dateStr) : new Date()
  const now = new Date()
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()

  const slots: DeliverySlot[] = [
    {
      id: "morning",
      label: "Rano",
      timeRange: "9:00–13:00",
      available: !isToday || now.getHours() < 7,
    },
    {
      id: "afternoon",
      label: "Po południu",
      timeRange: "13:00–17:00",
      available: !isToday || now.getHours() < 11,
    },
    {
      id: "evening",
      label: "Wieczór",
      timeRange: "17:00–21:00",
      available: !isToday || now.getHours() < 15,
    },
  ]

  return slots
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const date = req.query.date as string | undefined
  const slots = getSlots(date)
  res.json({ slots })
}
