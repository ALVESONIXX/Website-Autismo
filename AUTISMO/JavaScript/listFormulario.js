document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('listFormulario');

    form.addEventListener('list', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            mensagem: formData.get('mensagem')
        };

        console.log("Dados a serem enviados:", JSON.stringify(data));

        fetch('http://localhost:8085/api/listarformulario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Dados enviados com sucesso:', data);
            })
            .catch(error => {
                console.error('Erro ao enviar os dados:', error);
            });
    });
});
