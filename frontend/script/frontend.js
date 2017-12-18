mixerAuth();

var container = document.getElementById('container');
var containerBottom = document.getElementById('container-frame-bottom');
var containerTop = document.getElementById('container-frame-top');
var containerLeft = document.getElementById('container-frame-left');
var containerRight = document.getElementById('container-frame-right');

var containerViewRight = document.getElementById("container-view-right");
var containerViewRightButtons = document.getElementById('top-buttons')
var containerViewLeft = document.getElementById("container-view-left");
var containerViewBottom = document.getElementById("container-view-bottom");
var containerViewCenter = document.getElementById("container-view-center");

var communityGoalImage = document.getElementById('community-goal-image');
var communityNameDiv   = document.getElementById('community-name');
var communitySelector = document.getElementById('community-selector');
var communityImageCSS = "view-center-image-bmt";
communitySelector.addEventListener('change', function(e){
    // <option>Select Community</option>
    // <option value="1">BALANCED</option>
    // <option value="2">Direwolf20</option>
    // <option value="3">TangoTek</option>
    // <option value="4">ImpulseSV</option>
    // <option value="5">GhostfromTexas</option>
    if(communitySelector.value == "1"){
        containerViewCenter.className = "view-center view-center-image-bmt expand";
        communityImageCSS = "view-center-image-bmt";
        communityGoalImage.className = 'view-right-field-top-image ' + communityImageCSS;
        communityNameDiv.innerHTML = "balanced";
    } 
    else if(communitySelector.value == "2"){
        containerViewCenter.className = "view-center view-center-image-dire expand";
        communityImageCSS = "view-center-image-dire";
        communityGoalImage.className = 'view-right-field-top-image ' + communityImageCSS;
        communityNameDiv.innerHTML = "Direwolf20";
    }
    else if(communitySelector.value == "3"){
        containerViewCenter.className = "view-center view-center-image-tangotek expand";
        communityImageCSS = "view-center-image-tangotek";
        communityGoalImage.className = 'view-right-field-top-image ' + communityImageCSS;
        communityNameDiv.innerHTML = "tango tek";
    }
    else if(communitySelector.value == "4"){
        containerViewCenter.className = "view-center view-center-image-impulse expand";
        communityImageCSS = "view-center-image-impulse";
        communityGoalImage.className = 'view-right-field-top-image ' + communityImageCSS;
        communityNameDiv.innerHTML = "ImpulseSV";
    }
    else if(communitySelector.value == "5"){
        containerViewCenter.className = "view-center view-center-image-ghost expand";
        communityImageCSS = "view-center-image-ghost";
        communityGoalImage.className = 'view-right-field-top-image ' + communityImageCSS;
        communityNameDiv.innerHTML = "GhostfromTexas";
    }
    else {
        containerViewCenter.className = "view-center view-center-image-bmt expand";
        communityImageCSS = "view-center-image-bmt";
        communityGoalImage.className = 'view-right-field-top-image ' + communityImageCSS;
        communityNameDiv.innerHTML = "balanced";
    }
}, false);

var loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', function(e){
    if(!mixerUser || !mixerUser.username ){
        mixerAuth();
    }
    else{
        console.log("Logged in as: " + mixerUser.username);
    }
})

var audio = new Audio('audio/click.ogg');
var mute = document.getElementById('mute');
var muted = false;

mute.onchange = function(e){
    if(mute.checked){
        muted = true;
    }
    else
        muted = false;
}
var playClick = function(){
    if(!muted){
        audio.play();
    }
}


var state = "close";
container.classList.add('close');

var closeContainer = function(e){
    
    e.stopPropagation();
    if(state != "close"){
        state = "close";
        playClick();
        container.className = "container close"
        containerViewRight.className = 'view-right hide';
        //containerViewRightButtons.className = 'view-right-top-buttons-container hide';
        containerViewLeft.className = 'view-left hide';
        containerViewBottom.className = 'view-bottom hide';
        containerViewCenter.className = 'view-center ' + communityImageCSS + ' close';
    }

}
containerViewCenter.onclick = closeContainer;


containerRight.onclick = function(e){
    playClick();
    e.stopPropagation();
    if(state != "close"){
        closeContainer(e); 
    }
    else{
        state = "open";
        containerTop.style.left = 0;
        containerTop.style.right = "";

        containerBottom.style.left = 0;
        containerBottom.style.right = "";

        containerViewRight.classList.remove('hide');
        containerViewRight.classList.add('expand');
        
        container.classList.add('expandRight');
        container.classList.remove('close');

        // containerViewRightButtons.classList.add('expand');
        // containerViewRightButtons.classList.remove('hide');

    }
}
container.addEventListener('transitionend', function(e){
    e.stopImmediatePropagation();
    if(e.eventPhase == 3){
        console.log ("transition ended");
        console.log("Target: " + e.currentTarget.className);

        //if(e.currentTarget.className)
    }
    
});

containerLeft.onclick = function(e){
    playClick();
    e.stopPropagation();
    if(state != "close"){
        closeContainer(e); 
    }
    else{
        state = "open";
        containerTop.style.right = 0;
        containerTop.style.left = "";

        containerBottom.style.right = 0;
        containerBottom.style.left = "";

        containerViewLeft.classList.remove('hide');
        containerViewLeft.classList.add('expand');

        containerViewCenter.classList.add('expand');

        container.classList.add('expandLeft');
        container.classList.remove('close');
    }
}


containerBottom.onclick = function(e){
    playClick();
    e.stopPropagation();
    if(state != "close"){
        closeContainer(e); 
    }
    else{
        state = "bottom";

        containerViewBottom.classList.remove('hide');
        containerViewBottom.classList.add('expand');


        container.classList.add('expandBottom');
        container.classList.remove('close');
    }
}


containerTop.onclick = function(e){
    playClick();
    e.stopPropagation();
    if(state != "close"){
        closeContainer(e); 
    }
    else{
        state = "top";
        container.classList.add('expandTop');
        container.classList.remove('close');
    }
}