import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class TimeworkedControllers {
  async index(req: Request, res: Response) {
    await prisma.timeWorked
      .findMany({
        include: {
          project: true
        },
        orderBy: {
          started: 'asc'
        }
      })
      .then((timeWorked) => {
        res.status(200).send(timeWorked)
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  }

  async get(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    await prisma.timeWorked
      .findMany({
        where: {
          projectId: id
        },
        orderBy: {
          started: 'asc'
        }
      })
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(400).send(err))
    return
  }
  async create(req: Request, res: Response) {
    const { project, start } = req.body
    await prisma.timeWorked
      .create({
        data: {
          project: {
            connect: {
              id: parseInt(project)
            }
          },
          started: start ? new Date() : null
        }
      })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err))
    return
  }
  async endWork(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const { end } = req.body
    await prisma.timeWorked
      .update({
        where: {
          id
        },
        data: {
          ended: end ? end : new Date()
        }
      })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err))
  }
  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    await prisma.timeWorked
      .delete({
        where: {
          id
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((_) => res.sendStatus(202))
      .catch((err) => res.status(400).send(err))
    return
  }
}
