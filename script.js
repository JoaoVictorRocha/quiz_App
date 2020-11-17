//selecionando todos os elementos necessários
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

//se o botão startQuiz for clicado
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //mostrar caixa de informações
}
 
//se o botão exitQuiz for clicado
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //Escondendo caixa de informações
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //Escondendo caixa de informações
    quiz_box.classList.add("activeQuiz"); //Mostrar caixa de questionário
    showQuetions(0); //chamando a função showQestions
    queCounter(1); //Passando um parametro para o Qcounter
    startTimer(15); //Chamando Função Starttime
    startTimerLine(0); //Chamando a função startTimerLine 
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

//se o botão reiniciar do questionário for clicado
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //Mostrar caixa de informações
    result_box.classList.remove("activeResult"); //Esconder caixa de resultado
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //Chamando a função showQestions 
    queCounter(que_numb); //Passando o valor de que_numb para queCounter
    clearInterval(counter); //Contador limpo
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //Chamando a função startTimer 
    startTimerLine(widthValue); //Chamando a função startTimerLine 
    timeText.textContent = "Tempo restante"; //mude o texto de timeText para Time Left
    next_btn.classList.remove("show"); //Esconda o próximo botão
}

// Se o botão quitQuiz for clicado 
quit_quiz.onclick = ()=>{
    window.location.reload(); //recarregar a janela atual
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// Se o botão Next for clicado
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //se a contagem de perguntas for menor que o comprimento total da pergunta
        que_count++; //incremente o  que_count value
        que_numb++; //Incremente o que_numb value
        showQuetions(que_count); //Chamando a função showQestions 
        queCounter(que_numb); //Passando o valor de que_numb para queCounter
        clearInterval(counter); //Limpando contador
        clearInterval(counterLine); //Limpando counterLine
        startTimer(timeValue); //Chamando a função startTimer 
        startTimerLine(widthValue); //Chamando a função startTimer
        timeText.textContent = "Time Left"; //Mudando o time text para o timeleaft
        next_btn.classList.remove("show"); //Escondendo o próximo botão
    }else{
        clearInterval(counter); //Limpando contador
        clearInterval(counterLine); //Limpando counterLine
        showResult(); //Chamando a função showResult 
    }
}

// recebendo perguntas e opções de array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //criando uma nova tag span e div para a questão e opção e passando o valor usando o índice de array
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adicionar nova tag span dentro de que_tag
    option_list.innerHTML = option_tag; //adicionar nova tag div dentro de option_tag
    
    const option = option_list.querySelectorAll(".option");

    // definir o atributo onclick para todas as opções disponíveis
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// criando as novas tags div que para ícones
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//se o usuário clicou na opção
function optionSelected(answer){
    clearInterval(counter); //Limpar contador
    clearInterval(counterLine); //Limpar counterLine
    let userAns = answer.textContent; //obtendo a opção selecionada pelo usuário
    let correcAns = questions[que_count].answer; //gObtendo a resposta correta do array
    const allOptions = option_list.children.length; //Obtendo todos os itens da opção
    
    if(userAns == correcAns){ //se a opção selecionada pelo usuário for igual à resposta correta da matriz
        userScore += 1; //atualizando o valor da pontuação com 1
        answer.classList.add("correct"); //adicionando a cor verde para corrigir a opção selecionada
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adicionando o ícone de marca para corrigir a opção selecionada
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adicionando a cor vermelha para corrigir a opção selecionada
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adicionando o ícone de cruz para corrigir a opção selecionada
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){  
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // Se acertou mais de 3 questões
        //criando uma nova tag de span e passando o número de pontuação do usuário e o número total de perguntas
        let scoreTag = '<span>Parabéns! 🎉, Você passou <p>'+ userScore +'</p> de fase <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adicionar nova tag span dentro de score_Text
    }
    else if(userScore > 1){ // se o usuário pontuou mais de 1
        let scoreTag = '<span> Você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // se o usuário pontuou menos de 1
        let scoreTag = '<span>Me desculpe 😐, Você acertou apenas <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //alterando o valor de timeCount com o valor de tempo
        time--; //diminuir o valor do tempo
        if(time < 9){ //Se o tempo for menor que 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //adicione um 0 antes do valor do tempo
        }
        if(time < 0){ //se o cronômetro for menor que 0
            clearInterval(counter); //Limpar contador
            timeText.textContent = "Time Off"; //mude o texto da hora para hora off
            const allOptions = option_list.children.length; //obtendo todos os itens opcionais
            let correcAns = questions[que_count].answer; //obtendo a resposta correta da matriz
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //se houver uma opção que corresponda a uma resposta de matriz
                    option_list.children[i].setAttribute("class", "option correct"); //adicionando a cor verde à opção correspondente
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adicionando a cor verde à opção correspondente
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //uma vez que o usuário seleciona uma opção, desabilita todas as opções
            }
            next_btn.classList.add("show"); //mostra o próximo botão se o usuário selecionou qualquer opção
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //atualizando o valor do tempo com 1
        time_line.style.width = time + "px"; //aumentando a largura de time_line com px por valor de tempo
        if(time > 549){ //se o valor do tempo for maior que 549
            clearInterval(counterLine); //Limpar counterLine
        }
    }
}

function queCounter(index){
    //criando uma nova tag de span e passando o número da pergunta e a pergunta total
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adicionar nova tag span dentro de bottom_ques_counter
}
