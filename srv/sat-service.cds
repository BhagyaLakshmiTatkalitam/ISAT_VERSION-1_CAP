using {com.cy.isat as isat } from '../db/satdb.cds';
 
service IsatService {
    entity Customers as projection on isat.Customers;
    entity Projects as projection on isat.Projects;
    entity Customers_Projects as projection on isat.Customers_Projects;
    entity Users as projection on isat.Users;
    entity Roles as projection on isat.Roles;
    entity Teams as projection on isat.Teams;
    entity Teams_Users as projection on isat.Teams_Users;
    entity Users_Roles as projection on isat.Users_Roles;
    entity Tasklist as projection on isat.Tasklist;
    entity Tasks as projection on isat.Tasks;
    entity TimeCapture as projection on isat.TimeCapture;
    entity Component as projection on isat.Component;
    entity ComponentType as projection on isat.ComponentType;
    entity Component_TaskList as projection on isat.Component_TaskList;
    entity Comments as projection on isat.Comments;
    entity Timelines as projection on isat.Timelines;
    entity Phases as projection on isat.Phases;
    entity Component_Stages as projection on isat.Component_Stages;
    entity Stages as projection on isat.Stages;
    entity DDData as projection on isat.DDData;
    entity InterfaceDetails as projection on isat.InterfaceDetails;
    entity TaskAttachments as projection on isat.TaskAttachments;
    entity TaskNotes as projection on isat.TaskNotes;
    entity Issues as projection on isat.Issues
}
 
 