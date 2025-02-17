import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { Event } from "@/models/Event";

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;

  await dbConnect();

  try {
    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    NextResponse.json(
      {
        success: true,
        data: event,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(`Error Fetching Event: ${error}`);

    return NextResponse.json(
      { error: `Error Fetching Event` },
      { status: 500 }
    );
  }
}
