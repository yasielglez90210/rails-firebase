/**
 * Created by ELREY on 17/12/2017.
 */


$(document).ready(function () {

    $('#formServices').submit(function (event) {
        event.preventDefault();
        var $name = $('#name');
        var $description = $('#description');
        var $email = $('#email');

        var database = firebase.database().ref().child('services');
            database.set({name: prueba, description: $description, email: $email});
      
    });
});


