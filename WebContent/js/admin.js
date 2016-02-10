  function initAdmin()
  {

		$.ajax({
			type: "GET",
          url:  globalIP+"/fetchApprovalProfList",
          datatype : "json",
          success:function(result)
          {
          	var table = $('#professionlsTable tbody');    
          	
          //	table.append("<tr><td>c</td><td>d</td></tr>");
              $.each(result, function(i, data) {
              	var lastame ="";
              	var approveStaus = "AP";
              	var rejectStaus = "RJ";
              	if(data.profLastName===undefined)
              		{lastame="";}
              	table.append('<tr>'+
              	'<td>'+data.profLastName+' '+lastame+'</td>'+
              	'<td><button class="btn btn-success" type="button" title="Approve" onClick="approve('+data.profId + ',' + '\'ACTIVE\'' +')">Approve</button></td>'+
              	'<td><button class="btn btn-danger" type="button" title="Reject" onClick="approve('+data.profId + ',' + '\'REJECTED\'' +')">Reject</button></td>'+
              	'<td><button class="btn btn-btn-default" type="button" title="View Profile" onClick="viewProfile('+ data.profId+')">View Profile</button></td>'+
              	'</tr>');
              });

          }
		});
			
    
    }
  function approve(profId,status)
  {
	  $.ajax({type: "PUT",
          url: globalIP+"/approveProfile",
          data:JSON.stringify( { 
          	"profId": profId,
          	"actionTaken":status }),
          contentType: "application/json",
          datatype : "application/json",
          success:function(result){
        	  
        	  if(result==="success")
        		  {
        		  alert("done successfully");
        		  }
          }
		}
		);
	  
	  
  }
  function viewProfile(profId)
	 {
		 window.location.replace("./profile.html?profId="+profId+"&type=viewprofile");				
	 }
  
  function getParameterByName(name) {
	    url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}