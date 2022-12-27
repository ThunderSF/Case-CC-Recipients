({
    addNewPills: function(cmp, helper, values) {
        var pills = cmp.get('v.pills');
        if(values != undefined){
            cmp.set('v.showpill',true);
            pills.push({
                label: values
                
            });
        }
        cmp.set('v.pills', pills);
        helper.callApexMethod(cmp, event);
    },
    
    callApexMethod:function(cmp, event,helper){
        var recordid=cmp.get('v.recordId');
        var pills= JSON.stringify(cmp.get('v.pills'));
        console.log('pills==',pills);
        cmp.set('v.loading', true);
        var action = cmp.get('c.updateEmail');
        action.setParams({
            "caseid": recordid,
            "emailList" : pills
            
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            cmp.set('v.loading', false);
            if (state === "SUCCESS") {
                
            }
            else if(state === "ERROR"){
                var errors = response.getError(); 
                if (errors[0].fieldErrors){
                    for (var fieldName in errors[0].fieldErrors) {
                        //each field could have multiple errors
                        errors[0].fieldErrors[fieldName].forEach( function (errorList){	
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                "title": "Field Error on " + fieldName + " : "|| "Error!",
                                "message": errorList.message,
                                "type": "error"
                            });
                            toastEvent.fire();
                            
                        });                                
                    };  				
                }
                
            }
            
        });
        //$A.get('e.force:refreshView').fire();
        $A.enqueueAction(action); 
    },
    getEmailList : function(cmp, event){
        var recordid=cmp.get('v.recordId');
        var pills = cmp.get('v.pills');
        
        var action = cmp.get('c.getEmailList');
        action.setParams({
            "caseid": recordid
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var value = response.getReturnValue();
                if(value != null){
                    cmp.set('v.showpill',true);
                    var emails = value.split(',');
                    console.log('email**',emails);
                    for (var i = 0; i < emails.length; i++) {
                        pills.push({
                            label: emails[i]
                            
                        });  
                    }
                    cmp.set('v.pills', pills);
                    
                }
            }
        });
        $A.enqueueAction(action); 
    }
    
})