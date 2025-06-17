import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      raw: true
    });

    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get token" }, { status: 500 });
  }
}