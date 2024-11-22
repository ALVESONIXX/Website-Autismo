jQuery(document).ready(function() {

    jQuery('#login').submit(function(e) {
        e.preventDefault();

        // Captura os dados do formulário
        var formData = new FormData(this);

        jQuery.ajax({
            type: "POST",
            url: "http://localhost/AUTISMO/teladelogin.php",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                var retorno = JSON.parse(data);

                if (retorno.msg_status === 'erro_senha_email') {
                    usuario_senha_erradas(retorno.message);
                    jQuery('#login').trigger('reset');
                    jQuery("#email").focus();
                } else if (retorno.msg_status === 'logar') {
                    jQuery('#login').trigger('reset');
                    alert(retorno.message); // Mensagem de login
                    // Verifica se é o usuário administrador
                    const email = formData.get('email');
                    const adminEmail = "teste@gmail.com";
                    const adminPassword = "1234";

                    // Redireciona com base no email
                    if (email === adminEmail) {
                        window.location.href = "http://localhost/AUTISMO/tabela.php"; // Página admin
                    } else {
                        window.location.href = "http://localhost/AUTISMO/indexcopy.html"; // Página normal
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error('Erro:', error);
                Lobibox.notify('error', {
                    pauseDelayOnHover: true,
                    size: 'mini',
                    rounded: true,
                    delayIndicator: false,
                    icon: 'bx bx-error',
                    continueDelayOnInactiveTab: false,
                    position: 'top right',
                    msg: 'Ocorreu um erro ao processar o login.'
                });
            }
        });

        return false;
    });
});

/* Alertas */
function usuario_senha_erradas(message) {
    Lobibox.notify('warning', {
        pauseDelayOnHover: true,
        size: 'mini',
        rounded: true,
        delayIndicator: false,
        icon: 'bx bx-error',
        continueDelayOnInactiveTab: false,
        position: 'top right',
        msg: message || 'Usuário ou senha incorretos!'
    });
}