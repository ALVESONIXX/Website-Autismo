document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cadFormulario');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            mensagem: formData.get('mensagem')
        };

        console.log("Dados a serem enviados:", JSON.stringify(data));

        fetch('http://localhost:8085/api/registerautism', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                window.alert("Logado Com Sucesso");
                console.log('Dados enviados com sucesso:', data);
                cadFormulario.reset();
            })
            .catch(error => {
                console.error('Erro ao enviar os dados:', error);
            });
    });
});
