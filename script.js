const optionsdiv = document.getElementById('optionsdiv');
const quizquestion = document.getElementById('quizquestion');
const Next = document.getElementById('Next');
const Pre = document.getElementById('Pre');
const sumbit = document.getElementById('sumbit');
const result = document.getElementById('result');
const totalquestion = document.getElementById('total-question');
const resultcontainer=document.getElementById("result-container");
const conttainer=document.querySelector('.quiz-container');
const quizresult=document.querySelector('.quiz-result');

const Quizquestions = [
    {
        question: "What is the currency of Japan?",
        options: ["Yuan", "Won", "Yen", "Ringgit"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "Who discovered gravity?",
        options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
        answer: 1
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pb", "Fe"],
        answer: 0
    },
    {
        question: "Which year did the Titanic sink?",
        options: ["1912", "1905", "1898", "1923"],
        answer: 0
    },
    {
        question: "What is the square root of 144?",
        options: ["10", "11", "12", "14"],
        answer: 2
    },
    {
        question: "Who was the first President of the United States?",
        options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"],
        answer: 2
    },
    {
        question: "What is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        answer: 1
    },
    {
        question: "How many continents are there on Earth?",
        options: ["5", "6", "7", "8"],
        answer: 2
    },
    {
        question: "Which is the smallest country in the world?",
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        answer: 1
    },
];

let currentQuestionIndex = 0;

let indexof = 0;
let count = 0;
result.innerHTML = count;

function showQuestion() {
    let question = Quizquestions[currentQuestionIndex];
    optionsdiv.innerHTML = ''; 
    optionsdiv.classList.remove('disabled');
    totalquestion.innerHTML=currentQuestionIndex+1;

    if(currentQuestionIndex<1){
        Pre.style.display='none';
    }
    if(currentQuestionIndex>=Quizquestions.length-1){
        Next.style.display='none';
        sumbit.style.display='inline-block';
    }
    
    quizquestion.innerHTML=question.question;

    let options = document.createElement('div');
    options.innerHTML = `
        <div class='option' data-value='0'>${question.options[0]}</div>
        <div class='option' data-value='1'>${question.options[1]}</div>
        <div class='option' data-value='2'>${question.options[2]}</div>
        <div class='option' data-value='3'>${question.options[3]}</div>
    `;

    optionsdiv.appendChild(options);

    let allOptions = options.querySelectorAll('.option');

    allOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            if (optionsdiv.classList.contains('disabled')) return; 

            optionsdiv.classList.add('disabled'); 
            indexof = event.target.getAttribute('data-value');

            if (indexof == question.answer) {
                event.target.classList.add('answer'); 
                count++;
                result.innerHTML = count;
            } else {
                event.target.classList.add('wrong'); 
                allOptions[question.answer].classList.add('answer'); 
            }

            
            allOptions.forEach(opt => opt.classList.add('disabled'));
        });
    });
}

showQuestion();


Next.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex > Quizquestions.length) {
        sumbit.style.display='inline-block';
    }
    Pre.style.display='inline-block';
    showQuestion();
});

Pre.addEventListener('click', () => {
    currentQuestionIndex--;
    if (currentQuestionIndex < 0) {
        currentQuestionIndex = Quizquestions.length - 1;
    }
    Next.style.display='inline-block';
    sumbit.style.display='none';
    showQuestion();
});

sumbit.addEventListener('click',()=>{
    conttainer.style.display='none';
    resultcontainer.style.display='none';
    // document.getElementById('mainheading'),style.display='none';
    quizresult.style.display='block';
    if(count>=7){
        document.getElementById('headingwinner').innerHTML='Great Job!';
        document.getElementById('img').src = 'images/10556764-removebg-preview.png';
        document.getElementById('scorecard').innerHTML=count;
        let audio = document.getElementById("audiowinner");
        audio.currentTime = 0; 
        audio.play();
        setTimeout(() => {
            audio.pause();
        }, 5000);
    }
    else{
        document.getElementById('headingwinner').innerHTML='Well played';
        document.getElementById('img').src = 'images/10478816-removebg-preview.png';
        document.getElementById('scorecard').innerHTML=count;
        let audio = document.getElementById("audioloser");
        audio.currentTime = 0; 
        audio.play();
        setTimeout(() => {
            audio.pause();
        }, 5000);
    }
});
document.getElementById('Restart').addEventListener('click',()=>{
    conttainer.style.display='block';
    resultcontainer.style.display='block';
    quizresult.style.display='none';
    Pre.style.display='inline-block';
    Next.style.display='inline-block';
    sumbit.style.display='none';
    currentQuestionIndex = 0;
    // document.getElementById('mainheading').style.display='inline';
    showQuestion();
});