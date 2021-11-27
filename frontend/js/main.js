var dados_protocolos;

function doLogout() {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
}

function verifySession() {
    if (localStorage["name"] != undefined && localStorage["email"] != undefined && localStorage["token"] != undefined) {
        if (localStorage["name"] == "admin") {
            hideLogin();
            showAreaRestrita();
        } else {
            hideLogin();
            showListaServ();
        }
    } else {
        showLogin();
    }
}

function cadastraCliente(nome, cpf_cnpj, telefone) {
    axios.post('/api/clients', {
        "name": nome,
        "cpf_cnpj": cpf_cnpj,
        "telephone": telefone
    },
    {
        headers: {"Authorization": 'Bearer ' + localStorage["token"]}
    }).then(function (response) {
        console.log(response);
        
        $("#nome-cli").val("");
        $("#cpf-cnpj").val("");
        $("#telefone").val("");

    }).catch(function (error) {
        console.log(error);
        alert("Erro ao cadastrar cliente, verifique os dados e tente novamente");
    })
}

function listaProtocolos() {
    axios.get('/api/orders', {
        headers: {"Authorization": 'Bearer ' + localStorage["token"]}
    }).then(function (response) {
        console.log(response);
        dados_protocolos = response;

        dados_protocolos.data.forEach(function(protocolo, index) {
            $("#tblservicos_adm").remove("tr");
            $("#tblservicos_adm").append("<tr><td>"+protocolo.protocol+"</td><td>"+protocolo.client.name+"</td><td>"+protocolo.requester_name+"</td><td><button onclick='verificaSitProt("+protocolo.protocol+")'>Ver</button></td></tr>");
        });

    }).catch(function (error) {
        console.log(error);
        alert("Ocorreu um erro ao listar os protocolos. Saia e entre novamente no sistema.");
    });
}

function validaLogin(usuario, senha) {

    axios.post('/api/users/sessions', {
        "email":usuario,
        "password":senha
    }).then(function (response) {
        console.log(response);

        localStorage["name"] = response.data.user.name;
        localStorage["email"] = response.data.user.email;
        localStorage["token"] = response.data.token;
        
        if (response.data.user.name == "admin") {
                hideLogin();
                showAreaRestrita();
            } else {
                hideLogin();
                showListaServ();
        }

    }).catch(function (error) {
        console.log(error);
        alert("Usuário ou senha inválidos!");
    });

}

function carregaDadosProtocolo(numero) {
    if (dados_protocolos[0].protocolo == numero) {
        return dados_protocolos[0];
    } else {
        return false;
    }
};

function showLogin() {
    $("#tela-login").show("fast");
    $("#tela-registro-defeitos").hide();
    $("#tela-situacao-protocolo").hide();
    $("#tela-lista-servicos").hide();
    $("#tela-area-restrita").hide();
    $("#tela-cadastro-cliente").hide();    
}

function showRegProb() {
    $("#tela-registro-defeitos").show("fast");
}

function showSitProt(protocolo) {
    $("#tela-situacao-protocolo").show("fast");

    $("#prot").text(protocolo.protocolo);
    $("#data").text(protocolo.protocolo);
    $("#hora").text(protocolo.protocolo);
    $("#cliente").text(protocolo.cliente);
    $("#tecnico").text(protocolo.protocolo);
}

function verificaSitProt(num_protocolo) {
    showSitProt(carregaDadosProtocolo(num_protocolo));
}

function showListaServ() {
    $("#tela-lista-servicos").show("fast");
}

function showAreaRestrita() {
    $("#tela-area-restrita").show("fast");
    listaProtocolos();
}

function showCadCli() {
    $("#tela-cadastro-cliente").show("fast");
}

function hideLogin() {
    $("#tela-login").hide("fast");
}

function hideRegProb() {
    $("#tela-registro-defeitos").hide("fast");
}

function hideSitProt() {
    $("#tela-situacao-protocolo").hide("fast");
}

function hideListaServ() {
    $("#tela-lista-servicos").hide("fast");
}

function hideAreaRestrita() {
    $("#tela-area-restrita").hide("fast");
}

function hideCadCli() {
    $("#tela-cadastro-cliente").hide("fast");
}


showLogin();
verifySession();
$("#div-func").hide();


$("#btn_table").on("click", function() {
    $("#tblservicos").append("<tr><td>1</td><td>Cliente Teste</td><td>Funcionario</td><td><button onclick>Ver</button></td></tr>");
});

$("#btn_limpar").on("click", function() {
    $("#tblservicos tr").remove();
    $("#tblservicos").append("<tr><th class='w100px'>Protocolo</th> <th class='w255'>Cliente</th><th class='w140'>Requerente</th><th>Opções</th></tr>");
});

$("#lnk-con-prot").on("click", function(){
    $("#div-prot").show();
    $("#lnk-con-prot").addClass("selected");
    $("#lnk-ac-func").removeClass("selected");
    $("#div-func").hide();
});

$("#lnk-ac-func").on("click", function(){
    $("#div-func").show();
    $("#lnk-ac-func").addClass("selected");
    $("#lnk-con-prot").removeClass("selected");
    $("#div-prot").hide();
});

$("#frm-prot").on("submit", function(e) {
    e.preventDefault();
    console.log("Consulta Protocolo");

    var protocolo = $("#protocolo").val();
    var prot_tmp = carregaDadosProtocolo(protocolo);

    if (prot_tmp) {
        hideLogin();
        showSitProt(prot_tmp);
    } else {
        alert("Número de protocolo inválido");
        showLogin();
    }
});

$("#btn-voltar").on("click", function() {
    showLogin();
    hideSitProt();
});

$("#btn-logoff").on("click", function() {
    doLogout();
    showLogin();
    hideAreaRestrita();
});

$("#btn-cad-cli").on("click", function() {
    hideAreaRestrita();
    showCadCli();
});

$("#btn-reg-prob").on("click", function() {
    hideAreaRestrita();
    showRegProb();
});

$("#btn-cancelar").on("click", function() {
    hideCadCli();
    showAreaRestrita();
});

$("#frm-func").on("submit", function(e) {
    e.preventDefault();
    console.log("Tentativa de Login");

    var email = $("#email").val();
    var senha = $("#senha").val();

    validaLogin(email, senha);
});

$("#btn-salvar").on("click", function(e) {
    var nome = $("#nome-cli").val();
    var cpf_cnpj = $("#cpf-cnpj").val();
    var telefone = $("#telefone").val();

    cadastraCliente(nome, cpf_cnpj, telefone);
})