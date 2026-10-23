console.log('Happy developing ✨')
const input = document.getElementById("input");
const answer = document.getElementById("answer");
const stored = sessionStorage.getItem("stored");
if(stored){
    equations = JSON.parse(stored);
}
else{
    equations = [stored];
    sessionStorage.setItem("stored", JSON.stringify(stored));
}