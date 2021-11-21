import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class UsersControllers {
  // find all users
  async index(req: Request, res: Response) {
    const users = await prisma.user.findMany()
    return res.send(users)
  }
  // find unique user
  async unique(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    await prisma.user
      .findUnique({
        where: {
          id
        }
      })
      .then((user) => res.status(200).send(user))
      .catch((err) => res.status(400).send(err))
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
  }
  // delete user
  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    await prisma.user
      .delete({
        where: {
          id
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((_) => res.status(202).send())
      .catch((err) => res.status(400).send(err))
  }
}
