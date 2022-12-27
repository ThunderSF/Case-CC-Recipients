({
    
    doInit : function (cmp, event,helper) {
        helper.getEmailList(cmp, event);
    },
    callKeyEnter : function(cmp, event, helper) {  
        var inputText = cmp.get('v.strText');
        if ( event.keyCode == 13 && inputText !='') { 
            helper.addNewPills(cmp, helper, inputText);
            cmp.set('v.strText','');
        } 
    } , 
    
    handleRemove: function (cmp, event,helper) {
        var name = event.getParam("item").name;
        console.log(name);
        // Remove the pill from view
        var items = cmp.get('v.pills');
        var item = event.getParam("index");
        items.splice(item, 1);
        cmp.set('v.pills', items);
        helper.callApexMethod(cmp, event);
    }
        
})