/**
 * Created by ELREY on 17/12/2017.
 */
var $id = 1;
var services = firebase.database().ref().child('services').set(null);
var database = firebase.database().ref().child('services/service'+$id); 
var $form = $('#formServices')[0];
var datatable = $('#services').DataTable( {
        data: [],
        columns: [
            { title: "Nombre" },
            { title: "Descipción" },
            { title: "Correo" },    
            { title: "Acciones" },    
        ],
  
        "columnDefs": [ {
            "targets": -1,
            "data": null,
            "defaultContent": '<button type="button" class="btn btn-danger btn-sm"><i class="fa fa-trash-o" aria-hidden="true"></i></button>'
        } ]
    } );

$(document).ready(function () {  
    allServices();  
  
    $('#formServices').submit(function (event) {
        event.preventDefault();
        var $name = $('#name').val();
        var $description = $('#description').val();
        var $email = $('#email').val();

      addServices($name, $description, $email);   
    });
});

function addServices(name, description, email) {
  database.set({name: name, description: description, email: email});
  $id = $id + 1;
  $form.reset();
  database = firebase.database().ref().child('services/service'+$id); 
}

function allServices(){
  services = firebase.database().ref('/services'); 
  services.on('value', function(snapshot){    
  var dataset = snapshotToArray(snapshot);    
    datatable.clear();
    datatable.rows.add(dataset);
    datatable.draw();
  });
}

function snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        var temp = [item.name, item.description, item.email, childSnapshot.key];
        returnArr.push(temp);
    });

    return returnArr;
}


