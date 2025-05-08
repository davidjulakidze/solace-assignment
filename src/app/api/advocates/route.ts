import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { ilike, or, count, sql } from "drizzle-orm";
import { advocateLimit } from "@/db/seed/advocates";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  const page = request.nextUrl.searchParams.get("page");

  let filterForDb;

  if (query && query.trim() !== "") {
    const searchQuery = `%${query}%`;
    const conditions = [
      ilike(advocates.firstName, searchQuery),
      ilike(advocates.lastName, searchQuery),
      ilike(advocates.city, searchQuery),
      ilike(advocates.degree, searchQuery),
      sql`jsonb_typeof( (${advocates.specialties} #>> '{}')::jsonb ) = 'array' AND
            EXISTS (
                SELECT 1
                FROM jsonb_array_elements_text( (${advocates.specialties} #>> '{}')::jsonb ) elem
                WHERE elem.value ILIKE ${searchQuery}
            )`,
      sql`${advocates.yearsOfExperience}::text ILIKE ${searchQuery}`,
      sql`${advocates.phoneNumber}::text ILIKE ${searchQuery}`,
    ];
    filterForDb = or(...conditions);
  } else {
    filterForDb = undefined;
  }

  const dataPromise = db
    .select()
    .from(advocates)
    .where(filterForDb)
    .limit(advocateLimit)
    .offset(page ? (Number(page) - 1) * advocateLimit : 0);

  const totalCountPromise = db
    .select({ count: count() })
    .from(advocates)
    .where(filterForDb);

  try {
    const [data, totalCountResult] = await Promise.all([
      dataPromise,
      totalCountPromise,
    ]);

    return NextResponse.json({
      data,
      totalCount: totalCountResult[0]?.count ?? 0,
    });
  } catch (error) {
    console.error("Error fetching advocates:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching data." },
      { status: 500 }
    );
  }
}
