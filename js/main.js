(function(){

    function capturaDadosFormulario() {


        const enviar = document.querySelector('.btn_form');
    
        enviar.addEventListener('click', function(e) {
    
            let cpf = document.querySelector('.input_cpf').value;
            let nome = document.querySelector('.input_nome').value+' '+document.querySelector('.input_sobrenome').value;
            let senha = document.querySelector('.input_senha').value;
    
            let objInputs = {
                cpf: cpf,
                nome: nome,
                senha: senha
            }
    
            e.preventDefault();
    
            fetch('https://dataencryptor.herokuapp.com/encriptar', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Origin": "https://diego-dfg.github.io/DataEncryptor",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objInputs),
            })
            .then(res => {
                if(res.ok) {
                    window.location = "https://diego-dfg.github.io/DataEncryptor/#/main.html";
                    return res.statusText;
                } else {
                    return res.statusText;
                }
                
            })
    
        });
    
    }
    capturaDadosFormulario()
    
    function renderizaTabela() {
    
    
        fetch('https://dataencryptor.herokuapp.com', {
            method: "GET",
            credentials: "include",
            headers: {
                "Origin": "https://diego-dfg.github.io/DataEncryptor",
                "Content-Type": "application/json",
            },
        })
        .then(res => {
            if(res.ok) return res.json();
            return console.log(res);
        })
        .then(dados => {
            dados.forEach(dado => {
    
                const id = dado.id;
    
                const tabeladom = document.querySelector('.tabela_container');
                const tabela = document.createElement('table');
                const tabelaConteudo = `
                <table>
                        <thead>
                            <th>CPF</th>
                            <th>NOME</th>
                            <th>SENHA</th>
                        </thead>
                        <tbody>
                            <tr class="colunaTabela">
                                    <td>
                                        <ul>
                                            <li>${dado.cpf.substr(0,15)}</li>
                                            <li class="cpfDescriptografado"></li>
                                        </ul>
                                    </td>
                                    <td>
                                        <ul>
                                            <li>${dado.nome.substr(0,15)}</li>
                                            <li class="nomeDescriptografado"></li>
                                        </ul>
                                    </td>
                                    <td>
                                        <ul>
                                            <li>${dado.senha.substr(0,15)}</li>
                                            <li class="senhaDescriptografado"></li>
                                        </ul>
                                    </td>
                            </tr>
                            <img id="${dado.id}" class="btn_decodificar" />
                        </tbody>
                </table>
                `;
    
                tabela.innerHTML = tabelaConteudo;
                tabela.classList.add('container');
                tabeladom.appendChild(tabela);
    
                const btnDecodificar = document.querySelectorAll('.btn_decodificar');
                btnDecodificar.forEach(btn => {
                    btn.style.background = "url('./img/lock.svg') no-repeat right top";
                })
    
                decodificaDados(id);
                logout();
    
            })
            
        });
    
    }
    renderizaTabela();
    
    function decodificaDados(iddado) {
    
            const btnDecodificar = document.querySelectorAll('.btn_decodificar');
            btnDecodificar.forEach(btn => {
    
                const estadoBtn = [false];
    
                btn.addEventListener('click', function(e) {
    
                    const btnDecodificar = e.target;
    
                    const tabelaAtual = e.target.parentElement;
                    const colunaAtual = tabelaAtual.childNodes[3].childNodes[1];
    
                    const cpfAtual = colunaAtual.childNodes[1].childNodes[1].childNodes[3];
                    const nomeAtual = colunaAtual.childNodes[3].childNodes[1].childNodes[3];
                    const senhaAtual = colunaAtual.childNodes[5].childNodes[1].childNodes[3];
    
                    if(estadoBtn[0] == true) {
                
    
                        cpfAtual.style.display='none';
                        nomeAtual.style.display='none';
                        senhaAtual.style.display='none';
    
                        btnDecodificar.style.background = "url('./img/lock.svg') no-repeat right top";
                        btnDecodificar.style.textContent = "Decodificar";
    
                        estadoBtn[0] = false;
    
                    } else {
    
                          
                        cpfAtual.style.display='block';
                        nomeAtual.style.display='block';
                        senhaAtual.style.display='block';
    
                        cpfAtual.style.fontWeight='bold';
                        nomeAtual.style.fontWeight='bold';
                        senhaAtual.style.fontWeight='bold';
    
                        cpfAtual.style.color='red';
                        nomeAtual.style.color='red';
                        senhaAtual.style.color='red';
    
                        btnDecodificar.style.background = "url('./img/unlock.svg') no-repeat right top";
                        btnDecodificar.style.textContent = "Codificar";
                        
                        estadoBtn[0] = true;
    
                    }
    
                    if(e.target.id == iddado) {
    
                        let dadosDes = [];
                
                        fetch(`https://dataencryptor.herokuapp.com/${iddado}`, {
                            method: "GET",
                            credentials: "include",
                            headers: {
                                "Origin": "https://diego-dfg.github.io/DataEncryptor",
                                "Content-Type": "application/json",
                            },
                        })
                        .then(res => {
                            if(res.ok) return res.json();
                            return console.log(res);
                        }).then(dados => {
                
                            dadosDes.push(dados);
                            dadosDes.forEach(dado => {
                
                                const id = dado.id;
                    
                                const linhaCpf = cpfAtual;
                                const linhaNome = nomeAtual;
                                const linhaSenha = senhaAtual;
                                const cpfConteudo = `
                                    <li class="cpfDescriptografado">${dado.cpf}</li>
                                `;
                                linhaCpf.innerHTML = cpfConteudo;
                                const nomeConteudo = `
                                    <li class="cpfDescriptografado">${dado.nome}</li>
                                `;
                                linhaNome.innerHTML = nomeConteudo;
                                const senhaConteudo = `
                                    <li class="cpfDescriptografado">${dado.senha}</li>
                                `;
                                linhaSenha.innerHTML = senhaConteudo;
                    
                            })
                
                        })
        
                    }
        
    
                });
    
            })
    }
    
    function login() {
    
        const enviar = document.querySelector('.btn_login');
    
        enviar.addEventListener('click', function(e) {
    
            let login = document.querySelector('.input_login').value
            let senha = document.querySelector('.input_senha').value;
    
            let objInputs = {
                login: login,
                senha: senha
            }
    
            e.preventDefault();
    
            fetch('https://dataencryptor.herokuapp.com/auth', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Origin": "https://diego-dfg.github.io/DataEncryptor",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objInputs),
            })
            .then(res => {
                if(res.ok) {
                    window.location = "https://diego-dfg.github.io/DataEncryptor/main.html";
                    return res.statusText;
                } else {
                    return res.statusText;
                }
                
            })
    
        });
    
    }
    login();
    
    function logout() {
    
        console.log('Acessei logout');
        
        const btn_logout = document.querySelector('.btn_logout_container');
    
        btn_logout.addEventListener('click', function(e) {
    
            e.preventDefault();
    
            fetch("https://dataencryptor.herokuapp.com/logout", {
                method: "DELETE",
                credentials: "include",
            });
    
            window.location = "https://diego-dfg.github.io/DataEncryptor/index.html";
    
    
        });
    }

})();




