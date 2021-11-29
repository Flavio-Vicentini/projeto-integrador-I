var dados_protocolos;
var dados_clientes;

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

function cadastraTecnico(nome, email, senha) {
    axios.post('/api/users', {
        "name": nome,
        "email": email,
        "password": senha
    },
    {
        headers: {"Authorization": 'Bearer ' + localStorage["token"]}
    }).then(function (response) {
        console.log(response);
        
        $("#nome-tec").val("");
        $("#email-tec").val("");
        $("#senha-tec").val("");

    }).catch(function (error) {
        console.log(error);
        alert("Erro ao cadastrar técnico, verifique os dados e tente novamente");
    })
}

function listaProtocolos() {
    axios.get('/api/orders', {
        headers: {"Authorization": 'Bearer ' + localStorage["token"]}
    }).then(function (response) {
        console.log(response);
        dados_protocolos = response;

        if (localStorage["name"] == "admin") {
        $("#tblservicos_adm").empty();
        $("#tblservicos_adm").append("<tr><th class='w120'>Protocolo</th> <th class='w255'>Cliente</th><th class='w140'>Requerente</th><th>Opções</th></tr>");

        dados_protocolos.data.forEach(function(protocolo, index) {
            if (protocolo.status != "Solucionado") {
                $("#tblservicos_adm").append("<tr><td>"+protocolo.protocol+"</td><td>"+protocolo.client.name+"</td><td>"+protocolo.requester_name+"</td><td><button onclick='buscaProtocolo(\""+protocolo.protocol+"\")'>Ver</button></td></tr>");                
            }
        });
        } else {
            $("#tblservicos").empty();
            $("#tblservicos").append("<tr><th class='w120'>Protocolo</th> <th class='w255'>Cliente</th><th class='w140'>Requerente</th><th>Opções</th></tr>");
    
            dados_protocolos.data.forEach(function(protocolo, index) {
                if (protocolo.status != "Solucionado" && protocolo.external_user.email == localStorage["email"]) {
                    $("#tblservicos").append("<tr><td>"+protocolo.protocol+"</td><td>"+protocolo.client.name+"</td><td>"+protocolo.requester_name+"</td><td><button onclick='buscaProtocolo(\""+protocolo.protocol+"\")'>Ver</button></td></tr>");                
                }
            });
        }

    }).catch(function (error) {
        console.log(error);
        alert("Ocorreu um erro ao listar os protocolos. Saia e entre novamente no sistema.");
    });
}

function buscaProtocolo(protocolo) {
    axios.get('/api/orders/protocol/'+protocolo).then(function (response) {
        console.log(response);

        $("#tela-situacao-protocolo").show("fast");
        $("#tela-situacao-protocolo-aba-1").show();
        $("#tela-situacao-protocolo-aba-2").hide();

        $("#prot").text(response.data.protocol);
        $("#protocol_id").val(response.data.id);
        $("#sit_prot").text(response.data.status);
        $("#datahora").text(new Date(response.data.open_date));
        $("#cliente").text(response.data.client.name);
        $("#tecnico").text(response.data.external_user.name);
        $("#status").val(response.data.status);
        $("#acompanhamentos").val("Descrição: " + response.data.defect + "\n\n--\n\n");
        
        if(response.data.notes.length > 0) {
            response.data.notes.forEach(function(note, index) {
                $("#acompanhamentos").val($("#acompanhamentos").val() + new Date(note.created_at)+ "\n\t" + note.observations + "\n\n--\n\n");
            });
        }        
    }).catch(function (error) {
        console.log(error);
    });
}

function validaLogin(usuario, senha) {

    $("#email").val("");
    $("#senha").val("");

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
        $("#email").focus();
        alert("Usuário ou senha inválidos!");
    });

}

function carregaClientes() {
    axios.get('/api/clients', {
        headers: {"Authorization": 'Bearer ' + localStorage["token"]}
    }).then(function (response) {
        console.log(response);
        dados_clientes = response;

        $("#cbcliente").empty();
        $("#cbcliente").append("<option></option>")

        dados_clientes.data.forEach(function(cliente, index) {
            $("#cbcliente").append("<option value="+cliente.id+">"+cliente.name+"</option>");
        });

    }).catch(function (error) {
        console.log(error);
        alert("Ocorreu um erro ao listar os clientes. Saia e entre novamente no sistema.");
    });
}

