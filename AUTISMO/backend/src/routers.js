const express = require('express');
const client = require('../config/db');
const clientController = require('../controller/controller');
const router = express.Router();

router.get('/', clientController.getRoot); //Rota raiz
router.get('/api/read', clientController.listAllUsers); // Rota para listar todos os Usuários
// router.get('/api/read/:id', clientController.listByID); // Rota para listar um usuário por ID
// router.post('/api/create', clientController.createNewUsers);//ROTA para Criar novo usuário
// router.delete('/api/deletar/:id', clientController.deleteUser); //ROta para deletar usuário
// router.put('/api/atualizar/luiz/gustavo/:id', clientController.updateUser); //Rota para atualizar dados do usuário
//router.post('/api/registersenai' , clientController.registerSenai); //Cadastrar um novo usuário
//router.post('/api/validate' , clientController.login); //validar o login

//!PROJETO
// router.post('/api/cadastroprojeto', clientController.cadastroProjeto) //!Cadastrar novo usuario Projeto
// router.post('/api/validateprojeto' , clientController.loginProjeto) //!validar login Projeto
// router.post('/api/resetsenhaprojeto', clientController.resetPassworldProjeto) //!Resetar a senha projeto
// router.post('/api/resetprojeto', clientController.getEmailResetProjeto) //!Reset Projeto
// router.post('/api/cadastrocartao', clientController.cadastroCartao) //!Cadastrar Cartão

//Aluno
// router.post('/api/login/aluno', clientController.login); // Login dos Alunos
// router.post('/api/registerimage', clientController.registerImageStudents); // Cadastrar os Alunos
// router.get('/api/students', clientController.getAllStudents)
// router.post('/api/reset', clientController.getEmailReset)
// router.post('/api/resetpassword', clientController.resetPassworld)

// //Professor
// router.post('/api/login/professor', clientController.loginProfessor); // Login dos Professores
// router.post('/api/aluno/cadastro', clientController.registerProfessor); // Cadastrar os Professores

//! PROJETO HTML AUTISMO
 router.post('/api/registerautism', clientController.registerAutism) //!Cadastrar novo FORMULARIO Projeto
//  router.post('/api/registerfomulario', clientController.registerFormulario) //!Cadastrar novo FORMULARIO ADMINISTRADOR Projeto
router.get('/api/listarformulario', clientController.getAllFormulario) //LISTAR FORMULARIO

module.exports = router;


