/**
 * Created by ELREY on 17/12/2017.
 */
var services = firebase.database().ref().child('services').set(null);
var database = firebase.database().ref().child('services'); 
var $form = $('#formServices')[0];
var $serviceKey = [];
var datatable = $('#services').DataTable();

$(document).ready(function () {  
    allServices();  
  
    $('#formServices').submit(function (event) {
        event.preventDefault();
        var $name = $('#name').val();
        var $description = $('#description').val();
        var $email = $('#email').val();

      addService($name, $description, $email);   
    });
});

function addService(name, description, email) {
  database.push({name: name, description: description, email: email});
  $form.reset();
}

function deleteService(button) {
  var id = $(button).attr("data-delete");
  var service = database.child(id).remove();
  datatable.row($(button).parent().parent()).remove().draw(false);
}

function allServices(){
  database.on("child_added", function (snapshot) {
    var temp = [snapshot.val().name, snapshot.val().description, snapshot.val().email, null];
    var tr = '<tr role="row"><td>' + snapshot.val().name + '</td><td>' + snapshot.val().description + '</td><td>' + snapshot.val().email + '</td><td><button onClick="deleteService(this)" type="button" data-delete="' + snapshot.key + '" style="cursor: pointer;" class="btn btn-danger btn-sm"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>';
    datatable.row.add($(tr)).draw();
  });
}
