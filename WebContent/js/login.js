  function initLogin()
  {
	//alert( $.cookie("user_type") );
      $("#login_btn").click(function(e){
		  
		  var user_name = $("#user_email1").val();
		  var password = $("#password1").val();
		  	  
          e.preventDefault();
			$.ajax({type: "POST",
                url: globalIP+"/login",
                data:JSON.stringify( { 
                	"userName": user_name,
                	"password":password }),
                contentType: "application/json",
                datatype : "application/json",

                success:function(result){
                	//alert(result.returnMessage);
					if(result.returnStatus =="success")
					{
						$("#Modal-login").hide();
						
						if(result.returnMessage=="view" && result.typeId=='23')
						{
							window.location.replace("./profile.html?recordId="+result.userId);	
						}
						else if(result.returnMessage=="add" && result.typeId=='23')
						{
							window.location.replace("./add-profile.html?recordId="+result.userId);	
						}
						else if(result.returnMessage=="ADMIN" && result.typeId=='50')
						{
							window.location.replace("./admin.html?recordId="+result.userId);						
						}
						
						
						
					}
					else
					{$("#login_response").html(result.returnMessage);
// 						var user_type = result.user_type;
// 						$.cookie("user_type", result.user_type);
// 						$.cookie("user_email", result.user_type);
// 						$.cookie("password", result.user_type);
// 						$.cookie("name", result.name);
// 						$.cookie("user_id", result.user_id);
// 						if(user_type =='A')
// 						{ window.location.replace("admin/"); }
// 						else if(user_type == 'T') { window.location.replace("technician/"); }
// 						else { window.location.replace("user/"); }
					}
				
        }});
      });
      
      $("#signup_btn").click(function(e){
		  var first_name = $("#first_name").val();
		  var last_name = $("#last_name").val();
          var user_name = $("#user_name").val();
		  var user_email = $("#user_email").val();
		  var user_contact = $("#phone_no").val();
		  var password = $("#password").val();
          e.preventDefault();
			$.ajax({
				type: "POST",
                url: globalIP+"/register",
                data:JSON.stringify( { 
                	"firstName":first_name,
                	"lastName":last_name,
                	"userName": user_name,
                	"email":user_email,
                	"contactNumber":user_contact,
                	"password":password }),
                contentType: "application/json",
                datatype : "application/json",
                success:function(result){
				 if(result.returnStatus === "fail")
				 {
					$("#regis_response").html('<b style="color:red;">'+result.returnMessage+'</b>');
				 }
				 else
				 {
					$("#regis_response").html('<b style="color:green;">'+result.returnMessage+'</b>');
				 }
				
        }});
      });
      
      $("#opt_send").click(function(e){
		  var user_forgot = $("#user_Forgot").val();
		  var email_forgot = $("#email_forgot").val();
		  
          e.preventDefault();
			$.ajax({type: "POST",
                url: globalIP+"/forgotPassword",
                data:JSON.stringify( { 
                	"userName": user_forgot,
                	"email":email_forgot }),
                contentType: "application/json",
                datatype : "application/json",
                success:function(result){

                	if(result.returnStatus==="success")
                		{
                		$("#forgot_response").html('<b style="color:green;">'+result.returnMessage+'</b>');
                		
                		}else
                			{
                			$("#forgot_response").html('<b style="color:red;">'+result.returnMessage+'</b>');
                			}
// 				 if(result == 0)
// 				 {
// 					$("#forgot_response").html('<b style="color:red;">Mobile/Email does not exist</b>');
// 				 }
// 				 else
// 				 {
// 					$("#forgot_response").html('<b style="color:green;">Please Enter Verification Code</b>');
// 					$('#otp_div').show();
// 					$('#newpass_div').show();
// 					$('#opt_veriy').show();
// 					$('#opt_send').hide();
// 					//$('#change_button').html('<button class="btn_submit" id="opt_veriy">Submit</button>');
// 				 }
        }});
      });
      
      
   // for other user type admin or client or prof add parameter
      function getForwardURL(recordType){
    	  
    	 
    	  if(recordType=='23')
    		  return  "recordId=";
    	  else if(recordType=='50')
    		  return  "profId=";
    	  
      } 

    }