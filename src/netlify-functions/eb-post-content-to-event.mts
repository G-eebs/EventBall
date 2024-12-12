import type { Config, Context } from "@netlify/functions";
import axios from "axios";

export const config: Config = {
  path: "/eb-post-content-to-event/:event_id/:version",
};
export default async (req: Request, context: Context) => {
  const accessToken = Netlify.env.get("EVENTBRITE_PRIVATE_TOKEN");
  const apiBase = "https://www.eventbriteapi.com/v3";
  const { event_id, version } = context.params;
  const url = `${apiBase}/events/${event_id}/structured_content/${version}/`;
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
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
    });
  }
};
