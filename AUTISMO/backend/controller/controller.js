
const clientController = require("../model/model.js");

const userController = {
    //Route root
    getRoot: async(req, res) => {
        res.status(200).json({msg:"The API is Running !!!"})
    },

    //Controller para listar todos os usuarios do banco
    listAllUsers: async(req, res) => {
        try {
            const client = await clientController.getAllUsers();
            res.status(200).json(client);
        }
        catch (error) {
            res.status(500).json({error: "Erro ao obter a lista de Usuários"})
        }
    },

    //Listar usuários por ID
    listByID: async(req, res) => {
        try {

            const sql = await clientController.getByID(req.params.id);

            if (sql.length > 0) {
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg: 'Não existe registro no banco com este ID'})
                }
            }
        catch (error) {
            return error
        }
    },

    createNewUsers: async(req, res) => {
       const {id, nome, sobrenome, idade} = req.body;

       try {
            const sql = await clientController.getByID(id);

            if (sql.length > 0) {
                res.status(200).json({msg: 'O ID já está cadastrado!'});
            }
            else{
                await clientController.registerUser(id, nome, sobrenome, idade);
                res.status(201).json({msg: 'Usuário cadastrado com sucesso'})
            }
       }
       catch (error) {
            return error
       }

    },

        deleteUser: async (req ,res)=>{
        try{
            const sql = await clientController.getByID(req.params.id);

            if(sql.length > 0){
                await clientController.deleteUser(req.params.id);
                res.status(204).json({msg:"Usuário deletado com sucesso!!!"})
            }
            else{
                res.status(401).json({msg:"O ID não existe na base de dados"})
            }
        }
        catch(error) {
            res.status(500).json({error:"Erro ao tentar deletar o usuário"})
        }
    },

    updateUser: async (req, res) => {
        const {nome,sobrenome,idade} = req.body;

        try{
            const sql = await clientController.getByID(req.params.id);

            if (sql.length > 0) {
                await clientController.updateUser(nome, sobrenome, idade, req.params.id);
                res.status(200).json({msg: "Usuário atualizado com sucesso !!!"})
            }
            else{
                res.status(401).json({msg:" Erro ao atualizar o Usuário"})
            }
        }
        catch(error) {
            res.status(500).json({error: "Erro ao tentar atualizar o Usuário" + error})
        }
    },

    //Cadastrar um novo usuário no banco 

    registerSenai: async(req, res) => {
        const {id, nome, sobrenome, email, senha} = req.body

        try{
            const sql = await  clientController.getByEmail(email);

            if(sql.length > 0){
                res.status(401).json({msg: 'O email já está cadastrado na base de dados, insira um email diferente'})
            }
            else{
                await clientController.registerSenai(id, nome, sobrenome, email, senha);
                res.status(201).json({msg: ' Usuário cadastrado com sucesso'});
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json({msg:'Ocorreu um erro durante o registro do usuário'});
        }
    },

    

    //aluno
    registerImageStudents: async(req, res ) => {
        try{
            const {id, nome, sobrenome, email, senha, imagemBase64} = req.body;
            
            const sql = await clientController.getByEmailStudents(email);

            if(sql.length > 0) {
                res.status(401).json({msg: 'O email já está cadastrado na base de dados, insira um email diferente'})
            }
            else{
                const result = await clientController.registerImage(id, nome, sobrenome, senha, imagemBase64);
                return res.status(201).json({msg: 'Usuário Cadastrado com sucesso'});
            }
        }catch(error){
            console.error('Erro ao registrar usuário com a imagem' , error)
            return res.status(500).json({msg:'Erro no servidor'})
        }
    },

    login: async(req,res) => {
        let{email, senha} = req.body;

        try{
            const sql = await clientController.validateLoginStudents(email, senha);

            if(sql.length > 0){
                res.status(200).json({msg:'Email e senha validos com sucesso!!!'})
            }
            else{
                res.status(401).json({msg:'Email ou senha incorretas'})
            }
        }
        catch(error){
            if(error){
                res.status(500).json(error);
            }
        }
    },

    //controller listar todos os alunos
    getAllStudents: async(req, res) => {
        try{
            const client = await clientController.getAllUsers();
            res.status(200).json(client);
        }
        catch(error){
            res.status(500).json({msg: 'Erro no servidor'})
        }
    },

    //Professor
    registerProfessor: async(req, res ) => {
        try{
            const {id, nome, sobrenome, email, senha} = req.body;
            
            const sql = await clientController.getByEmailTeacher(email);

            if(sql.length > 0) {
                res.status(401).json({msg: 'O email já está cadastrado na base de dados, insira um email diferente'})
            }
            else{
                const result = await clientController.registerTeacher(id, nome, sobrenome, senha);
                return res.status(201).json({msg: 'Usuário Cadastrado com sucesso'});
            }
        }catch(error){
            console.error('Erro ao registrar usuário com a imagem' , error)
            return res.status(500).json({msg:'Erro no servidor'})
        }
    },

    loginProfessor: async(req,res) => {
        let{email, senha} = req.body;

        try{
            const sql = await clientController.validateLoginTeacher(email, senha);

            if(sql.length > 0){
                res.status(200).json({msg:'Email e senha validos com sucesso!!!'})
            }
            else{
                res.status(401).json({msg:'Email ou senha incorretas'})
            }
        }
        catch(error){
            if(error){
                res.status(500).json(error);
            }
        }
    },

    //Controller para reset
    getEmailReset: async(req, res) => {
        let (email) = req.body

        email = email.toLowerCase();

        try{
            const sql = await clientController.getByEmailTeacher(email);

            if(sql.length > 0){
                res.status(200).json({msg:'Success'})
            }
            else{
                res.status(401).json({msg:'Email não cadastrado no BD'})
            }
        }
        catch(error){
            if(error){
                res.status(500).json(error);
            }
        }
    },

    resetPassworld: async(req, res) => {
        let (email, senha) = req.body

        email = email.toLowerCase();

        try{
            await clientController.updatePassworld(email, senha);
            res.status(200).json({msg: 'Senha atualizada com sucesso'});
        }
        catch(error){
            console.log("erro ao redefinir a senha");
            res.status(500).json({msg: 'Erro no servidor'})
        }
    },

    //!PROJETO

    //!Cadastro
    cadastroProjeto: async(req, res) => {
        const {id, nome, email, telefone, mensagem} = req.body

        try{
            let sql = await clientController.getByEmailProjeto(email);

            if(sql.length > 0){
                res.status(401).json({msg: 'O email já está cadastrado na base de dados, insira um email diferente'})
            }
            else{
                await clientController.cadastroProjeto(id, nome, email, senha);
                res.status(201).json({msg: ' Usuário cadastrado com sucesso'});
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json({msg:'Ocorreu um erro durante o registro do usuário'});
        }
    },

    //!Login
    loginProjeto: async(req,res) => {
        let{email, senha} = req.body;

        try{
            const sql = await clientController.validateLoginProjeto(email, senha);

            console.log(sql);

            if(sql.length > 0){
                res.status(200).json({msg:'Email e senha validos com sucesso!!!'})
            }
            else{
                res.status(401).json({msg:'Email ou senha incorretas'})
            }
        }
        catch(error){
            if(error){
                res.status(500).json(error);
            }
        }
    },

    //!Ver se o email registrado está no Bando de Dados
     getEmailResetProjeto: async(req, res) => {
        let email = req.body.email;

        email = email.toLowerCase();

        try{
            const sql = await clientController.getByEmailPaciente(email);

            if(sql.length > 0){
                res.status(200).json({msg:'Success'})
            }
            else{
                res.status(401).json({msg:'Email não cadastrado no BD'})
            }
        }
        catch(error){
            if(error){
                res.status(500).json(error);
            }
        }
    },

//!Trocar Senha
    resetPassworldProjeto: async(req, res) => {
        let {email, senha} = req.body;

        email = email.toLowerCase();

        try{
            await clientController.updatePassworldProjeto(email, senha);
            res.status(200).json({msg: 'Senha atualizada com sucesso'});
        }
        catch(error){
            console.log("erro ao redefinir a senha");
            res.status(500).json({msg: 'Erro no servidor'})
        }
    },

//!Adicionar Cartão
    cadastroCartao: async(req, res) => {
        const {id, numeroCartao, cvc, dataValidade, nome} = req.body

        try{
            let sql = await clientController.getByNumeroCartaoProjeto(numeroCartao);

            if(sql.length > 0){
                res.status(401).json({msg: 'Cartão já foi cadastrado, por favor cadastre um cartão diferente'})
            }
            else{
                await clientController.cadastroCartao(id ,numeroCartao, cvc, dataValidade, nome);
                res.status(201).json({msg: 'Cartão cadastrado com sucesso'});
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json({msg:'Ocorreu um erro ao tentar cadastrar o Cartão'});
        }
    },

  //*--------------------------------------------------------- (TRABALHO SESI)

    //*Cadastro
    cadastroProjeto: async(req, res) => {
        const {id, nome, email, senha} = req.body

        try{
            let sql = await clientController.getByEmailProjeto(email);

            if(sql.length > 0){
                res.status(401).json({msg: 'O email já está cadastrado na base de dados, insira um email diferente'})
            }
            else{
                await clientController.cadastroProjeto(id, nome, email, senha);
                res.status(201).json({msg: ' Usuário cadastrado com sucesso'});
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json({msg:'Ocorreu um erro durante o registro do usuário'});
        }
    },

    //*Login
    loginProjeto: async(req,res) => {
        let{email, senha} = req.body;

        try{
            const sql = await clientController.validateLoginProjeto(email, senha);

            console.log(sql);

            if(sql.length > 0){
                res.status(200).json({msg:'Email e senha validos com sucesso!!!'})
            }
            else{
                res.status(401).json({msg:'Email ou senha incorretas'})
            }
        }
        catch(error){
            if(error){
                res.status(500).json(error);
            }
        }
    },

 // PROJETO HTML AUTISMO

registerAutism: async(req, res) => {
    const {id,nome, email, mensagem} = req.body

    console.log(req.body);

    try{
        const sql = await  clientController.getByEmailAutism(email);

        if(sql.length > 0){
            res.status(401).json({msg: 'O formulario já está no banco de dados, insira um email diferente'})
        }
        else{
            await clientController.registerAutism(id, nome, email, mensagem);
            res.status(201).json({msg: ' Formulario enviado com sucesso'});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:'Ocorreu um erro durante o envio do formulario'});
    }
},

// //Regsitrar formulario adcministrador
// registerFormulario: async(req, res) => {
//     const {id, nome, email, telefone, sexo, data_nascimento, cidade, estado, endereco} = req.body

//     console.log(req.body);

//     try{
//         const sql = await  clientController.getByEmailAutism(email);

//         if(sql.length > 0){
//             res.status(401).json({msg: 'O formulario já está no banco de dados, insira um email diferente'})
//         }
//         else{
//             await clientController.registerFormulario(id, nome, email, telefone, sexo, data_nascimento, cidade, estado, endereco);
//             res.status(201).json({msg: ' Formulario enviado com sucesso'});
//         }
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({msg:'Ocorreu um erro durante o envio do formulario'});
//     }
// },

//CONTROLLER PARA LISTAR FORMULARIO
getAllFormulario: async (req, res) => {
    try {
        const client = await clientController.getAllFormularios();
        res.status(200).json(client)
    }
    catch (error) {
        res.status(500).json({ msg: "Erro no servidor" })
    }
},


};

listByID: async(req, res) => {
    try {

        const sql = await clientController.getByID(req.params.id);

        if (sql.length > 0) {
            res.status(200).json(sql)
        }
        else{
            res.status(401).json({msg: 'Não existe registro no banco com este ID'})
            }
        }
    catch (error) {
        return error
    }
},

module.exports = userController;