import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { ilike, or, count } from "drizzle-orm";
import { advocateLimit } from "@/db/seed/advocates";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  const page = request.nextUrl.searchParams.get("page");

  const filter = query
    ? or(
        ilike(advocates.firstName, `%${query}%`),
        ilike(advocates.lastName, `%${query}%`),
        ilike(advocates.city, `%${query}%`),
        ilike(advocates.degree, `%${query}%`)
      )
    : undefined;

  const dataPromise = db
    .select()
    .from(advocates)
    .where(filter)
    .limit(advocateLimit)
    .offset(page ? (Number(page) - 1) * advocateLimit : 0);

  const totalCountPromise = db
    .select({ count: count() })
    .from(advocates)
    .where(filter);

  const [data, totalCount] = await Promise.all([
    dataPromise,
    totalCountPromise,
  ]);

  return NextResponse.json({ data, totalCount: totalCount[0].count });
}
