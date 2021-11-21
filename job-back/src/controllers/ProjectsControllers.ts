import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class ProjectsControllers {
  async index(req: Request, res: Response) {
    await prisma.project
      .findMany()
      .then((projects) => res.status(200).send(projects))
      .catch((err) => res.status(400).send(err))
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
  }
}
