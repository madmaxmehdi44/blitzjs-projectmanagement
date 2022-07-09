import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetLinkMenu = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetLinkMenu), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const linkMenu = await db.linkMenu.findFirst({ where: { id } })

  if (!linkMenu) throw new NotFoundError()

  return linkMenu
})
