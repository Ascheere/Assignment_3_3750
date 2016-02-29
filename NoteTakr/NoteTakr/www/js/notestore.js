/*
Notes Service
*/
angular.module('NoteTakr.notestore', [])
	.factory('NoteStore', function() {

	//Initialize notes array to what is in local storage, else empty array
	var notes = angular.fromJson(window.localStorage['notes'] || '[]'); 

	//Save current notes array to local storage
	function persist() {
		window.localStorage['notes'] = angular.toJson(notes);
	}

	return {

		//List our notes
	    list: function() {
	      return notes;
	    },

	    //Get the object for corresponding nodeId
	    get: function(noteId) {
	      for (var i = 0; i < notes.length; i++) {
	        if (notes[i].id === noteId) {
	          return notes[i];
	        }
	      }
	      return undefined;
	    },

	    //Append the passed note to the notes array then save it to the local storage
	    create: function(note) {
	      notes.push(note);
	      persist();
	    },

	    //Write the passed in note to the note in notes array with corresponding noteId then save
	    update: function(note) {
	      for (var i = 0; i < notes.length; i++) {
	        if (notes[i].id === note.id) {
	          notes[i] = note;
	          persist();
	          return;
	        }
	      }
	      return undefined;      
	    },

	    //Splice the passed note moving it from the fromIndex in the array to the toIndex in the array
	    //The note at the toIndex as well as all indexes before it are shifted forward 1
	    move: function(note, fromIndex, toIndex) {
	    	notes.splice(fromIndex, 1);
	    	notes.splice(toIndex, 0, note);
	    	persist();
	    },

	    //Find the note with the corresponding noteId and remove it then save
	    remove: function(noteId) {
	      for (var i = 0; i < notes.length; i++) {
	        if (notes[i].id === noteId) {
	        	notes.splice(i, 1);
	        	persist();
	        	return;
	        }
	      }
	    }

	};

});