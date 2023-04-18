export default defineEventHandler((event) => {
  res.set({
    "Content-Security-Policy": "frame-ancestors 'none'",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "X-Content-Type-Options": "nosniff"
  });
})