import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteLinkMenu = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteLinkMenu), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const linkMenu = await db.linkMenu.deleteMany({ where: { id } })

  return linkMenu
})
