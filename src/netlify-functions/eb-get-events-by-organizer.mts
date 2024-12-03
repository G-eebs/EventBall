import type { Config, Context } from "@netlify/functions";

export const config: Config = {
    path: "/eb-get-events-by-organizer/:organizer_id"
};

export default async (req: Request, context: Context) => {
  const accessToken = Netlify.env.get("EVENTBRITE_PRIVATE_TOKEN")
  const apiBase = 'https://www.eventbriteapi.com/v3/organizers'

  const { organizer_id } = context.params
  const queries = context.url.search

  let response
  try {
    response = await fetch(`${apiBase}/${organizer_id}/events${queries}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({error: err.message}), {status: err.statusCode || 500})    
  }
  const events = await response.json() 

  return new Response(JSON.stringify(events.events), {status: 200})
}
