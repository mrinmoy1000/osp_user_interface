  function initProfessionals()
  {
			
	     var jsonList;

		var showChar = 500; // How many characters are shown by default
		var ellipsestext = "...";
		var moretext = "more";
		var lesstext = "less";
		$('#otp_div').hide();
		$('#newpass_div').hide();
		$('#opt_veriy').hide();
		//alert( $.cookie("user_type") );
	var recordId = getParameterByName('recordId');
	var parameterType = getParameterByName('type');
	if(parameterType==="add")
		{
		$.ajax({type: "GET",
	        url: globalIP+"/getUserDetails",
	       data:{"user_id": recordId},
	        datatype : "application/json",
	        success:function(result){
	        	$("#APName").val(result.userFirstName);
	        	$("#APLastN").val(result.userLastName);
	        	$("#APContactNo").val(result.userContact);
	        	$("#APContactEmail").val(result.email);
	        }
	        	});
		}
	else{
	if(parameterType==="view")
	{
			$.ajax({
				type: "GET",
		        url: globalIP+"/professional/viewProfilebyRecord",
		       data:{"recordId": recordId},
		        datatype : "application/json",
		        success:function(result){
		        	$(".ProfName").append("<label>"+result.profFirstName+"</label>");
		        	$(".ProfLastName").append("<label>"+result.profLastName+"</label>");
		        	$(".specializationName").append("<label>"+result.specializationList[0].profSpecName+"</label>");
		        	$(".ProfQualifications").append("<label>"+result.qualificationList[0].profAcdmcName+"</label>");
		        	$(".APContactEmail").append("<label>"+result.contactList[0].contactEmail+"</label>");
		        	$(".ProfExperience").append("<label>"+result.experienceList[0].profExpDesc+"</label>");
		     //   	$("#APMaritalSta option[value='"+result.profMeritalStatus+"']").attr("selected","selected");
		        	$(".ProfNationality").append("<label>"+result.profNationality+"</label>");
		        //	$("#APresiAddress1").val(result.addressList[0].line1);
		        //	$("#APresiAddress2").val(result.addressList[0].line2);
		        //	$("#APPincode").val(result.addressList[0].pinCode);
		        	
		        	
		        }
		        	});
	}
	}
		
	    $("#profInfoButton").click(function(e){
	  	  e.preventDefault();
			 
			  var params = {};
			  //params.recordId=
			  params.profFirstName=$("#APName").val();
				  //params.profMiddleName=
				  params.profLastName=$("#APLastN").val();
				  //params.profEmpId=
				  //params.profDob=
				  //params.profGender=
				  params.profNationality=$("#APNation").val();	
				  params.profPan=$("#APIncomePan").val();
				  params.profMeritalStatus=$("#APMaritalSta").val();
				  params.profMerriageAnniversary=$("#APMdate").val();
	                        if($("#smsCheck").is(":checked")){
				  params.dndActivatedFlag=0;
	                        }else{
	                        params.dndActivatedFlag=1;
	                        }
	                 if($("#emailCheck").is(":checked")){
	                  params.emailStatus="true";
	                 }else{
	                  params.emailStatus="false";
	                 }
	                 params.status=$("#user_status").val();
				  //params.profSignature=			  
				  //params.profFees=
				  //params.profRemark=
				 // params.status=	
				  //params.createdBy=

			  var contact={};
			  //contact.contactType=
			  contact.contactPhone=$("#APContactNo").val();
			  contact.contactEmail=$("#APContactEmail").val();
	                contact.activeStatus=1;
		          params.contact=contact;

			  var address={};
			  //address.locationId=
			  //address.otherArea=
			  address.line1=$("#APresiAddress1").val();
			  address.line2=$("#APresiAddress2").val();
			  address.pinCode=$("#APPincode").val();
	                address.activeStatus=1;
			  params.address=address;

	                var specializationList = [];
	                $("#specializationTable tr").each(function (index) { 
	                if(index !== 0){
	                 var item={};
	                  item ["profSpecName"] =$(this).find("td:eq(0) input").val();
	                  item ["profSpecDesc"] =$(this).find("td:eq(1) input").val();
	                  item ["activeStatus"] =1;
	                  specializationList.push(item);                   
	                 } 
	                });
	                params.specializationList=specializationList;

			  var qualificationList = [];
	                $("#qualificationTable tr").each(function (index) { 
	                if(index !== 0){
	                 var item={};
	                  item ["profAcdmcName"] =$(this).find("td:eq(0) input").val();
	                  item ["profAcdmcDesc"] =$(this).find("td:eq(1) input").val();
	                  item ["profAcdmcUniversity"] =$(this).find("td:eq(2) input").val();
	                  item ["profAcdmcPassYear"] =$(this).find("td:eq(3) select").val();
	                  item ["activeStatus"] =1;
	                  qualificationList.push(item);                   
	                 } 
	                });
	                params.qualificationList=qualificationList;

	                var experienceList = [];
	                $("#experienceTable tr").each(function (index) { 
	                if(index !== 0){
	                 var item={};
	                  item ["profExpBeginDt"] =$(this).find("td:eq(0) input").val();
	                  item ["profExpEndDt"] =$(this).find("td:eq(1) input").val();
	                  item ["profExpDesc"] =$(this).find("td:eq(2) input").val();                  
	                  item ["activeStatus"] =1;
	                  experienceList.push(item);                   
	                 } 
	                });
	                params.experienceList=experienceList;

	                var acheivements = [];
	                $("#acheivementsTable tr").each(function (index) { 
	                if(index !== 0){
	                 var item={};                   
	                  item ["profAchvName"] =$(this).find("td:eq(0) input").val();
	                  item ["profAchvDesc"] =$(this).find("td:eq(1) input").val();
	                  item ["profAchvYear"] =$(this).find("td:eq(2) select").val();                  
	                  item ["activeStatus"] =1;
	                  acheivements.push(item);                   
	                 } 
	                });
	                params.acheivements=acheivements;

	                var registeredMemNos = [];
	                $("#registeredMemNosTable tr").each(function (index) { 
	                if(index !== 0){
	                 var item={};                 
	                  item ["regMemType"] =$(this).find("td:eq(1) input").val();
	                  item ["regAuth"] =$(this).find("td:eq(2) input").val();
	                  item ["regYear"] =$(this).find("td:eq(3) select").val();                  
	                  item ["activeStatus"] =1;
	                  registeredMemNos.push(item);                   
	                 } 
	                });
	                params.registeredMemNos=registeredMemNos;

	                var lstSubCategoryId=[];
	                $.each($("#APSubCat").val(), function( index, value ) {                
	                lstSubCategoryId.push(parseInt(value));
	                });
	                params.lstSubCategoryId=lstSubCategoryId;

	                var lstProfPublication = [];
	                $("#publicationTable tr").each(function (index) { 
	                if(index !== 0){  
	                 var item={};                 
	                  item ["profPublicationName"] =$(this).find("td:eq(0) input").val();                                    
	                   
	                var lstPublicationDetails=[];
	                var item1={};
	                item1["publicationDesc"] =$(this).find("td:eq(1) textarea").val(); 
	                 lstPublicationDetails.push(item1);
	                 item ["lstPublicationDetails"] =lstPublicationDetails; 
	                  item ["activeStatus"] =1; 
	                  lstProfPublication.push(item);                   
	                 } 
	                });
	                params.lstProfPublication=lstProfPublication;

	                var lstProfPresentation = [];
	                $("#presentationTable tr").each(function (index) { 
	                if(index !== 0){  
	                 var item={};                 
	                  item ["profPresentationName"] =$(this).find("td:eq(0) input").val();                                    
	                   
	                var lstPresentationDesc=[];
	                var item1={};
	                item1["presentationDesc"] =$(this).find("td:eq(1) textarea").val(); 
	                 lstPresentationDesc.push(item1);
	                 item ["lstPresentationDesc"] =lstPresentationDesc; 
	                  item ["activeStatus"] =1; 
	                  lstProfPresentation.push(item);                   
	                 } 
	                });
	                params.lstProfPresentation=lstProfPresentation;

			  alert(JSON.stringify(params));
	              
		        $.ajax({
	              type: "POST",             
	              url: globalIP +"/professional/saveProfile",
	              
	              data: JSON.stringify(params),
	              contentType: "application/json",
		        dataType: "application/json",
	              success:function(data){
					alert(data);				
	              }
	             });

	            });  
	    
		function hide_mobile()
		{
			$('#or_div').hide();
			$('#mobile_div').hide();
		}
		
		function hide_email()
		{
			$('#or_div').hide();
			$('#email_div').hide();
		}
		
		 $.getJSON(globalIP+"/professional/addProfile", function(result){
			
			 jsonList = result;
			 
			 $("#user_status").val(result.paramId);
			 
			   $.each(jsonList.maritalStatus, function(i, field){
	              $("#APMaritalSta").append("<option value="+field.parameterid +">"+field.value+"</option>");
	            });
			
			   $.each(jsonList.genders, function(i, field){
		             $("#APGender").append("<option value="+field.parameterid +">"+field.value+"</option>");
		           });
			   //outer list for country
			   $.each(result.locations, function(i, field){
				
				   //iterating over country for states in childLocations
				   $.each(field.childLocations, function(i, fieldValue){
					 
		              if (fieldValue.locationType === 4) //appending states
		            	  {
		            	      $("#APState").append("<option value="+fieldValue.locationId +">"+fieldValue.locationName+"</option>");
		            	  }
		              
		         
		        	  /* if (fieldValue.hasOwnProperty('childLocations')) // to check weather states has districts
		            	{
		                     $.each(fieldValue.childLocations, function(i, district){
		                       if (district.locationType === 5)
		            	          {
		            	            $("#APDistrict").append("<option value="+district.locationId +">"+district.locationName+"</option>");
		            	          }
		                       

		    	        	   if (district.hasOwnProperty('childLocations')) // to check weather district has cities or areas
		    	        		   {
		    	        		     $.each(district.childLocations, function(i, city){
		    	                         if (city.locationType === 6 || city.locationType === 7 )
		    	            	            {
		    	            	               $("#APtw").append("<option value="+city.locationId +">"+city.locationName+"</option>");
		    	            	             }
		    	        		         }); 
		    	        		   }
		                       
		                      }); 
		                  }*/
		            
		            
		             }); 
				   
	             });
			   
			   $.each(result.categories, function(i, field){
		              $("#APCat").append("<option value="+field.catId +">"+field.displayName+"</option>");
		              
		             /* if (field.hasOwnProperty('subCategoryList')) // to check weather district has cities or areas
	       		           {
	       		               $.each(field.subCategoryList, function(i, subCat){
	                              
	           	                     $("#APSubCat").append("<option value="+subCat.subCatId +">"+subCat.displayName+"</option>");
	           	                      
	       		               }); 
	       		           }*/
		           });
			   
	      });

		
		 
		 $("#APCat").change(function(e){
			 var catId = $(this).val();
			 $("#APSubCat").empty();
			 $("#APSubCat").append("<option value=0>Select</option>"); //added by abhidip on 5th february, 2016
			  $.each(jsonList.categories, function(i, field){
				
				  if (field.catId == catId) 
					  {
					  
	                    if (field.hasOwnProperty('subCategoryList')) // to check weather district has cities or areas
	   		                {
	                    	 $.each(field.subCategoryList, function(i, subCat){
	                             $("#APSubCat").append("<option value="+subCat.subCatId +">"+subCat.displayName+"</option>");
	       	                  }); 
	            		    }
	   		           }
	           });
		});
		 
		 
		 
		 $("#APState").change(function(e){
			 var stateId = $(this).val();
			   $("#APDistrict").empty();
			   $("#APtw").empty();
			   $("#APDistrict").append("<option value=0>Select</option>"); 
			   $("#APtw").append("<option value=0>Select</option>"); //added by abhidip on 5th february, 2016
			   
			     $.each(jsonList.locations, function(i, field){
				   if (field.hasOwnProperty('childLocations')) 
					   {   
					   
					     $.each(field.childLocations, function(i, states){
	                          
					    	 if(states.locationId == stateId) {
					    		 
					    		 if (states.hasOwnProperty('childLocations')) {
					    			
					    			 $.each(states.childLocations, function(i, district){
					    				 $("#APDistrict").append("<option value="+district.locationId +">"+district.locationName+"</option>");
			       	                  });
					    			  
					    		 }
					    	 }
					    	 
	 	                  }); 
					      
					   }
				   
	           });   
			 
	     });

		 

		 $("#APDistrict").change(function(e){
			 var distId = $(this).val();
			   $("#APtw").empty();
			   $("#APtw").append("<option value=0>Select</option>"); //added by abhidip on 5th february, 2016
			     $.each(jsonList.locations, function(i, field){
				    if (field.hasOwnProperty('childLocations')) 
					   {   
					   
					     $.each(field.childLocations, function(i, states){
	             	    		 
					    		 if (states.hasOwnProperty('childLocations')) {
					    			
					    			 $.each(states.childLocations, function(i, district){
					    				 
					    				 if (district.locationId == distId) {
					    					 
					    					 if (district.hasOwnProperty('childLocations')) {
					    						 
					    						 $.each(district.childLocations, function(i, city){
								    				 $("#APtw").append("<option value="+city.locationId +">"+city.locationName+"</option>");
						       	                  });
					    						 
					    						 
					    					 }
					    					 
					    				 }
					    				 
					    				 
			       	                  });
					    			  
					    		 }
					    	 
					    	 
		                  }); 
					      
					   }
				   
	         });   
			 
	  
		 
		 });
		 
		 $("#uploadbutton").on("click", function() {
				var formData = new FormData($('#uploadForm')[0]);
				formData.append('recordId', getParameterByName('recordId'));
				alert(globalIP+"/uploadPhoto");
				$.ajax({
				    url: globalIP+"/uploadPhoto",
				    data: formData,
				    type: "POST",
				    dataType: 'text',
				    contentType: false,
				    processData: false,
				    cache: false,
				    success: function(response) {
				    	//console.log(response);
				    	response=JSON.parse(response);
				        	$('#uploadMsg').html(response.result);
				        if(response.result=='Uploaded Succesfully')
				        	$('#picSrc').attr("src",response.filePath);
				    },
				    error: function() {
				    	 $('#uploadMsg').html('Upload Failed!');
				    }
				});	
			});
			
			$('.more')
			.each(
					function() {
						var content = $(this).html();

						if (content.length > showChar) {

							var c = content.substr(0,
									showChar);
							var h = content.substr(
									showChar,
									content.length
											- showChar);

							var html = c
									+ '<span class="moreellipses">'
									+ ellipsestext
									+ '&nbsp;</span><span class="morecontent"><span>'
									+ h
									+ '</span>&nbsp;&nbsp;<a href="" class="morelink">'
									+ moretext
									+ '</a></span>';

							$(this).html(html);
						}

					});
			
			$(".morelink").click(function() {
				if ($(this).hasClass("less")) {
					$(this).removeClass("less");
					$(this).html(moretext);
				} else {
					$(this).addClass("less");
					$(this).html(lesstext);
				}
				$(this).parent().prev().toggle();
				$(this).prev().toggle();
				return false;
			});
    
    }
  
	function getParameterByName(name) {
	var    url = window.location.href;
	  var  name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}