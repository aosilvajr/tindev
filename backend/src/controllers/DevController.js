const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
   async index(req, res) {
      const { user } = req.headers

      const loggedDev = await Dev.findById(user)

      const users = await Dev.find({
         // Significa que tem que passar nos tres filtros
         $and: [
            { _id: { $ne: user } }, // condição 1 => Retorna todos os usuário, exceto o id do usuário
            { _id: { $nin: loggedDev.likes } }, // condição 2 => Retornas todos os usuário da lista de likes, exceto o id do usuário
            { _id: { $nin: loggedDev.dislikes } }, // condição 3 => Retornas todos os usuário da lista de dislikes, exceto o id do usuário
         ]
      })

      return res.send(users)
   },

   async store(req, res) {
      const { username } = req.body

      const userExists = await Dev.findOne({ user: username })

      if (userExists) {
         return res.send(userExists)
      }

      const response = await axios.get(`https://api.github.com/users/${username}`)

      const { name, bio, avatar_url: avatar } = response.data

      const dev = await Dev.create({
         name,
         user: username,
         avatar,
         bio
      })

      return res.send(dev)
   }
}

// eslint-disable-next-line max-len
// Style Guides MVC: O controller só pode ter no máximo os cinco metodos fundamentais (INDEX, SHOW, STORE, UPDATE, DELETE)
