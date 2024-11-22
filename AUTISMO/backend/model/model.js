const connection = require("../config/db")

const userModel = {
    getAllUsers: async () => {
        const [result] = await connection.query("SELECT * FROM cadastro_senai")
            .catch(erro => console.log(erro));
        return result
    },

    getByID: async (id) => {
        const [result] = await connection.query("SELECT * FROM cadastro_senai WHERE id=?", [id])
            .catch(erro => console.log(erro));
        return result
    },

    registerUser: async (id, nome, sobrenome, idade) => {
        const [result] = await connection.query("INSERT INTO cadastro_senai values (?, ?, ?, ?)", [id, nome, sobrenome, idade])
            .catch(erro => console.log(erro));
        return result
    },

    deleteUser: async (id) => {
        const [result] = await connection.query("DELETE FROM cadastro_senai where id=?", [id])
            .catch(erro => console.log(erro));
        return result
    },

    updateUser: async (nome, sobrenome, idade, id) => {
        const [result] = await connection.query("UPDATE cadastro_senai SET nome=?, sobrenome=?, idade=? WHERE id=?", [nome, sobrenome, idade, id])
            .catch(erro => console.log(erro));
        return result
    },

    // Model para Login

    getById: async (email) => {
        const [result] = await connection.query("SELECT * FROM formulario WHERE id=?", [id])
            .catch(erro => console.log(erro));
        return result
    },

    validateLogin: async (email, senha) => {
        const [result] = await connection.query("SELECT * FROM cadastro_login WHERE email=? AND senha=?", [email, senha])
            .catch(erro => console.log(erro));
        return result
    },

    registerSenai: async (id, nome, sobrenome, email, senha) => {
        const [result] = await connection.query("INSERT INTO cadastro_login values(?, ?, ?, ?, ?)", [id, nome, sobrenome, email, senha])
            .catch(erro => console.log(erro));
        return result
    },

    //Model do Aluno

    getByEmailStudents: async (email) => {
        const [result] = await connection.query("SELECT * FROM registro_aluno WHERE email=?", [email])
            .catch(erro => console.log(erro));
        return result
    },

    validateLoginStudents: async (email, senha) => {
        const [result] = await connection.query("SELECT * FROM registro_aluno WHERE email=? AND senha=?", [email, senha])
            .catch(erro => console.log(erro));
        return result
    },

    registerImage: async (id, nome, sobrenome, email, senha, imagem) => {
        try {
            const [result] = await connection.query("INSERT INTO registro_aluno values(?, ?, ?, ?, ?, ?)", [id, nome, sobrenome, email, senha, imagem])
            return result
        } catch (error) {
            console.log('Erro ao registrar o usuário com a imagem', error);
            throw new error('Erro ao registrar o usuário');
        }
    },

    // Model Professor
    getByEmailTeacher: async (email) => {
        const [result] = await connection.query("SELECT * FROM professores WHERE email=?", [email])
            .catch(erro => console.log(erro));
        return result
    },

    validateLoginTeacher: async (email, senha) => {
        const [result] = await connection.query("SELECT * FROM professores WHERE email=? AND senha=?", [email, senha])
            .catch(erro => console.log(erro));
        return result
    },

    registerTeacher: async (id, nome, sobrenome, email, senha) => {
        const result = await connection.query("INSERT INTO professores values(?, ?, ?, ?, ?)", [id, nome, sobrenome, email, senha])
        return result;
    },

    //Resetar Senha
    resetByEmail: async (email) => {
        const [result] = await connection.query("SELECT * FROM registro_aluno WHERE email=?", [email])
            .catch(erro => console.log(erro));
        return result;
    },

    // Update the passworld
    updatePassworld: async (email, senha) => {
        const [result] = await connection.query("UPDATE registro_aluno SET senha=? WHERE email=?", [senha, email])
            .catch(erro => console.log(erro))
        return result;
    },

    //controller para listar
    getAllUsers: async () => {
        const [result] = await connection.query("SELECT * FROM paciente")
            .catch(erro => console.log(erro));
        return result
    },


    //!PROJETO

    //!Pegar Email
    getByEmailProjeto: async (email) => {
        const [result] = await connection.query("SELECT * FROM paciente WHERE email=?", [email])
            .catch(erro => console.log(erro));
        return result
    },

    //!Cadastrar
    cadastroProjeto: async (id, nome, email, senha) => {
        const [result] = await connection.query("INSERT INTO paciente values(?, ?, ?, ?)", [id, nome, email, senha])
            .catch(erro => console.log(erro));
        return result
    },

    //!Validar
    validateLoginProjeto: async (email, senha) => {
        const [result] = await connection.query("SELECT * FROM paciente WHERE email=? AND senha=?", [email, senha])
            .catch(erro => console.log(erro));
        return result
    },

    //!Atualizar senha
    updatePassworldProjeto: async (email, senha) => {
        const [result] = await connection.query("UPDATE paciente SET senha=? WHERE email=?", [senha, email])
            .catch(erro => console.log(erro))
        return result;
    },

    //!Pegar Email do Paciente
    getByEmailPaciente: async (email) => {
        const [result] = await connection.query("SELECT * FROM paciente WHERE email=?", [email])
            .catch(erro => console.log(erro));
        return result
    },

    //!Cadastrar Cartão
    cadastroCartao: async (id, numeroCartao, cvc, dataValidade, nome) => {
        const [result] = await connection.query("INSERT INTO pagamento values(?, ?, ?, ?, ?)", [id, numeroCartao, cvc, dataValidade, nome])
            .catch(erro => console.log(erro));
        return result
    },

    //!Pegar numeroCartao da tabela Pagameno
    getByNumeroCartaoProjeto: async (numeroCartao) => {
        const [result] = await connection.query("SELECT * FROM pagamento WHERE numeroCartao=?", [numeroCartao])
            .catch(erro => console.log(erro));
        return result
    },

    //*------------------------------------------------------------------------------------ (TRABALHO SESI)

    //* Pegar todos os Usuários 
    getAllUsers: async () => {
        const [result] = await connection.query("SELECT * FROM NOME DA TABELA")
            .catch(erro => console.log(erro));
        return result
    },

    //* Pegar o ID
    getByID: async (id) => {
        const [result] = await connection.query("SELECT * FROM formulario WHERE id=?", [id])
            .catch(erro => console.log(erro));
        return result
    },

    //* Register User
    registerUser: async (id, nome, sobrenome, idade) => {
        const [result] = await connection.query("INSERT INTO NOME DA TABELA values (?, ?, ?, ?)", [id, nome, sobrenome, idade])
            .catch(erro => console.log(erro));
        return result
    },

    //* Delete User
    deleteUser: async (id) => {
        const [result] = await connection.query("DELETE FROM NOME DA TABELA where id=?", [id])
            .catch(erro => console.log(erro));
        return result
    },

    //* Update User
    updateUser: async (nome, sobrenome, idade, id) => {
        const [result] = await connection.query("UPDATE NOME DA TABELA SET nome=?, sobrenome=?, idade=? WHERE id=?", [nome, sobrenome, idade, id])
            .catch(erro => console.log(erro));
        return result
    },


    //! PROJETO HTML AUTISMO


    //* Register User
    registerAutism: async (id, nome, email, mensagem) => {
        const [result] = await connection.query("INSERT INTO formulario values (?, ?, ?, ?)", [id, nome, email, mensagem])
            .catch(erro => console.log(erro));
        return result
    },

    // //* Register Formulario administrador
    // registerFormulario: async (id, nome, email, telefone, sexo, data_nascimento, cidade, estado, endereco) => {
    //     const [result] = await connection.query ("INSERT INTO usuario values (?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, nome, email, telefone, sexo, data_nascimento, cidade, estado, endereco])
    //     .catch(erro => console.log(erro));
    //     return result
    // },


    //!Pegar Email
    getByEmailAutism: async (email) => {
        const [result] = await connection.query("SELECT * FROM formulario WHERE email=?", [email])
            .catch(erro => console.log(erro));
        return result
    },


    //! MODEL PARA LISTAR
    getAllFormularios: async () => {
        const [result] = await connection.query("SELECT * FROM formulario")
            .catch(erro => console.log(erro));
        return result
    },
};


    module.exports = userModel;