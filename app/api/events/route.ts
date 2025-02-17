import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { Event } from "@/models/Event";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    //validate fields
    const { name, location, description, date, invitees, decisionMode } = body;

    if (!name || !date || !invitees || !Array.isArray(invitees)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Event
    const newEvent = new Event({
      name,
      location,
      description,
      date,
      invitees,
      decisionMode,
    });

    await newEvent.save();

    return NextResponse.json(
      { message: "Event Created Successfully", event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error Creating Event: ", error);

    return NextResponse.json(
      { error: "Internal Server Error" },

      { status: 500 }
    );
  }
}
