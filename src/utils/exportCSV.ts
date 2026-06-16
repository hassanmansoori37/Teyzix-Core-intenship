import type { Customer } from "../types";

export function exportCustomersCSV(data: Customer[]): void {
  const headers = ["Customer Name", "Revenue", "Orders", "Status", "Region"];
  const rows = data.map((c) => [
    c.name,
    `$${c.revenue.toLocaleString()}`,
    c.orders.toString(),
    c.status,
    c.region,
  ]);

  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `teyzix-customers-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
