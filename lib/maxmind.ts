import { Reader } from "@maxmind/geoip2-node";
import path from "path";

let reader: any;

export async function getMaxMindReader() {

  if (!reader) {
    const databasePath = path.join(
      process.cwd(),
      "data/GeoLite2-City.mmdb"
    );

    reader = await Reader.open(databasePath);
  }

  return reader;
}