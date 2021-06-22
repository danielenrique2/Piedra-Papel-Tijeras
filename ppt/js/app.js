document.addEventListener('DOMContentLoaded', function () {

	let items = ["icon-rock", "icon-paper", "icon-scissors"];
	let colors = [
		"hsl(349, 70%, 56%)|inset 0px -10px 0px 0px #a9243c, 0px 0px 1px 1px #13213a",
		"hsl(230, 89%, 65%)|inset 0px -10px 0px 0px hsl(230, 58%, 48%), 0px 0px 1px 1px #13213a",
		"hsl(40, 84%, 53%)|inset 0px -10px 0px 0px hsl(39, 86%, 42%), 0px 0px 1px 1px #13213a"
	];

	const rulesBox = document.getElementById("rules-box");
    const closeBtn = document.getElementById("close-btn");
    const closeBtnSm = document.getElementById("close-btn-sm");
    const gameBox = document.getElementById("game");
    const itemsBox = document.getElementById("picker");
    const rulesBtn = document.getElementById("rules-btn");
    const resultBox = document.getElementById("result");
    const resultOutput = document.getElementById("result-output");
    const playAgain = document.getElementById("play-again");
    const scoreBox = document.getElementById("score");
    var score = 0;

    closeBtn.addEventListener("click", function(){
    	rulesBox.classList.remove("zoomIn");
    	rulesBox.classList.add("zoomOut");

    	setTimeout(function(){
    		rulesBox.parentElement.style.background = "rgba(0,0,0,0)";
    		gameBox.style.zIndex = "2";
    	},300);

    })

    closeBtnSm.addEventListener("click", function(){
    	rulesBox.classList.remove("zoomIn");
    	rulesBox.classList.add("zoomOut");

    	setTimeout(function(){
    		rulesBox.parentElement.style.background = "rgba(0,0,0,0)";
    		gameBox.style.zIndex = "2";
    	},300);

    })

    rulesBtn.addEventListener("click", function(){
    	rulesBox.parentElement.style.background = "rgba(0,0,0,.4)";

    	setTimeout(function(){
    		rulesBox.classList.add("zoomIn");
    		gameBox.style.zIndex = "0";
    	},300);
    })

    playAgain.addEventListener("click", function(){
    	itemsBox.style.display = 'block';
		resultBox.style.display = 'none';
		resultOutput.style.display = 'none';
    })


   	// Agregando los botones
    for(i=0; i<items.length; i++){
    	let html = `
    		<div class="item" data-item="${items[i]}" style="box-shadow: ${colors[i].split("|")[1]}; background-color: ${colors[i].split("|")[0]}">
    			<div class="item-image" style="background-image: url(img/${items[i]}.svg)"></div>
    		</div>
    	`;
    	itemsBox.insertAdjacentHTML('beforeend', html);
    }

    const buttons = document.getElementsByClassName("item");
    const userPicked = document.getElementById("user-picked");
    const housePicked = document.getElementById("house-picked");

    // console.log(userPicked.querySelector('.picked-item'))

    for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function(){
			let dataItem = this.dataset.item
			let itemIndex = items.indexOf(dataItem);
			let bgColor = window.getComputedStyle(this).backgroundColor;

			userPicked.querySelector('.picked-image').style.backgroundImage = "url('img/"+items[itemIndex]+".svg')";
			userPicked.querySelector('.picked-item').style.boxShadow = colors[itemIndex].split("|")[1];
			userPicked.querySelector('.picked-item').style.backgroundColor = bgColor;
			userPicked.querySelector('.picked-item').dataset.item = dataItem;

			const housePickedOption = getHouseOption();

			itemsBox.style.display = 'none';
			resultBox.style.display = 'flex';

			let pickingImage = setInterval(function(){
				const runPicker = getHouseOption();
				housePicked.querySelector('.picked-image').style.backgroundImage = "url('img/"+runPicker+".svg')";
				housePicked.querySelector('.picked-item').style.boxShadow = colors[items.indexOf(runPicker)].split("|")[1];
				housePicked.querySelector('.picked-item').style.backgroundColor = colors[items.indexOf(runPicker)].split("|")[0];
				housePicked.querySelector('.picked-item').dataset.item = runPicker;
			},100)

			setTimeout(function(){
				clearInterval(pickingImage);
				resultOutput.style.display = "flex";

				const user = userPicked.querySelector('.picked-item').dataset.item;
				const house = housePicked.querySelector('.picked-item').dataset.item;

				if(user == house){

					resultOutput.querySelector('span').innerHTML = "YOU TIED";

				}else if(user == "icon-rock"){

					if(house === "icon-paper"){
						resultOutput.querySelector('span').innerHTML = "YOU LOSE";
						score--;
					}  
					
					if(house === "icon-scissors"){
						resultOutput.querySelector('span').innerHTML = "YOU WIN"; 
						score++;
					} 

				}else if(user == "icon-paper"){

					if(house === "icon-rock"){
						resultOutput.querySelector('span').innerHTML = "YOU WIN"; 
						score++;
					} 
					if(house === "icon-scissors"){
						resultOutput.querySelector('span').innerHTML = "YOU LOSE"; 
						score--;
					} 

				}else if(user == "icon-scissors"){

					if(house === "icon-rock"){
						resultOutput.querySelector('span').innerHTML = "YOU LOSE"; 
						score--;
					} 

					if(house === "icon-paper"){
						resultOutput.querySelector('span').innerHTML = "YOU WIN"; 
						score++;
					}

				}

				scoreBox.querySelector("span:last-child").innerHTML = score;
			},2000)



		});
	}

	function getHouseOption(){
		const houseOption = Math.floor(Math.random() * 3);
		return items[houseOption];
	}		

	if(window.innerWidth <= 980){
		resultBox.appendChild(resultOutput)
	}

	window.addEventListener('resize', function(event) {
    	if(window.innerWidth <= 980){
			resultBox.appendChild(resultOutput)
		}
	}, true);
});


