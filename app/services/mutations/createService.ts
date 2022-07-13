import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateService = z.object({
  name: z.string(),
  slug: z.string(),
  short_description: z.string(),
  long_description: z.string(),
  image_url: z.string(),
  video_url: z.string(),
})

export default resolver.pipe(resolver.zod(CreateService), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const service = await db.service.create({ data: input })

  return service
})
