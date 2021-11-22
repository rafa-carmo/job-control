import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class ProjectsControllers {
  async index(req: Request, res: Response) {
    await prisma.project
      .findMany({
        include: {
          author: true,
          timeWorked: true
        },
        orderBy: {
          timeWorked: {
            _count: 'asc'
          }
        }
      })
      .then((projects) => res.status(200).send(projects))
      .catch((err) => res.status(400).send(err))
    return
  }

  async create(req: Request, res: Response) {
    const { title, authorId } = req.body

    await prisma.project
      .create({
        data: {
          title,
          author: {
            connect: {
              id: authorId
            }
          }
        }
      })
      .then((project) => res.status(200).send(project))
      .catch((err) => res.status(400).send(err))
    return
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    await prisma.timeWorked
      .deleteMany({
        where: {
          projectId: id
        }
      })
      .then(
        async (_) =>
          await prisma.project
            .delete({
              where: { id }
            })
            .then((_) => res.sendStatus(202))
            .catch((err) => res.status(400).send(err))
      )
  }
}
