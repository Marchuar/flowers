import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect, useState } from "react"

type QuoteRequest = {
  id: string
  customer_email: string
  company_name: string
  phone: string | null
  message: string
  estimated_monthly_budget: string | null
  status: string
  created_at: string
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  reviewed: "#3b82f6",
  accepted: "#10b981",
  rejected: "#ef4444",
}

function B2BQuotesWidget() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Admin widgets run same-origin — session cookie is sent automatically
    fetch("/admin/b2b/quotes", { credentials: "include" })
      .then((r) => r.json())
      .then((data: { quote_requests?: QuoteRequest[] }) => setQuotes(data.quote_requests ?? []))
      .catch(() => setQuotes([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{ padding: "16px" }}>Loading B2B quotes...</div>
  if (!quotes.length)
    return <div style={{ padding: "16px", color: "#6b7280" }}>No B2B quote requests yet.</div>

  return (
    <div style={{ padding: "16px" }}>
      <h2 style={{ fontWeight: 600, marginBottom: "12px" }}>B2B Quote Requests</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #e5e7eb", textAlign: "left" }}>
            <th style={{ padding: "8px" }}>Company</th>
            <th style={{ padding: "8px" }}>Email</th>
            <th style={{ padding: "8px" }}>Budget/mo</th>
            <th style={{ padding: "8px" }}>Status</th>
            <th style={{ padding: "8px" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q) => (
            <tr key={q.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: "8px", fontWeight: 500 }}>{q.company_name}</td>
              <td style={{ padding: "8px" }}>{q.customer_email}</td>
              <td style={{ padding: "8px" }}>{q.estimated_monthly_budget ?? "—"}</td>
              <td style={{ padding: "8px" }}>
                <span
                  style={{
                    background: STATUS_COLORS[q.status] ?? "#6b7280",
                    color: "#fff",
                    borderRadius: "4px",
                    padding: "2px 8px",
                    fontSize: "12px",
                  }}
                >
                  {q.status}
                </span>
              </td>
              <td style={{ padding: "8px", color: "#6b7280" }}>
                {new Date(q.created_at).toLocaleDateString("pl-PL")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "order.list.before",
})

export default B2BQuotesWidget
