export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export function pluralize(count: number, word: string) {
  return `${count} ${word}${count !== 1 ? "s" : ""}`;
}
