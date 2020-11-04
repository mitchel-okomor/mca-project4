
let allowedEl = document.getElementById('allowed');
let deniedEl = document.getElementById('denied');
let hasFaceMask = false;


//get and save user input
function getInput(){
    
    const name = document.getElementById('name').value;
const age = document.getElementById('age').value;
hasFaceMask = document.getElementById('mask').value;
if(!age || !name){
    alert("please fill all required filled")
    return;
}else{
    const newVisitor = {name, age};
console.log(name + "   "  + age);
save(newVisitor);
allowedEl.innerText = "Allowed Visitors: "+ getAllowedVisitors().length;
deniedEl.innerText = "Denied visitors: " + getDeniedVisitors().length;    
}

}

//save to local storage
function save(visitor){
const visitors = getVisitors();
const allowedVisitors = getAllowedVisitors();
const deniedVisitors = getDeniedVisitors();
console.log(JSON.stringify(visitors) );
visitors.push(visitor );
localStorage.setItem("visitors", JSON.stringify(visitors) );

//check age and mask of visitors
if(visitor.age <12){
    deniedVisitors.push(visitor);
    localStorage.setItem("denied", JSON.stringify(deniedVisitors) );
alert("You must be 12 years or older to enter Dev Mall");
}
else if(visitor.age >= 12 && hasFaceMask == "true"){
    allowedVisitors.push(visitor);
    localStorage.setItem("allowed", JSON.stringify(allowedVisitors) );
 alert("welcome to Dev Mall");
}
else{
    deniedVisitors.push(visitor);
    localStorage.setItem("denied", JSON.stringify(deniedVisitors) );
    alert("You have been denied entry into Dev Mall");

    
}
}

//get from local storage

function getVisitors(){
    const visitors =JSON.parse(localStorage.getItem('visitors')) ;
    
    //check if there are visitors 
if(!visitors  || visitors.length <1){
return [];
}
else{
    return visitors;
}

}


function getAllowedVisitors(){
    const visitors =JSON.parse(localStorage.getItem('allowed')) ;
    //check if there are visitors 
    if(!visitors  || visitors.length <1){
        return [];
        }
        else{
            return visitors;
        }
}

function getDeniedVisitors(){
    const visitors =JSON.parse(localStorage.getItem('denied')) ;
    //check if there are visitors 
    if(!visitors  || visitors.length <1){
        return [];
        }
        else{
            return visitors;
        }
}


function clearCounter(){
    localStorage.removeItem('visitors');
    localStorage.removeItem('allowed');
    localStorage.removeItem('denied');
window.location.reload();
}

//load javascript when windows start
(function(){
    allowedEl.innerText ="Allowed visitors: "+ getAllowedVisitors().length;
    deniedEl.innerText = "Denied visitors: " + getDeniedVisitors().length;
    console.log("visitors:"+ getVisitors());
    ;
})(); 

