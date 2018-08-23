
/////////ITEM CONTROLLER /////////////////////////////////////////////////////////

var ItemController = (function(){


	//Item Constructor
	var ListItem = function(id, description) {

		this.id = id;
		this.description = description;

	};


	var itemData = [];


	return {

		addItem: function(id, des) {
			var newItem, ID;

			// Adds an incrementing series of ids
			if (itemData.length > 0) {
				ID = (itemData.length - 1 ) + 1;
			} else {
				ID = 0;
			}

			// Creates the new Item object
			newItem = new ListItem(ID, des); // Id is defined here, the description gets assigned to the input at the app controller after we getInput.

			// adds the item to the itemData array
			itemData.push(newItem);

			return newItem;
		},


		deleteItem: function(id) {
			var ids, index;

			// id = 3
			// the following would work if ids were all in order which is not the case
			// data.allItems[type][id];
			// like we saw in the addItem expample  ids = [1 2 4 6 8]
			// we will use map which is similar to foreach  but returns a brand new array
			ids = itemData.map(function(current) {
				return current.id;
			});

			index = ids.indexOf(id);

			if (index !== -1) {
				itemData.splice(index, 1); // splice will remove from index, 1 item
			}



		},


	

		testing: function(){
			console.log(itemData);
		}

	}


})();


///////////     UI CONTROLLER       ///////////////////////////////////////////////////////////////////////////////

var UIController = (function(){

	var DomStrings = {

	inputDescription: '#input-desc',
	inputBtn: '#add__btn',
	listContainer: '.itemlist',
};



return {
		// gets input from input field
		getInput: function() {

			return {
				description: document.querySelector(DomStrings.inputDescription).value
			}

			
		},

		// adds item to the UI
		addListItem: function(obj){
			var html, newHtml, element;

			element = DomStrings.listContainer;
			html = '<div class="item" id="item-%id%"><div class="item__description">%description%</div><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>';

			newHtml = html.replace('%description%', obj.description);
			newHtml = newHtml.replace('%id%', obj.id);

			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


		},

		deleteListItem: function(selectorID) {     // will take the itemID
			var el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
			// blog.garstasio.com/you-dont-need-jquery/dom-manipulation/

		},

	

		clearFields: function() {

			var fields, fieldsArr;

			fields = document.querySelectorAll(DomStrings.inputDescription);

			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current, index, array){
				current.value = "";

			});

			

		},

		getDomStrings: function() {
			return DomStrings;

		},

	}

})();


///////////     APP CONTROLLER          ////////////////////////////////////////////////////////////////////

var controller = (function(ItemCtrl, UICtrl){


	var ctrlAddItem = function(){
			var input, newItem;

		
		// Get the input data
		input = UICtrl.getInput();

		if (input.description !== "") {
		// Add to the Item List
		newItem = ItemCtrl.addItem(input.id, input.description);


		// Display on UI

		UICtrl.addListItem(newItem);
		console.log(newItem);

		// Clear Input Fields
		UICtrl.clearFields();

		}


	};

	var ctrlDeleteItem = function(event) {

		var itemID, splitID, ID;

		
		itemID = event.target.parentNode.parentNode.id;
		console.log(itemID);

		
		// This will check and do the action only when there is an id defined. Due to only having id defined in my list items, it wont delete any other part of the web app
		if(itemID) {

			splitID = itemID.split('-');
			item = splitID[0];
			ID = parseInt(splitID[1]); //converted the string to a number 

			// 1. Delete the item from the data structure
			ItemCtrl.deleteItem();
			// 2. Delete the item from the UI
			UICtrl.deleteListItem(itemID);
		
		}


	};



		

	var setupEventListeners = function() {

		var DOM = UICtrl.getDomStrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
		document.addEventListener('keypress', function(event) {
		//event.which is for older browsers
			if (event.keyCode === 13 || event.which === 13) {
			
			ctrlAddItem();

			}
		});

		document.querySelector(DOM.listContainer).addEventListener('click', ctrlDeleteItem);
	
	};


	return {
		init: function() {
			console.log('App is running');
			setupEventListeners();
		},


	}


})(ItemController, UIController);


controller.init();