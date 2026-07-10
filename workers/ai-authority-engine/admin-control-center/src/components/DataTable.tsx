import type { ReactNode } from "react"
import { EmptyState } from "./QueryState"

export interface Column<T> {
  readonly header: string
  readonly render: (row: T) => ReactNode
}

export function DataTable<T>({
  rows,
  columns,
  empty
}: {
  readonly rows: T[]
  readonly columns: readonly Column<T>[]
  readonly empty: string
}) {
  if (rows.length === 0) return <EmptyState>{empty}</EmptyState>
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="border-b border-line bg-slate-50 px-3 py-2 font-semibold text-slate-700"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="odd:bg-white even:bg-slate-50">
              {columns.map((column) => (
                <td key={column.header} className="border-b border-line px-3 py-3 align-top text-slate-700">
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
