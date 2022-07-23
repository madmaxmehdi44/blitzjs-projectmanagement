import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateContact = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
  mobile: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateContact),
  //resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const contact = await db.contact.create({ data: input })

    return contact
  }
)
