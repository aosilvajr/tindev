const Dev = require('../models/Dev')

module.exports = {
  async store(req, res) {

    console.log(req.id, req.connectedUsers);

    const { devId } = req.params
    const { user } = req.headers

    const loggedDev = await Dev.findById(user)
    const targetDev = await Dev.findById(devId)

    if (!targetDev) {
      return res.status(400).send({ error: 'Dev not exists' })
    }

    // verifica se no array de likes já existe um idreferente ao id do usuário logado 
    if (targetDev.likes.includes(loggedDev._id)) {
      // Todos os usuários conectados
      const loggedSocket = req.connectedUsers[user];
      const targetSocket = req.connectedUsers[devId];

      // Dica => ammazenar os matchs em uma collection no mongoDB
      if (loggedSocket) { // Se estiver logado na aplicação
        // Avisando o usuário logado que deu match no targetDev 
        req.io.to(loggedSocket).emit('match', targetDev) // Recebe um object
      }

      if (targetSocket) {
        // Fazendo o caminho inverso
        req.io.to(targetSocket).emit('match', loggedDev) // Recebe um object
      }
    }


    loggedDev.likes.push(targetDev._id)

    await loggedDev.save()

    return res.send(loggedDev)
  }
}