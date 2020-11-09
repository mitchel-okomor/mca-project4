
let allowedEl = document.getElementById('allowed');
let deniedEl = document.getElementById('denied');
let hasFaceMaskEl = document.getElementById('mask');
let nameEl = document.getElementById('name');
let ageEl = document.getElementById('age');
let hasFaceMask = "true";


//get and save user input
function getInput(){
  
let name = nameEl.value;
let age = ageEl.value;
let genderEl = document.querySelector('input[name = gender]:checked');
 hasFaceMask = hasFaceMaskEl.value;
let gender = genderEl.value;
let id = randomID();

//
if(!age || !name){
    alert("please fill all required filled")
    return;
}else{

    //create visitoe object
    const newVisitor = {id, name, age, hasFaceMask, gender};
save(newVisitor);
allowedEl.innerText = "Allowed Visitors: "+ getAllowedVisitors().length;
deniedEl.innerText = "Denied visitors: " + getDeniedVisitors().length;    
}

//reset the input
nameEl.value = '';
ageEl.value ='';

viewAllVisitors();
}

//save to local storage
function save(visitor){
const visitors = getVisitors();
const allowedVisitors = getAllowedVisitors();
const deniedVisitors = getDeniedVisitors();
visitors.push(visitor );
localStorage.setItem("visitors", JSON.stringify(visitors) );

//check age and face mask status of visitors
if(visitor.age <12){
    deniedVisitors.push(visitor);
    localStorage.setItem("denied", JSON.stringify(deniedVisitors) );
alert("Hello, "+ visitor.name + ", You must be 12 years or older to enter Dev Mall");
}
else if(visitor.age >= 12 && hasFaceMask == "true"){
    allowedVisitors.push(visitor);
    localStorage.setItem("allowed", JSON.stringify(allowedVisitors) );
 alert("Hello, "+ visitor.name + ", welcome to Dev Mall");
}
else{
    deniedVisitors.push(visitor);
    localStorage.setItem("denied", JSON.stringify(deniedVisitors) );
    alert("Hello, "+ visitor.name + ", you have been denied entry into Dev Mall");

    
}
}

//get visitors from local storage
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

//get allowed from local storage
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


//get denied visitors from localstorage
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


//view visitors
function viewAllVisitors(){
    const data = getVisitors();
    const vElement = document.getElementById('all-visitors');
 const view =   data.map((item)=>{

//check if a visitor is in the allowed array
     let visitorInAllowed = getAllowedVisitors().find((val)=>{
         return val.id ===item.id;
        });
let access =  visitorInAllowed? "Allowed": "Denied";

return ` 
<tr>
<td>${item.name}</td>
<td>${item.age}</td>
<td>${item.gender}</td>
<td>${item.hasFaceMask === "true"? "Yes" : "No"}</td>
<td>${access}</td>
</tr>`;

    })
    vElement.innerHTML=`  <tr>
    <th>NAME</th>
    <th>AGE</th>
    <th>GENDER</th>
    <th>HAS FACE MASK</th>
    <th>ACCESS</th>
    </tr>`+ view.join('\n');
}

//generate a random id
function randomID() {
    var letters = '0123456789ABCDEF';
    var id = 'A';
    for (var i = 0; i < 9; i++) {
      id += letters[Math.floor(Math.random() * 16)];
    }
    return id;
  }

//load javascript when windows start
(function(){
    allowedEl.innerText ="Allowed visitors: "+ getAllowedVisitors().length;
    deniedEl.innerText = "Denied visitors: " + getDeniedVisitors().length;    ;
})(); 

