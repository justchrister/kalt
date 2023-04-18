export default defineEventHandler((event) => {
  setHeader(event, "Content-Security-Policy", "frame-ancestors 'none'")
  setHeader(event, "X-Frame-Options", "1; mode=block")
});