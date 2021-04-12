
document.body.onload = function() {
	setTimeout( () => {
		let preloader = document.getElementById('preloader');
		let preBox = document.getElementById('preloaderBox')
		let preIcon = document.getElementById('preloaderIcon');
		let preTitle = document.getElementById('preloaderTitle');
		let preKeep = document.getElementById('preloaderKeep');
		if( !preloader.classList.contains('done') ) {
			preTitle.classList.add('active');
			preIcon.classList.add('active');
			preKeep.classList.add('active');
			preBox.classList.add('active');
			setTimeout( () => {
				preloader.classList.add('done');
				let lists = document.querySelectorAll('.header__list li');
				document.querySelector('.header__enter').classList.add("animated");
				document.querySelector('.head__disc').classList.add('animated');
				document.querySelector('.head__about').classList.add('animated');
				document.querySelector('.head__link').classList.add('animated');
				document.querySelector('.head__image').classList.add("animated");
				document.querySelector('.head').classList.add('animated');
				document.querySelector('.head__backgr').classList.add('animated');
				document.querySelectorAll('.head__subtitle div').forEach(doc => {
					doc.classList.add('animated')
				});
				lists.forEach(listing => {
					listing.classList.add('animated');
				})
			
			}, 2450)
			
		}
	}, 1000)
}


// burger menu

let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.header__mobile');
burger.onclick = function() {
	burger.classList.toggle('opened');
	menu.classList.toggle('opened');
	document.body.classList.toggle("locked");
}

// Header Hide and Reveal

let prevScrollpos = window.pageYOffset;
let header = document.getElementById("header");
window.addEventListener('scroll', function() {
  let currentScrollPos = window.pageYOffset;
  if(currentScrollPos > 50) {
  	if (prevScrollpos > currentScrollPos) {
	  // header.style.top = "-45px";
	  header.classList.remove('hidden');
	  header.classList.remove('fixed');
	  header.classList.add('moved')
	} else {
	//  header.style.top = "-130px";
	  header.classList.remove('moved');
	  header.classList.remove('fixed');
	  header.classList.add('hidden')
	}
	prevScrollpos = currentScrollPos;
  } else {
	  if (prevScrollpos > currentScrollPos) {
	    header.classList.remove('moved');
	    header.classList.remove('hidden');
	    header.classList.add('fixed');
	  } else {
	  //  header.style.top = "-130px";
	    header.classList.remove('moved');
	    header.classList.remove('fixed');
	    header.classList.add('hidden')
	  }
	  prevScrollpos = currentScrollPos;
  }
});

let hashSelect = document.querySelector('.trade__hash-choose');
let hashSelectIcon = document.querySelector('.trade__hash-icon');
let hashList = document.querySelector('.trade__list')
hashSelect.onclick = function() {
	hashList.classList.toggle('opened');
}
hashSelectIcon.onclick = function() {
	hashList.classList.toggle('opened');
}

let hashValues = document.querySelectorAll('.trade__list li');
hashValues.forEach( value => {
	value.onclick = function() {
		hashValues.forEach( hash => {
			hash.classList.remove('selected');
		});
		value.classList.add('selected');
		hashSelect.innerHTML = value.innerHTML;
		hashList.classList.remove('opened');
	}
})


function calculateHash() {
	let total = 35000;
	let chosen = hashSelect.innerHTML;
	let hash = null;
	if(chosen == 'TH/s') {
		hash = (hashInput.value)*1000000000 // 1 Billion
	} else if(chosen == 'GH/s') {
		hash = (hashInput.value)*1000000 // 1 Million
	} else if(chosen == 'MH/s') {
		hash = (hashInput.value)*1000 
	} else {
		hash = hashInput.value;
	}
	return((hash)/total);
}

let hashButton = document.getElementById('hashButton');
let calcResult = document.querySelector('.trade__subtitle h3');
let hashErrored = document.querySelector('.trade__errored');

function validateCalc(num) {
	if(num == 0 || num > 9999999 || isNaN(num)) {
		hashButton.style.animation = 'shake-horizontal 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both';
		hashInput.style.borderBottom = '1px solid #f55d5d';
		if(num == 0 || isNaN(num)) {
			hashErrored.innerHTML = "Wrong Input..."
		} else {
			hashErrored.innerHTML = "That's too much!"
		}
		hashErrored.classList.add('errors')
		hashInput.oninput = () => {
			hashInput.style.borderBottom = '1px solid #e0e0e0';
			hashErrored.classList.remove('errors');
		}
		setTimeout( () => {
			hashButton.style.animation = 'none';
		}, 800);
		return false;
	}
	return true;
}

hashButton.onclick = function() {
	let result = calculateHash(); 
	let validaten = validateCalc(result);
	if(validaten === true) {
		calcResult.innerHTML = result.toFixed(8) + ` ETH <span>(${(result*2000).toFixed(2)}$)</span>`;
		hashInput.style.borderBottom = '1px solid #e0e0e0';
		hashErrored.classList.add('errored');
	} else {
		return
	}
}	

