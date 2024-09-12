namespace com.cy.isat;

using {managed} from '@sap/cds/common';


entity Customers {
    key autoid      : Integer;
        custid      : String(10);
        name        : String(20);                                //ok
        location    : String(20);
        description : String(100);
}

entity Projects {
    key autoid      : Integer;
        projid      : String(10);                              //ok
        name        : String(20);
        description : String(100);
        status      : Boolean;
}

entity Customers_Projects {
    key autoid      : Integer;
        customer_id : Association to Customers;                 //ok
        proj_id     : Association to Projects;
}

entity Users {
    key autoid  : Integer;
        userid  : String(10);
        name    : String(20);                                 //ok
        role    : String(10);
        active  : Boolean;
        emailid : String(20) @assert.valid.email;
        custid  : String(10);
}

entity Roles {
    key autoid      : Integer;
        roleid      : String(10);
        name        : String(20);
        description : String(100);
        active      : Boolean;                               //column not mentioned in exel
}

entity Teams {
    key autoid      : Integer;
        teamid      : String(10);                           //ok
        name        : String(20);
        description : String(100);
}

entity Teams_Users {
    key autoid  : Integer;
        team_id : Association to Teams;                        //ok
        user_id : Association to Users;
        active  : Boolean;
}

entity Users_Roles {
    key autoid  : Integer;
        user_id : Association to Users;                            //ok
        role_id : Association to Roles;
}

entity Tasklist {
    key autoid      : Integer;
        name        : String(20);                             //ok

        description : String(100);
}


//here we can use managed aspect
entity Tasks : managed {
    key autoid         : Integer;
        task_name      : String(20);
        duration       : String;
        startdate      : Date;
        enddate        : Date;
        status         : String(10);
        type           : String(10);
        parent_task_id : Integer;                     //in this column reftaskid is in exel
        assignedto     : String(20);
        // created_by       : String(20);
        //  updated_datetime : DateTime;
        // created_datetime : DateTime;
        //updated_by:String;
        tasklist_id    : Association to Tasklist;


}

entity TimeCapture {
    key autoid     : Integer;
        start_time : Time;
        end_time   : Time;
        task_id    : Association to Tasks;                        //ok
}

entity Component {
    key autoid      : Integer;
        compid      : String(10);
        name        : String(20);                                 //entity not listed in exel
        description : String(100);
        type        : String(10);
}

entity ComponentType {
    key autoid      : Integer;                                         //ok
        name        : String(20);
        description : String(1000);
}

entity Component_TaskList {
    key autoid      : Integer;
        comptype_id : Association to ComponentType;                      //edited from component_id
        tasklist_id : Association to Tasklist;
        stage_id    : Association to Stages;
}

entity Comments {
    key autoid           : Integer;
        comment          : String(1000);
        refid            : String(10);
        type             : String(10);                             //Doubt(filtering)
        created_by       : String(20);
        created_datetime : DateTime;
}

entity Timelines {
    key autoid         : Integer;
        start_datetime : Time;
        end_datetime   : Time;                                            //ok
        refid          : Integer;
        type           : String(10);
}


entity Phases {
    key autoid     : Integer;
        phase_name : String(20);                                     //phase_name  type is time in exel
}


entity Component_Stages {
    key autoid       : Integer;
        component_id : Association to ComponentType;                           //comptype_id mentioned in exel
        //stagename : String(20);
        // stage_id     : Association to Stages;                         //column mentioned in exel
        status       : String(10);
}


entity Stages {
    key autoid      : Integer;
        name        : String(20);                               //ok
        description : String(100);

}


entity DDData {
    key autoid   : Integer;
        name     : String(20);
        type     : String(10);                           //this column not mentioned in exel
        comptype : String(10);
}


entity InterfaceDetails {
    key autoid         : Integer;
        name           : String(20);
        decsription    : String(20);
        component_id   : Association to Component;           //column not mentioned in exel
        module         : String(20);
        package        : Integer;
        senderssystem  : String(20);
        receiversystem : String(20);
        process        : String(20);
        sourceadapter  : String(20);
        targetadapter  : String(20);
        techpoc        : String(200);
        functionalpoc  : String(200);
        businesspoc    : String(200);
        doctype        : String(20);
        frequency      : String(20);
        ccenabled      : Boolean;
}

entity TaskAttachments {
    key autoid        : Integer;
        task_id       : Association to Tasks;           //ok
        attachmenturl : String(100);
        name          : String(20);
        type          : String(10);
}

entity TaskNotes {
    key autoid  : Integer;
        task_id : Association to Tasks;
        notes   : String(1000);                           //ok
        name    : String(20);

}

entity Issues {
    key autoid       : Integer;
        issueDesc    : String(10);
        detailedDesc : String(100);
        type         : String(20);
        status       : String(10);
        createdBy    : String(10);                  //newly added entity
        updatedBy    : String(100);
        createdTime  : String(20);
        updatedTime  : String(10)
}
