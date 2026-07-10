import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Panel } from "./Panel"

export function ChartPanel({
  title,
  description,
  data
}: {
  readonly title: string
  readonly description?: string
  readonly data: Array<{ readonly name: string; readonly score: number }>
}) {
  return (
    <Panel title={title} description={description}>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 0, right: 12, top: 12, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#2f6f73" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#2f6f73" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#d8e0e6" strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis domain={[0, 1]} tickFormatter={(value) => `${String(Math.round(Number(value) * 100))}%`} />
            <Tooltip formatter={(value) => `${String(Math.round(Number(value) * 100))}%`} />
            <Area type="monotone" dataKey="score" stroke="#2f6f73" strokeWidth={2} fill="url(#scoreFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}
