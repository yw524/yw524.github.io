// A F Debarlaben
// ITMD 541-01 Graduate Student

//Requirement 1 - Change Stellar Marketing which is in the navbar (top left) to Demo ITMD541 
(function() {
    document.querySelector('.text-2xl.font-bold').textContent = "Demo ITMD541";
})();

//Requirement 2 - Change the Image of Sports team which is in "Specialized Marketing Solution" section
(function() {
    const sportsTeamImage = document.querySelector('img[alt="Sports Teams"]');
    if (sportsTeamImage) {
        sportsTeamImage.src = 'https://images.unsplash.com/photo-1505666287802-931dc83948e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhc2tldGJhbGx8ZW58MHx8MHx8fDA%3D';
    }
})();

//Requirement 3 - Change the H1 heading "Elevate Your Brand with Stellar Marketing" to "This is a demo"
(function() {
    document.querySelector('#hero h1').textContent = "This is a Demo heading";
})();
//This file should be named "adebarlaben-lab3.js"