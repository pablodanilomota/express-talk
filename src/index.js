const express = require('express')
const cors = require('cors')
const server = express()

/**
 * Server port.
 */
const PORT = 3000

/**
 * Use cors.
 */
server.use(cors())

/**
 * Use JSON.
 */
server.use(express.json())

/**
 * Database, just to explain.
 */
const DB = [
  { id: 1612370478850, name: 'Pablo', age: 17 },
  { id: 1612370478851, name: 'Roberto', age: 15 }
]

/**
 * Find all route.
 */
server.get('/users', (req, res) => res.json(DB))

/**
 * Find one route.
 */
server.get('/users/:id', (req, res) => {
  /**
   * Capturando id do usuário a ser alterado.
   */
  const { id } = req.params

  /**
   * Procurando usuário pelo id.
   */
  const foundUser = DB.find(user => user.id === +id)

  if (!foundUser) {
    return res.status(404).json({ message: 'Usuário não encontrado' })
  }

  return res.json(foundUser)
})

/**
 * Create route.
 */
server.post('/users', (req, res) => {
  /**
   * Capturando usuário do body.
   */
  const user = req.body

  /**
   * Gerando um id.
   */
  const id = Date.now()

  /**
   * Dados do usuário com um id gerado.
   */
  const newUser = { ...user, id }

  /**
   * Salvar usuário no banco de dados.
   */
  DB.push(newUser)

  return res.json(newUser)
})

/**
 * Update route.
 */
server.put('/users/:id', (req, res) => {
  /**
   * Capturando id do usuário a ser alterado.
   */
  const { id } = req.params

  /**
   * Capturando usuário do body.
   */
  const user = req.body

  /**
   * Procurando usuário pelo id.
   */
  const foundIndex = DB.findIndex(user => user.id === +id)  

  if (foundIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' })
  }

  const foundUser = DB[foundIndex]

  /**
   * Dados do usuário com os campos alterados.
   */
  const updatedUser = { ...foundUser, ...user }

  /**
   * Salvar usuário no banco de dados.
   */
  DB[foundIndex] = updatedUser

  return res.json(updatedUser)
})

/**
 * Remove route.
 */
server.delete('/users/:id', (req, res) => {
  /**
   * Capturando id do usuário a ser alterado.
   */
  const { id } = req.params

  /**
   * Procurando usuário pelo id.
   */
  const foundIndex = DB.findIndex(user => user.id === +id)  

  if (foundIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' })
  }
  
  /**
   * Remover usuário
   */
  DB.splice(foundIndex, 1)

  return res.sendStatus(204)
})

/**
 * Server running.
 */
server.listen(3000, () => {
  console.log(`Server is Running on port: ${PORT}`)
})
