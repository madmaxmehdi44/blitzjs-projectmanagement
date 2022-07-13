import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteService = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteService), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const service = await db.service.deleteMany({ where: { id } })

  return service
})
