({
	 doInit : function(component, event, helper) {
            helper.returnObjects(component, event, helper);
    },
    
    handleObjectSelect : function(component, event, helper) {
        
        var objectName = component.find("selectedObject").get("v.value");
        var selectedObject = component.set("v.objectName",objectName);
        helper.onObjectChange(component, event, objectName);
       
    },
    
    handleFieldSelect : function (component, event, helper) {
        //Get the Selected values   
        var selectedValues = event.getParam("value");
        //Update the Selected Values  
        component.set("v.selectedFieldList", selectedValues);
        alert(selectedValues);
    },
    
     handleFieldSelectone : function (component, event, helper) {
        //Get the Selected values   
        var selectedValues = event.getParam("value");
        //Update the Selected Values  
        component.set("v.selectedFieldListwhere", selectedValues);
     },

      downloadCSV : function(component,event,helper){
      	//alert('Testdownload');
        var fileInput = component.find("file").getElement();
        var file = fileInput.files[0]; 
          
        if (file){
          //  alert('Filetest');
        	console.log("File");
        	var reader = new FileReader();
        	reader.readAsText(file,"UTF-8");
            //alert('TestmethodFirst');
            reader.onload = function (evt) {
               // alert('Testmethodsecond');
            	console.log("EVT FN");
           		var csv = evt.target.result;
            	console.log('@@@ csv file contains'+ csv);
            	var result = helper.CSV2JSON(component,csv);
            	//alert(result);
            	console.log('result'+ result);
                if(result){
                    //alert('insidecallhelperview');
				    // helper.Viewdetails1(component,result);
				  helper.ShowDetailsvalues(component, event, result);   
				    
                }
               
              
              
           }    
            
        }  
     
          
      }     
    
})