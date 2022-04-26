let add = document.querySelector(".add");
let flag = false; // for the state(display) of template 
let template = document.querySelector(".template");
let main = document.querySelector(".main");
let textarea = document.querySelector("textarea");
let priocolor = document.querySelectorAll(".plist");
let allcolors = ["lightgreen","lightblue","black","yellow"];
let colorchoicelist = document.querySelectorAll(".colorChoice");
let defaultC = "black";
let mychoice = defaultC;
let removeBordermychoice=[];//array of classlist of the colorchoice
let delet = document.querySelector(".delete");
let lockflag = false;
let removeFlag = false;


//when plus is clicked to open the template and close it when pressed again
add.addEventListener("click",(e)=>{ 
    if(flag === false){
        flag=true;
        template.style.display="flex";
    }
    else{
        flag = false;
        template.style.display="none";
    }
})

delet.addEventListener("click",(e)=>{ 
    removeFlag=!removeFlag;
})

template.addEventListener("keydown",(e)=>{
    let press = e.key;
    if(press === "Shift"){
        createTicket(mychoice,textarea.value,shortid());
        flag=false;
        textarea.value=""; //for new text area to be empty
        template.style.display="none";//remove the template
        mychoice=defaultC; //giving default to my choice of color
        removeBordermychoice.remove("border"); // remove border from the color choosen
        priocolor[2].classList.add("border"); //add border to the default color 
    }
});

priocolor.forEach((color)=>{
    color.addEventListener("click",(e)=>{
        priocolor.forEach((pc)=>{
            pc.classList.remove("border");//remove border from default 
        })
        mychoice=e.target.classList[1]; //color of my choice
        removeBordermychoice=e.target.classList; //take the classlist of target element
        e.target.classList.add("border"); //add border to the target element
    });
});


function createTicket(colorchoice,mycontent,uid){
    let ticket = document.createElement("div");
    ticket.setAttribute("class","ticket");
    ticket.innerHTML=`
    <div class="pcolor ${colorchoice}"></div>
    <div class="ticketid">${uid}</div>
    <div class="mycontent">${mycontent}</div>
    <div class="lock"><i class="fas fa-lock"></i></div>`
    main.appendChild(ticket);

    removeTicket(ticket);
    removeLock(ticket);
    togglecolor(ticket);
}

function removeTicket(ticket) {
    ticket.addEventListener("click",()=>{
        if(removeFlag){
        main.removeChild(ticket);
    }
    })
}

function removeLock(ticket){
    let lockstatus = ticket.children[3];
    let mycontentarea = ticket.children[2];
    lockstatus.addEventListener('click',()=>{
        lockflag=!lockflag;
        if(lockflag){
            lockstatus.innerHTML="";
            lockstatus.innerHTML=`<i class="fas fa-lock-open"></i>`;
            lockstatus.style.color="gray";
            mycontentarea.setAttribute("contenteditable",true);
            mycontentarea.setAttribute("spellcheck",false);
        }
        else{
            lockstatus.innerHTML="";
            lockstatus.innerHTML=`<i class="fas fa-lock"></i>`
            lockstatus.style.color="black";
            mycontentarea.setAttribute("contenteditable",false);
        }

    })
}

function togglecolor(ticket) {
    let currentcolorlist = ticket.children[0];

    currentcolorlist.addEventListener("click",(e)=>{
        let currentcolor = currentcolorlist.classList[1];
        let currindex = allcolors.indexOf(currentcolor);
        let nextcolorindex = (currindex+1)%4;
        currentcolorlist.classList.remove(allcolors[currindex]);
        currentcolorlist.classList.add(allcolors[nextcolorindex]);
    })
}

//dblclick does not work in many browsers
colorchoicelist.forEach((color)=>{
    let clicks = 0;
    let timer;
    color.addEventListener("click",(e)=>{
        clicks++;
        if(clicks === 1){
             timer = setTimeout(function(){
                clicks=0;
                sortbycolor(color.classList[1]);   
            },400) //if the second click does not occur befor 0.4 sec click one will be executed
        }
        else {
            clearTimeout(timer);
            clicks=0;
            originalMain();
        }
        
    })
})

function sortbycolor(mycolor) {
    let mainele = main.children;
    for(let i=0;i<mainele.length;i++){
       let k = mainele[i];
       if(k.children[0].classList[1] != mycolor){
           k.style.display="none";
       }
    }
}

function originalMain(){
    console.log(main.children.length);
    let mainele = main.children;
    for(let i=0;i<mainele.length;i++){
       let k = mainele[i];
       k.style.display="block";
    }
}