function carregaTecnicos() {
    axios.get('/api/users', {
        headers: {"Authorization": 'Bearer ' + localStorage["token"]}
    }).then(function (response) {
        console.log(response);
        dados_users = response;

        $("#cbtecnico").empty();
        $("#cbtecnico").append("<option></option>")

        dados_users.data.forEach(function(user, index) {
            $("#cbtecnico").append("<option value="+user.id+">"+user.name+"</option>");
        });

    }).catch(function (error) {
        console.log(error);
        alert("Ocorreu um erro ao listar os técnicos. Saia e entre novamente no sistema.");
    });
}

function showLogin() {
    $("#tela-login").show("fast");
    $("#tela-registro-defeitos").hide();
    $("#tela-situacao-protocolo").hide();
    $("#tela-lista-servicos").hide();
    $("#tela-area-restrita").hide();
    $("#tela-cadastro-cliente").hide();    
    $("#tela-cadastro-tecnico").hide(); 
    
    if($("#lnk-con-prot").hasClass("selected")) {
        $("#protocolo").focus();
    } else {
        $("#email").focus();
    }

}

function showRegProb() {
    $("#tela-registro-defeitos").show("fast");

    $("#requerente").val("");
    $("#contato_req").val("");
    $("#endereco").val("");
    $("#descricao").val("");

    carregaClientes();
    carregaTecnicos();
}

function showListaServ() {
    $("#tela-lista-servicos").show("fast");
    listaProtocolos();
}

function showAreaRestrita() {
    $("#tela-area-restrita").show("fast");
    listaProtocolos();
}

function showCadCli() {
    $("#tela-cadastro-cliente").show("fast");
    $("#nome-cli").focus();
}

function showCadTec() {
    $("#tela-cadastro-tecnico").show("fast");
}