let backCircle = document.querySelector('.features__backcircle');
let botCircle = document.querySelector('.features__backcircle-bot');
window.addEventListener('mousemove', function(e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;  
    backCircle.style.transform = 'translate(-' + x * 25 + 'px, -' + y * 27 + 'px) rotate(90deg)';
    botCircle.style.transform = 'translate(' + x * 22 + 'px, ' + y * 23 + 'px) rotate(-120deg)';
});





let emailButton = document.getElementById('emailButton');
let emailInput = document.getElementById('emailInput');

emailInput.onkeypress = function(evt) {
	if(evt.keyCode == 13) {
		evt.preventDefault();
	}
}

function validateEmail(str) {

	if( str.length < 6 || !str.includes('@') || !str.includes('.') || str.endsWith('.') || str.endsWith('@') || str[str.indexOf('@') + 1] == '.') {
		if(str.length == 0) {
			return {
				valid: false,
				isEmpty: true
			}
		} else {
			return {
				valid: false,
				isEmpty: false,
			}
		}
	}
	return { valid: true };
}

let emailError = document.getElementById('emailError');
let emailCont = document.getElementById('emailCont');
let popup = document.getElementById('popup');

emailButton.onclick = function(evt) {
	let result = validateEmail(emailInput.value);
	if (result.valid === false && result.isEmpty === true ) {
		emailError.innerHTML = 'Enter something...';
		emailError.classList.add('shown');
		emailCont.style.animation = 'shake-horizontal 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both';
		setTimeout( () => {
			emailCont.style.animation = 'none';
		}, 800);
	} else if (result.valid === false && result.isEmpty === false ) {
		emailError.innerHTML = 'Wrong email format!';
		emailError.classList.add('shown');
		emailCont.style.animation = 'shake-horizontal 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both';
		setTimeout( () => {
			emailCont.style.animation = 'none';
		}, 800);
	} else {
		evt.preventDefault();
		emailError.classList.remove('shown');
		popup.classList.add('visible');
		emailInput.value = '';
		setTimeout( () => {
			document.onclick =  function(e) {
			    if ( e.target.className != 'popup__content' ) {
			        popup.classList.remove('visible');
			        document.onclick = () => {};
			    };
			}
		}, 100)
	}
}



let closePop = document.querySelector('.popup__close');

closePop.onclick = function(evt) {
	evt.preventDefault();
	popup.classList.remove('visible');
}

// Custom cursor

let cursor = document.querySelector('.cursor')

document.body.addEventListener('mousemove', function(e) {
	cursor.style.left = `${e.clientX}px`;
	cursor.style.top = `${e.clientY}px`
	//cursor.style.transform = `translate(${e.clientX-10}px, ${e.clientY-10}px)`;
})

let interactives = document.querySelectorAll('.hover');

interactives.forEach(elem => {
	elem.addEventListener('mouseover', () => {
		cursor.classList.add('active');
	})
	elem.addEventListener('mouseout', () => {
		cursor.classList.remove('active');
	})
})



// Observer of counter

const counter = function(id, count, max) {
	let counted = 1;
	let block = document.getElementById(`${id}`);
	let interval = setInterval(inCounter, 10);

	function inCounter() {
		counted += count;
		block.innerHTML = counted.toFixed();
		console.log(counted);
		if( counted > max ) {
			console.log('SU,,m');
			clearInterval( interval );
			block.innerHTML = `${max}`;
		}
	}

		
};

let tick = false;
function onEntry(entry) {
	entry.forEach(change => {
		if(tick == false) {
			if(change.isIntersecting) {
				counter('currency',0.2,30);
				counter('millions',0.06,10); 
				counter('countries',1,195);
				tick = true;
			};
		}
	});
};
let options = {
	threshold: [1]
};
let observer = new IntersectionObserver(onEntry, options);
let element = document.querySelector('.choose__row');
observer.observe(element);

// Observe for animations
function onVisible(entry) {
	entry.forEach(change => {
		if (change.isIntersecting) {
			setTimeout(change.target.classList.add('visible'), 5);				
		};
	});
};
let settings = {
	threshold: [0.3] };
let animater = new IntersectionObserver(onVisible, settings);
let elements = document.querySelectorAll('.transit');

for (let elm of elements) {
	animater.observe(elm);
};

const anchors = document.querySelectorAll('a[href*="#"]');
for(let anchor of anchors) {
	anchor.addEventListener('click', function(event) {
		event.preventDefault();
		const blockID = anchor.getAttribute('href');
		document.querySelector('' + blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	})
}


let mobileClosures = document.querySelectorAll('.mobileClosures');
mobileClosures.forEach(item => {
	item.onclick = function() {
		burger.classList.remove('opened');
		menu.classList.remove('opened');
		document.body.classList.remove('locked')
	}
})