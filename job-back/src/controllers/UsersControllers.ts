import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class UsersControllers {
  // find all users
  async index(req: Request, res: Response) {
    await prisma.user
      .findMany({
        include: {
          projects: {
            include: {
              timeWorked: true
            }
          }
        }
      })
      .then((users) => res.status(200).send(users))
      .catch((err) => res.status(400).send(err))

    return
  }
  // find unique user
  async unique(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    await prisma.user
      .findUnique({
        where: {
          id
        },
        include: {
          projects: {
            include: {
              timeWorked: true
            }
          }
        }
      })
      .then((user) => res.status(200).send(user))
      .catch((err) => res.status(400).send(err))
    return
  }
  // create user
  async create(req: Request, res: Response) {
    const { name, email } = req.body
    await prisma.user
      .create({
        data: {
          name,
          email
        }
      })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err))
    return
  }
  // update user
  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    await prisma.user
      .update({
        where: {
          id
        },
        data: {
          ...req.body
        }
      })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err))
    return
  }
  // delete user
  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const user = await prisma.user.findUnique({
      where: { id },
      include: { projects: true }
    })
    if (!user) {
      return
    }
    Promise.all(
      user!.projects.map(
        async (project) =>
          await prisma.timeWorked
            .deleteMany({ where: { projectId: project.id } })
            .then(
              async (_) =>
                await prisma.project.delete({ where: { id: project.id } })
            )
      )
    )

    await prisma.user
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
