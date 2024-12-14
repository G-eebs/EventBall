import type { Config, Context } from "@netlify/functions";
import axios from "axios";

export const config: Config = {
  path: "/eb-get-events-by-organizer/:organizer_id",
};

export default async (req: Request, context: Context) => {
  const accessToken = Netlify.env.get("EVENTBRITE_PRIVATE_TOKEN");
  const apiBase = "https://www.eventbriteapi.com/v3";
  const { organizer_id } = context.params;
  const queries = context.url.search;
  const url = `${apiBase}/organizers/${organizer_id}/events${queries}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
