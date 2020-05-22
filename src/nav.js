export { initNav }

const home = '<a href="#about" class="nav">Home</a>';
const treatment = '<a href="#treatment" class="nav">Treatment</a>';
const about = '<a href="#aboutme" class="nav">About Dr.Cory</a>';
const payment = '<a href="#payment" class="nav">Payment</a>';
const hours = '<a href="#hours" class="nav">Hours</a>';
const contact = '<a href="#contact" class="nav">Contact Us</a>';
const appointment = '<a href="#appointments" class="nav">Make an Appointment</a>';
const directions = '<a href="#directions" class="nav">Directions</a>';


function initNav(){
    let div = document.createElement("div");
    let nav = home + treatment + about + payment + hours + contact + appointment + directions;
    div.innerHTML = nav;
    div.setAttribute("id", "nav");
    console.log(div);
    let section = document.getElementById("top");
    document.body.insertBefore(div, section);
}