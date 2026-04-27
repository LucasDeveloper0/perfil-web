// 1. Manipulação do DOM — Tema Escuro/Claro
const btnTema = document.querySelector('#btn-tema');

// Recupera a preferência do localStorage ao carregar a página
if (localStorage.getItem('tema') === 'escuro') {
    document.body.classList.add('dark');
    btnTema.textContent = 'Modo Claro';
}

btnTema.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('tema', 'escuro');
        btnTema.textContent = 'Modo Claro';
    } else {
        localStorage.setItem('tema', 'claro');
        btnTema.textContent = 'Modo Escuro';
    }
});

// 2. Interatividade nos Cards
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove a classe 'ativo' de todos os cards
        cards.forEach(c => c.classList.remove('ativo'));
        // Adiciona a classe apenas ao card clicado
        card.classList.add('ativo');
    });
});

// 3. Contador de Caracteres no Textarea
const textarea = document.querySelector('#mensagem');
const contador = document.querySelector('#contador');
const limite = 300; // Limite que definimos no maxlength do HTML

textarea.addEventListener('input', () => {
    const qtdCaracteres = textarea.value.length;
    contador.textContent = `${qtdCaracteres} / ${limite} caracteres`;

    // Muda a cor para vermelho ao atingir o limite máximo
    if (qtdCaracteres >= limite) {
        contador.style.color = 'red';
        contador.style.fontWeight = 'bold';
    } else {
        contador.style.color = ''; // Volta ao padrão
        contador.style.fontWeight = 'normal';
    }
});

// 4. Validação de Formulário com JavaScript
const form = document.querySelector('#form-contato');
const inputNome = document.querySelector('#nome');
const inputEmail = document.querySelector('#email');
const divSucesso = document.querySelector('#mensagem-sucesso');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão da página

    // Remove mensagens de erro e sucesso anteriores
    document.querySelectorAll('.erro-msg').forEach(msg => msg.remove());
    divSucesso.textContent = '';
    
    let formularioValido = true;

    // Validação de Nome (Mínimo de 3 caracteres)
    if (inputNome.value.trim().length < 3) {
        formularioValido = false;
        exibirErro(inputNome, 'O nome deve possuir pelo menos 3 caracteres.');
    }

    // Validação de E-mail (RegExp)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail.value.trim())) {
        formularioValido = false;
        exibirErro(inputEmail, 'Por favor, insira um endereço de e-mail válido.');
    }

    // Se estiver tudo correto
    if (formularioValido) {
        divSucesso.textContent = 'Mensagem enviada com sucesso!';
        form.reset(); // Limpa os campos do formulário
        contador.textContent = `0 / ${limite} caracteres`; // Reseta contador
    }
});

// Função auxiliar para criar e inserir as mensagens de erro
function exibirErro(elementoInput, mensagem) {
    const spanErro = document.createElement('span');
    spanErro.classList.add('erro-msg');
    spanErro.textContent = mensagem;
    
    // Insere o span logo após o input inválido (dentro da div .campo)
    elementoInput.parentElement.appendChild(spanErro);
}