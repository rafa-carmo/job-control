import express from 'express'

// import controllers
import UsersControllers from './controllers/UsersControllers'
import ProjectsControllers from './controllers/ProjectsControllers'
import TimeworkedControllers from './controllers/TimeworkedControllers'

// controllers
const usersControllers = new UsersControllers()
const projectsControllers = new ProjectsControllers()
const timeworkedControllers = new TimeworkedControllers()
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
routes.delete('/project/:id', projectsControllers.delete)
// routes.put('/project/:id', projectsControllers.)

// Time Workeds routes
routes.get('/timeworked/', timeworkedControllers.index)
routes.get('/timeworked/:id', timeworkedControllers.get)
routes.post('/timeworked', timeworkedControllers.create)
routes.put('/timeworked/end/:id', timeworkedControllers.endWork)
routes.delete('/timeworked/:id', timeworkedControllers.delete)

export default routes
