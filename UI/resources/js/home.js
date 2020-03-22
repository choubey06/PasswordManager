$(document).ready(function(){
    var data=null;
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/home",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            var passwords='';
            $.each(data,function(key,value){
                passwords+='<tr>'+
                '<td width="5%" class="center">'+
                        '<form>'+
                            '<input type="checkbox" value='+key+'name="websites">'+
                        '</form>'+
                    '</td>'+
                    '<td width="20%">'+key+'</td>'+
                    '<td><div id='+key+'>'+value+'</div></td>'+
                    '</td>'+
                    '</tr>'
            });
            $("#savedPasswords").append(passwords);
        },

        error: function (jqXHR, status) {
            // error handler
            console.log(jqXHR);
            alert("Problem fetching saved passwords! :(");
        }
     });
});
function generateNewPassword() {
    var url = "generatePassword.html";
    $(location).attr('href', url);
};
function toggle(source) {
    checkboxes = document.getElementsByName("websites");
    for(var i=0, n=checkboxes.length;i<n;i++) {
      checkboxes[i].checked = source.checked;
    }
  }
function editPassword(){
    var checked = 0;
    var checkedWebsite;
    $.each($("input[name='websites']:checked"), function(){
        checked++;
        checkedWebsite=this.value;
    });
    if(checked>1){
        alert("You can edit password for any 1 website at a time");
    }else{
       document.getElementById(checkedWebsite).innerHTML=
           '<div class="input-group">'+
               '<input class="form-control" id="enterPassword" value="Enter New Password"/>'+                    
          '<span class="input-group-btn">'+
          '<button type="button" class="btn btn-primary" id="saveButton" onClick="savePassword()">Save</button>'+
          '</span>'+
          '</div>'
           ;
           $("#saveButton").val(checkedWebsite);
   }
}

function deletePassword(){
    var i = 0;
    var data=[];
    $.each($("input[name='websites']:checked"), function(){
        data[i]=this.value;
        i++;
    });
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/delete",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        success: function (data, status, jqXHR) {
            var url = "home.html";
        $(location).attr('href', url);
        },

        error: function (jqXHR, status) {
            // error handler
            console.log(jqXHR);
            alert('fail' + status.code);
        }
     });
}

function savePassword(){
    var websiteName = $("#saveButton").val(),
      newPassword = $("#enterPassword").val();
    var data = {};
    data["name"] = websiteName;  
    data["password"]=  newPassword;
    console.log(data);    
   addData(data);
}
function addData(data){
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/edit",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        success: function (data, status, jqXHR) {
            var url = "home.html";
            $(location).attr('href', url);
        },

        error: function (jqXHR, status) {
            // error handler
            console.log(jqXHR);
            alert('fail' + status.code);
        }
     });
   }