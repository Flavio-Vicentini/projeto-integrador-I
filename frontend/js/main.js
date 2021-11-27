var dados_usuarios = [
    {"id": "1", "email": "admin@msp.com", "senha": "123123", "is_admin": "1"}//,
    //{"id": "2", "email": "tecnico@msp.com", "senha": "123456", "is_admin": "0"}
];

var dados_cliente = [
    {"id": "1", "nome": "Cliente Teste", "CPFCPNJ": "123123123"}
];

var dados_protocolos = [
    {"id": "1", "protocolo": "123", "cliente": "Cliente Teste", "requerente": "Funcionário"}, 
    {"id": "2", "protocolo": "124", "cliente": "Cliente Teste 2", "requerente": "Funcionário Teste"}
];

var dados_acompanhamentos = [
    {"id": "1", "protocolo": "123", "observacao": "Em verificação"},
    {"id": "2", "protocolo": "123", "observacao": "Problema solucionado"},
    {"id": "3", "protocolo": "124", "observacao": "Em verificação"}
];

function validaLogin(usuario, senha) {
    if (dados_usuarios[0].email == usuario && dados_usuarios[0].senha == senha) {
        return dados_usuarios[0];
    } else {
        return false;
    }
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
$("#div-func").hide();

function atualizaTabela(id_func) {
    
    if (!id_func) {
        dados_protocolos.forEach(function(item, index) {
            $("#tblservicos_adm").append("<tr><td>"+item.protocolo+"</td><td>"+item.cliente+"</td><td>"+item.requerente+"</td><td><button onclick='verificaSitProt("+item.protocolo+")'>Ver</button></td></tr>");
        });
    }

}

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

    var session = validaLogin(email, senha);

    if (session) {
        hideLogin();
        if (session.is_admin == "1") {
            showAreaRestrita();
        } else {
            showListaServ();
        }
    } else {
        alert("Usuário ou senha inválidos");
        showLogin();
    }
});
