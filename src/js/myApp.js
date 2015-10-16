(function(){

	// navigation	
	if(document.querySelector('#js-accueil') != null){

		var el = document.querySelector('.nav-accueil');
		el.classList.add('nav-accueil--active');
	}
	else if(document.querySelector('#js-prevention') != null){

		el = document.querySelector('.nav-prevention');
		el.classList.add('nav-prevention--active');
	}
	else if(document.querySelector('#js-recherche') != null){

		el = document.querySelector('.nav-recherche');
		el.classList.add('nav-recherche--active');
	}
	else if(document.querySelector('#js-formation') != null){

		el = document.querySelector('.nav-formation');
		el.classList.add('nav-formation--active');
	} 
	else if(document.querySelector('#js-quiSommesNous') != null){

		el = document.querySelector('.nav-quiSommesNous');
		el.classList.add('nav-quiSommesNous--active');
	}
	
	document.querySelector('.navIcon').addEventListener('click', function(e){
		
		el = document.querySelector('.nav');
		el.classList.toggle('nav--hidden');
		el.classList.toggle('nav--block');
		
		el = document.querySelector('.navIcon');
		el.classList.toggle('is-opened');
		
		// el = document.querySelector('.navIcon-container');
		// el.classList.toggle('navIcon-container--hide');
	});
})();