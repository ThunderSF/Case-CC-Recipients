@isTest
private class Test_customPillController_Class {

    @isTest
    public static void updateEmail_test(){
        String emailList = 'test@test.com';
        Case c = new Case();
        c.status = 'New';
        c.Email_CC_List__c = 'test1@test.com';
        insert c;
        customPillController_Class.updateEmail(c.id, emailList);
        customPillController_Class.getEmailList(c.id);
    }
}