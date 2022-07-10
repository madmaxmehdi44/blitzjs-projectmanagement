import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetLinkMenusInput
  extends Pick<Prisma.LinkMenuFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetLinkMenusInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: linkMenus,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.linkMenu.count({ where }),
      query: (paginateArgs) => db.linkMenu.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      linkMenus,
      nextPage,
      hasMore,
      count,
    }
  }
)
