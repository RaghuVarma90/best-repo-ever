public class Viewexportdata
{

    @AuraEnabled
    public static List<String> getAllSObjects()
    {
        List<String> sObjectList = new List<String>();
        for(Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values())
        {
            Schema.DescribeSObjectResult describeSObjectResultObj = objTyp.getDescribe();
            String name = objTyp.getDescribe().getName();
            // Exclude all the unwanted Sobjects e.g. History, Share etc..
            if(!name.containsignorecase('history') && !name.containsignorecase('tag')&&
                 !name.containsignorecase('share') && !name.containsignorecase('feed'))
            {
                sObjectList.add(name);
            }
        }
        system.debug('SObjectList****' + SObjectList);
        return sObjectList;    
    }
    
    @AuraEnabled
    public static  list<string> displayFields(String objectName)
    {
        Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap();
        List<String> strList = new List<String>();
        for(Schema.SObjectField sfield : fieldMap.Values())
        {
            schema.describefieldresult dfield = sfield.getDescribe();
            strList.add(dfield.getName());
        }
        return strList;
    }
    
    @AuraEnabled
     public static List<sObject> downloadvalues(string query, string Datalist,list<string> selectedfileds)
     {
        system.debug('Datalist:'+Datalist);
        system.debug('selectedfileds:'+selectedfileds);
          
         // Map<String,string> m1 = (Map<String,string>)JSON.deserializeUntyped(Datalist);
        string Filedvalue;
        for(string str:selectedfileds)
        {
            Filedvalue=str;
            
        }  
        
       System.debug('Filedvalue:'+Filedvalue);
        set<string> ids= new set<string>();
        List<fieldWrapper> datalist1 = (List<fieldWrapper>) JSON.deserialize(Datalist,List<fieldWrapper>.class);
        system.debug('Test:'+datalist1);    
        for(fieldWrapper wrapper: datalist1)
        {
            If(Filedvalue =='id'){
            ids.add(wrapper.id);
            }
            If(Filedvalue =='Name')
            {
               ids.add(wrapper.Name);
            }            
        }
        If(Filedvalue =='id'){
              query+=':ids';
            }
            If(Filedvalue =='Name')
            {
              query+=':ids';
            
         } 
         
        
        List<sObject> sobjList = Database.query(query);
        return sobjList;
     }  
         
         
    
    @AuraEnabled
    public static List<sObject> queryString1(string query, string Datalist,list<string> selectedfileds)
    {
        system.debug('Datalist:'+Datalist);
        system.debug('selectedfileds:'+selectedfileds);
          
         // Map<String,string> m1 = (Map<String,string>)JSON.deserializeUntyped(Datalist);
        string Filedvalue;
        for(string str:selectedfileds)
        {
            Filedvalue=str;
            
        }  
        
       System.debug('Filedvalue:'+Filedvalue);
        set<string> ids= new set<string>();
        List<fieldWrapper> datalist1 = (List<fieldWrapper>) JSON.deserialize(Datalist,List<fieldWrapper>.class);
        system.debug('Test:'+datalist1);    
        for(fieldWrapper wrapper: datalist1)
        {
            If(Filedvalue =='id'){
            ids.add(wrapper.id);
            }
            If(Filedvalue =='Name')
            {
               ids.add(wrapper.Name);
            }            
        }
        If(Filedvalue =='id'){
              query+=':ids';
            }
            If(Filedvalue =='Name')
            {
              query+=':ids';
            
         } 
         
        
        List<sObject> sobjList = Database.query(query);
        return sobjList;
    }
    public class fieldWrapper
    {
        public string id;
        public string Name;
    }   



}