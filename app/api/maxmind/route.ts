import { NextResponse } from "next/server";
import { getMaxMindReader } from "@/lib/maxmind";

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);

  // For testing: use IP from URL if provided
  // Example: /api/maxmind?ip=8.8.8.8
  const testIp = searchParams.get("ip");


  // Otherwise detect real visitor IP
  const forwardedFor = request.headers.get("x-forwarded-for");

  const ip =
    testIp ||
    forwardedFor?.split(",")[0]?.trim() ||
    "127.0.0.1";


  try {

    const reader = await getMaxMindReader();

    const result = reader.city(ip);


    return NextResponse.json({

      ip,

      location: {

        country:
          result.country?.names?.en || null,

        region:
          result.subdivisions?.[0]?.names?.en || null,

        city:
          result.city?.names?.en || null,

        postalCode:
          result.postal?.code || null,

        latitude:
          result.location?.latitude || null,

        longitude:
          result.location?.longitude || null
      }

    });


  } catch (error: any) {

    return NextResponse.json({

      error: "Unable to find location",
      message: error.message,
      ip

    });

  }
}