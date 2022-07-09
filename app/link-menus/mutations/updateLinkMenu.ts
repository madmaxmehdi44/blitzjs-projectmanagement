import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateLinkMenu = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateLinkMenu),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const linkMenu = await db.linkMenu.update({ where: { id }, data })

    return linkMenu
  }
)
