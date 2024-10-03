namespace com.cy.isat;


entity Customers {
    key autoid      : Integer;
        custid      : String(10);
        name        : String(20);
        location    : String(100);
        description : String(100);
}

entity Projects {
    key autoid      : Integer;
        projid      : String(10);
        name        : String(20);
        description : String(100);
        status      : Boolean;
}

entity Customers_Projects {
    key autoid      : Integer;
        customer_id : Association to Customers;
        proj_id     : Association to Projects;
}

entity Users {
    key autoid  : Integer;
        userid  : String(10);
        name    : String(20);
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

}

entity Teams {
    key autoid      : Integer;
        teamid      : String(10);
        name        : String(20);
        description : String(100);
}

entity Teams_Users {
    key autoid  : Integer;
        team_id : Association to Teams;
        user_id : Association to Users;
        active  : Boolean;
}

entity Users_Roles {
    key autoid  : Integer;
        user_id : Association to Users;
        role_id : Association to Roles;
}

entity Tasklist {
    key autoid      : Integer;
        name        : String(20);
        description : String(100);
}


entity Tasks {
    key autoid           : Integer;
        task_name        : String(20);
        duration         : String;
        startdate        : Date;
        enddate          : Date;
        status           : String(10);
        type             : String(10);
        parent_task_id   : Integer;
        assignedto       : String(20);
        created_by       : String(20);
        updated_datetime : DateTime;
        created_datetime : DateTime;
        updated_by       : String;
        tasklist_id      : Association to Tasklist;


}

entity TimeCapture {
    key autoid     : Integer;
        start_time : Time;
        end_time   : Time;
        task_id    : Association to Tasks;
}

// entity Component {
//     key autoid      : Integer;
//         compid      : String(10);
//         name        : String(20);
//         description : String(100);
//         type        : String(10);
// }

// entity ComponentType {
//     key autoid      : Integer;
//         name        : String(20);
//         description : String(1000);
// }

entity Component_TaskList {
    key autoid      : Integer;
        //ddType_id : Association to DDType;
        tasklist_id : Association to Tasklist;
        stage_id    : Association to Stages;
}

entity Comments {
    key autoid           : Integer;
        comment          : String(1000);
        refid            : String(10);
        type             : String(10);
        created_by       : String(20);
        created_datetime : DateTime;
}

entity Timelines {
    key autoid         : Integer;
        start_datetime : Time;
        end_datetime   : Time;
        refid          : Integer;
        type           : String(10);
}


entity Phases {
    key autoid     : Integer;
        phase_name : String(20);
}


entity Component_Stages {
    key autoid       : Integer;
        //ddType_id : Association to DDType;
        //stagename : String(20);
        stage_id     : Association to Stages;
        status       : String(10);
}


entity Stages {
    key autoid      : Integer;
        name        : String(20);
        description : String(100);

}


entity DDData {
    key autoid    : Integer;
        name      : String(20);
        value     : String(30);
        ddType_id : Association  to DDType;
}

entity DDType {
    key autoid      : Integer;
        name        : String(20);
        description : String(100);
}


entity InterfaceDetails {
    key autoid         : Integer;
        name           : String(20);
        description    : String(20);
        module         : String(20);
        package        : String(20);
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
        task_id       : Association to Tasks;
        attachmenturl : String(100);
        name          : String(20);
        type          : String(10);
}

entity TaskNotes {
    key autoid  : Integer;
        task_id : Association to Tasks;
        notes   : String(1000);
        name    : String(20);

}

entity Issues {
    key autoid       : Integer;
        issueDesc    : String(100);
        detailedDesc : String(100);
        type         : String(20);
        status       : String(10);
        createdBy    : String(10);
        updatedBy    : String(100);
        createdTime  : String(20);
        updatedTime  : String(10)
}
