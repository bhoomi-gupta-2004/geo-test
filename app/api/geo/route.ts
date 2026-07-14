import { ipAddress, geolocation } from "@vercel/functions";

export async function GET(request: Request) {
  const ip = ipAddress(request) || "127.0.0.1";
  const geo = geolocation(request);

  return Response.json({
    ip,
    geo,
  });
}