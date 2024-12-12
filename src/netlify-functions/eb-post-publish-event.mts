import type { Config, Context } from "@netlify/functions";
import axios from "axios";

export const config: Config = {
  path: "/eb-post-publish-event/:event_id",
};
export default async (req: Request, context: Context) => {
  const accessToken = Netlify.env.get("EVENTBRITE_PRIVATE_TOKEN");
  const apiBase = "https://www.eventbriteapi.com/v3";
  const { event_id } = context.params;
  const url = `${apiBase}/events/${event_id}/publish/`;

  try {
    const response = await axios.post(url, null, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    return new Response(JSON.stringify(response.data), {
      status: response.status,
    });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
    });
  }
};