function hideLogin() {
    $("#tela-login").hide("fast");

    if(localStorage['token'] == undefined) {
        $("#btn-atualizar").hide();
    } else {
        $("#btn-atualizar").show();
    }
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

function hideCadTec() {
    $("#tela-cadastro-tecnico").hide("fast");
}

showLogin();
verifySession();
$("#div-func").hide();
$("#tela-situacao-protocolo-aba-2").hide();


$("#btn_table").on("click", function() {
    $("#tblservicos").append("<tr><td>1</td><td>Cliente Teste</td><td>Funcionario</td><td><button onclick>Ver</button></td></tr>");
});

$("#btn_limpar").on("click", function() {
    $("#tblservicos tr").remove();
    $("#tblservicos").append("<tr><th class='w120'>Protocolo</th> <th class='w255'>Cliente</th><th class='w140'>Requerente</th><th>Opções</th></tr>");
});

$("#lnk-con-prot").on("click", function(){
    $("#div-prot").show();
    $("#lnk-con-prot").addClass("selected");
    $("#lnk-ac-func").removeClass("selected");
    $("#protocolo").focus();
    $("#div-func").hide();
});

$("#lnk-ac-func").on("click", function(){
    $("#div-func").show();
    $("#lnk-ac-func").addClass("selected");
    $("#lnk-con-prot").removeClass("selected");
    $("#div-prot").hide();
    $("#email").focus();
});

$("#frm-prot").on("submit", function(e) {
    e.preventDefault();
    console.log("Consulta Protocolo");

    var protocolo = $("#protocolo").val();

    axios.get('/api/orders/protocol/'+protocolo).then(function (response) {
        console.log(response);
        hideLogin();

        $("#tela-situacao-protocolo").show("fast");

        $("#prot").text(response.data.protocol);
        $("#sit_prot").text(response.data.status);
        $("#datahora").text(new Date(response.data.open_date));
        $("#cliente").text(response.data.client.name);
        $("#tecnico").text(response.data.external_user.name);
        $("#acompanhamentos").val("Descrição: " + response.data.defect + "\n\n--\n\n");

        $("#protocolo").val("");

        if(response.data.notes.length > 0) {
            response.data.notes.forEach(function(note, index) {
                $("#acompanhamentos").val($("#acompanhamentos").val() + new Date(note.created_at)+ "\n\t" + note.observations + "\n\n--\n\n");
            });
        }
    }).catch(function (error) {
        console.log(error);
        alert("Protocolo não encontrado!");
        showLogin();
    });
});

$("#btn-voltar").on("click", function() {
    hideSitProt();
    if (localStorage["name"] == undefined) {
        showLogin();   
    } else {
        listaProtocolos();
    }
});

$(".logoff-btn").on("click", function() {
    doLogout();
    hideAreaRestrita();
    hideListaServ();
    showLogin();
});

$("#btn-cad-cli").on("click", function() {
    hideAreaRestrita();
    showCadCli();
});

$("#btn-cad-tec").on("click", function() {
    hideAreaRestrita();
    showCadTec();
    $("#nome-tec").focus();
});

$("#btn-reg-prob").on("click", function() {
    hideAreaRestrita();
    showRegProb();
});

$(".btn-cancelar-adm").on("click", function() {
    hideCadCli();
    hideCadTec();
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

$("#btn-salvar-tec").on("click", function(e) {
    var nome = $("#nome-tec").val();
    var email = $("#email-tec").val();
    var senha = $("#senha-tec").val();

    cadastraTecnico(nome, email, senha);
})

$("#btn-def-salvar").on("click", function(e) {
    var client_id = $("#cbcliente").val();
    var requester_name = $("#requerente").val();
    var tel_req = $("#contato_req").val();
    var endereco_req = $("#endereco").val();
    var tecnico_id = $("#cbtecnico").val();
    var descricao = $("#descricao").val();

    axios.post('/api/orders', {
        "id_client": client_id,
        "id_external_user": tecnico_id,
        "defect": descricao + "\nEndereço para Atendimento: " + endereco_req,
        "requester_name": requester_name,
        "requester_phone": tel_req
    },
    {
        headers: {"Authorization": 'Bearer ' + localStorage["token"]}
    }).then(function (response) {
        console.log(response);
        listaProtocolos();
        hideRegProb();
        showAreaRestrita();
    }).catch(function (error) {
        console.log(error);
        alert("Erro ao cadastrar ordem de serviço, verifique os dados e tente novamente");
    });
});

$("#btn-def-cancelar").on("click", function() {
    hideRegProb();
    showAreaRestrita();
});

$("#btn-atualizar").on("click", function() {
    $("#novo-acompanhamento").val("");
    $("#tela-situacao-protocolo-aba-1").hide();
    $("#tela-situacao-protocolo-aba-2").show();
});

$("#btn-cancelar-obs").on("click", function() {
    $("#novo-acompanhamento").val("");
    $("#tela-situacao-protocolo-aba-1").show();
    $("#tela-situacao-protocolo-aba-2").hide();
});

$("#btn-salvar-obs").on("click", function() {
    var obs = $("#novo-acompanhamento").val();

    axios.patch('api/orders/status/' + $("#protocol_id").val(), {
        "status": $("#status").val()
    },
    {
        headers: {"Authorization": 'Bearer ' + localStorage["token"]}
    }).then(function (response) {
        console.log(response);
        buscaProtocolo($("#prot").text());

        $("#tela-situacao-protocolo-aba-1").show();
        $("#tela-situacao-protocolo-aba-2").hide();
        
    }).catch(function (error) {
        console.log(error);
        alert("Erro ao alterar status da ordem de serviço, verifique os dados e tente novamente");
    });   

    if (obs != "") {
        axios.post('api/orders/notes/' + $("#protocol_id").val(), {
            "observations": localStorage['name'] + ": " + obs
        },
        {
            headers: {"Authorization": 'Bearer ' + localStorage["token"]}
        }).then(function (response) {
            console.log(response);
            $("#novo-acompanhamento").val("");
            buscaProtocolo($("#prot").text());
        }).catch(function (error) {
            console.log(error);
            alert("Erro ao inserir acompanhamento, verifique os dados e tente novamente");
        });
    }
});