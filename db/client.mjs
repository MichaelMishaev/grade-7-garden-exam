// postgres.js is imported lazily so the server still starts when the driver or database is unavailable.
export async function connect(url = process.env.DATABASE_URL, options = {}) {
  if (!url) throw new Error('DATABASE_URL is not set');
  const { default: postgres } = await import('postgres');
  return postgres(url, { max: 5, connect_timeout: 5, idle_timeout: 20, onnotice: () => {}, ...options });
}
