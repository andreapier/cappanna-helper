export function padLeft(s, c, n) {
  return n - s.length > 0 ? c.repeat(n - s.length) + s : s;
}
