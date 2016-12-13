/*
 * Ouverture/fermeture de la modal
 */
//>Ouverture de la modal
	elementsOpen = document.querySelectorAll('.modal-button');
	var index = 0;
	for( index=0; index < elementsOpen.length; index++ ) {
		elementsOpen[index].addEventListener('click', function (event) {
			event.preventDefault();
			var target = this.getAttribute("data-target");
			document.getElementById(target).classList.add('is-active');
			return false;
		} );
	}

//>Fermeture de la modal
	var elementsClose = document.querySelectorAll('.modal-background, .modal-close, .modal-close-inner');
	var index = 0;
	for( index=0; index < elementsClose.length; index++ ) {
			//console.log(navButtons_A[index]);
			elementsClose[index].addEventListener('click', function (event) {
		//event.target.innerHTML = "click count: " + event.detail;
		//console.log(event);
		//console.log(this);
		//console.log(this.parentNode);
		var modalE;
		if (this.classList.contains("modal-close-inner")){
			modalEl = this.parentNode.parentNode.parentNode;
		}
		else{
			modalEl = this.parentNode;
		}

		modalEl.classList.remove('is-active');
					return false;
			} );
	}