public without Sharing class customPillController_Class {
@AuraEnabled
    public static void updateEmail(String caseid,String emailList){
        List<String> emails = new List<String>();
        List<String> temp = new List<String>{'Email_CC_Address_1__c','Email_CC_Address_2__c','Email_CC_Address_3__c','Email_CC_Address_4__c',
            'Email_CC_Address_5__c'};
        Case c = [Select id,Email_CC_List__c,Email_CC_Address_1__c,
                  Email_CC_Address_2__c,Email_CC_Address_3__c,Email_CC_Address_4__c,Email_CC_Address_5__c 
                  from Case WHERE  id=:caseid];
         String commaSepratedFields = '';
        List<Map<String,String>> mapOfStToList= (List<Map<String,String>>)JSON.deserialize(emailList,List<Map<String,String>>.class);
        System.debug('****='+mapOfStToList);
        for(Map<String,String> st : mapOfStToList){
            emails.add(st.get('label'));
        }
        
        for(Integer i = 0;i<emails.size();i++){
            if(commaSepratedFields == null || commaSepratedFields == ''){
                commaSepratedFields = emails[i];
            }else{
                commaSepratedFields = commaSepratedFields + ',' + emails[i];
            } 
        }
        for(Integer i = 0; i<5 ; i++){
           c.put(temp[i],''); 
        }
        c.Email_CC_List__c = commaSepratedFields;
        List<String> emailString = c.Email_CC_List__c.split(',');
        for(Integer i = 0; i<emailString.size() && i<5 ; i++){
            c.put(temp[i],emailString[i]);
            System.debug('***='+c);
        }
        update c;
    }
    
    @AuraEnabled
    public static String getEmailList(String caseid){
         Case c = [Select id,Email_CC_List__c
                   from Case WHERE  id=:caseid];
        if(c.Email_CC_List__c != null){
            return c.Email_CC_List__c;
        }
        else
        return null;
        
    }
}