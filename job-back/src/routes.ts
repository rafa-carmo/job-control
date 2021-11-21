import express from 'express'

// import controllers
import UsersControllers from './controllers/UsersControllers'
import ProjectsControllers from './controllers/ProjectsControllers'

// controllers
const usersControllers = new UsersControllers()
const projectsControllers = new ProjectsControllers()

// Routes
const routes = express.Router()

// Users routes
routes.get('/users', usersControllers.index)
routes.get('/user/:id', usersControllers.unique)
routes.post('/user', usersControllers.create)
routes.put('/user/:id', usersControllers.update)
routes.delete('/user/:id', usersControllers.delete)

// Projects routes
routes.get('/projects', projectsControllers.index)
routes.post('/project', projectsControllers.create)
// routes.put('/project/:id', projectsControllers.)

export default routes
