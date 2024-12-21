import type { Config, Context } from "@netlify/functions";
import axios from "axios";

export const config: Config = {
  path: "/api/eb-post-ticket-class-to-event/:event_id",
};
export default async (req: Request, context: Context) => {
  const accessToken = Netlify.env.get("EVENTBRITE_PRIVATE_TOKEN");
  const apiBase = "https://www.eventbriteapi.com/v3";
  const { event_id } = context.params;
  const url = `${apiBase}/events/${event_id}/ticket_classes/`;
  const body = await req.text()

  try {
    const response = await axios.post(url, body, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": 'application/json'
      },
    });
    return new Response(JSON.stringify(response.data), {
      status: response.status,
    });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({
       error: {
        message: err.message,
        description: err.response.data.error_description} 
      }), {
      status: err.status || 500,
    });
  }
};
