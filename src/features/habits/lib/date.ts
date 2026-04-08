export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function yesterdayOf(date: string) {
  const d = new Date(`${date}T00:00:00`);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function toLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromLocalDateString(date: string) {
  return new Date(`${date}T00:00:00`);
}
