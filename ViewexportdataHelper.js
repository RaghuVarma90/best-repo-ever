({
	returnObjects : function(component, event, helper) {
        var action = component.get("c.getAllSObjects");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS') {
                var objects = response.getReturnValue().sort();
                console.log(objects);
                component.set("v.objects",objects);
            }
        });
        $A.enqueueAction(action);
    },
    onObjectChange : function(component, event, objectName) {
        var action = component.get("c.displayFields");
        action.setParams({
            "objectName" : objectName
        });
        
          action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS') {
                var fields = response.getReturnValue();
                console.log('fields$$$$$$'+JSON.stringify(fields));
                var listOfFields = [];
                for (var i = 0; i < fields.length; i++) {
                    listOfFields.push({
                        label: fields[i],
                        value: fields[i]
                    });
                }
                component.set("v.fields",listOfFields);
        
            }
        });
        $A.enqueueAction(action);
    },
    
    ShowDetailsvalues : function(component, event, result) {
        
        var query = component.find("query").get("v.value");
        var selectedFieldListwhere = component.get("v.selectedFieldListwhere");
		var action = component.get("c.downloadvalues");
		action.setParams({
            "query" : query,
            "Datalist" :result,
            "selectedfileds" : selectedFieldListwhere
            
         }); 
      window.setTimeout(
      	$A.getCallback(function() {  
            action.setCallback(this, function(response) {
                var state = response.getState();
                alert('state$$$$'+state);
                if(state === 'SUCCESS') {
                    var listOfRecords = response.getReturnValue();
                    alert('listOfRecords$$$$'+listOfRecords);
                    //component.set("v.recordList",listOfRecords);
                    alert('start2');
                     this.convertArrayOfObjectsToCSV('123');
                    //alert('csv####'+csv);
                    
                }
            });
        }), 2000
     );
     $A.enqueueAction(action);
    },
    
     CSV2JSON: function (component,csv) {
    console.log('@@@ Incoming csv = ' + csv);
      
        var arr = []; 
        console.log('input csv file'+csv);
        arr =  csv.split('\n');;
        console.log('@@@ arr = '+arr);
        arr.pop();
        var jsonObj = [];
        var headers = arr[0].split(',');
        for(var i = 1; i < arr.length; i++) {
            var data = arr[i].split(',');
            var obj = {};
            for(var j = 0; j < data.length; j++) {
                obj[headers[j].trim()] = data[j].trim();
               
            }
            jsonObj.push(obj);
        }
        var json = JSON.stringify(jsonObj);
        console.log('@@@ json = '+ json);
          var obj = JSON.parse(json);
        console.log('@@@ json = '+ obj);
        return json;
    
    },
    
    Viewdetails1 :function(component,jsonstr){
       
        var query = component.find("query").get("v.value");
        var selectedFieldListwhere = component.get("v.selectedFieldListwhere");
        var action1 = component.get("c.queryString1");
        
		action1.setParams({
            "query" : query,
            "Datalist" :jsonstr,
            "selectedfileds" : selectedFieldListwhere
        });
        
        action1.setCallback(this, function(response) {
            var state = response.getState();
            alert(JSON.stringify(state));
                    
        });
	    $A.enqueueAction(action1);
		
    },
        
   
    convertArrayOfObjectsToCSV : function(objectRecords){
      ALERT(objectRecords);
            var csvStringResult, counter, keys, columnDivider, lineDivider,keys1;
            if (objectRecords == null || !objectRecords.length) {
                return null;
            }
       
            columnDivider = ',';
            lineDivider =  '\n';
            var selectedFieldList1 = component.get("v.selectedFieldList");
           
            keys = [];
            keys1 = [];
       
            var Head = component.get("v.selectedFieldList");
              for(var i in Head){
                   keys.push(Head[i])
             }
      
       
            console.log()
            csvStringResult = '';
            csvStringResult += keys.join(columnDivider);
            console.log(csvStringResult)
            csvStringResult += lineDivider;
            console.log("--------------")
            console.log(keys)
            console.log("--------------")
          for(var i=0; i < objectRecords.length; i++){   
                counter = 0;
                      
            for(var sTempkey in keys) {
                var skey = keys[sTempkey] ;  
                
                
                if(counter > 0){ 
                    csvStringResult += columnDivider; 
                }   
                
                csvStringResult += '"'+ ( objectRecords[i][skey]?objectRecords[i][skey]:"")+'"'; 
              
                counter++;
                
            } // inner for loop close 
            csvStringResult += lineDivider;
        }
        return csvStringResult;        
    },
   
})