const cds =require('@sap/cds');
module.exports=cds.service.impl(async function() {
    const {Customers,Projects,Users,Component,Tasklist,Roles,Customers_Projects,DDData,Comments,Teams,Stages}=cds.entities;
    this.on('CREATE','Customers',async(req)=>{
        try {
            const { custid, name, location, description } = req.data;
            const autoid = await this.run(SELECT.one.from(Customers).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID-1) + 1;
            const newCustomer = {
            autoid: newID,
            custid,
            name,
            location,
            description
        };
            return await this.run(INSERT.into(Customers).entries(newCustomer));
        } catch (error) {
            req.error(500, `Error creating customer: ${error.message}`);
        }
    }),
 
    this.on('UPDATE', 'Customers', async (req) => {
        try {
            const { autoid, custid, name, location, description } = req.data;
            return await this.run(UPDATE(Customers).set({ custid, name, location, description }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating customer: ${error.message}`);
        }
    });
 
    this.on('DELETE', 'Customers', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Customers).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting customer: ${error.message}`);
        }
    });
 
   
    // this.on('READ', 'Customers', async (req) => {
    //     try {
    //         return await this.run(SELECT.from(Customers));
    //     } catch (error) {
    //         req.error(500, `Error reading customers: ${error.message}`);
    //     }
    // });
    this.on('READ', 'Customers', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
           
            if (req.data.name) {
                req.query.where({ name: req.data.name });
            }
 
           
            return await next();
        } catch (error) {
            req.error(500, `Error filtering customers: ${error.message}`);
        }
 
    });
 
 
 
    //Projects Entity
 
    this.on('CREATE','Projects',async(req)=>{
        try {
            const { projid, name, description, status } = req.data;
            const autoid = await this.run(SELECT.one.from(Projects).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID-1) + 1;
            const newProject = {
            autoid: newID,
            projid,
            name,
            description,
            status
        };
            return await this.run(INSERT.into(Projects).entries(newProject));
        } catch (error) {
            req.error(500, `Error creating project: ${error.message}`);
        }
    })
 
 
    //Update operation
    this.on('UPDATE', 'Projects', async (req) => {
        try {
            const { autoid, projid, name, description, status } = req.data;
            return await this.run(UPDATE(Projects).set({ projid, name, description, status }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating project: ${error.message}`);
        }
    });
 
 
    //Delete Operation
    this.on('DELETE', 'Projects', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Projects).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting project: ${error.message}`);
        }
    });
 
 
    //Read Operation
    this.on('READ', 'Projects', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
           
            if (req.data.name) {
                req.query.where({ name: req.data.name });
            }
 
           
            return await next();
        } catch (error) {
            req.error(500, `Error filtering projects: ${error.message}`);
        }
 
    });
 
 
 
    //Users Entity
    this.on('CREATE','Users',async(req)=>{
        try {
            const { userid, name, role, active,emailid,custid } = req.data;
            const autoid = await this.run(SELECT.one.from(Users).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID-1) + 1;
            const newUser = {
            autoid: newID,
            userid,
            name,
            role,
            active,
            emailid,
            custid
        };
            return await this.run(INSERT.into(Users).entries(newUser));
        } catch (error) {
            req.error(500, `Error creating user: ${error.message}`);
        }
    })
 
 
 
     //Update operation
     this.on('UPDATE', 'Users', async (req) => {
        try {
            const { autoid, userid, name, role, active,emailid,custid } = req.data;
            return await this.run(UPDATE(Users).set({ userid, name, role, active,emailid,custid }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating user: ${error.message}`);
        }
    });
 
 
 
    //Delete Operation
    this.on('DELETE', 'Users', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Users).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting user: ${error.message}`);
        }
    });
 
   
    //Read Operation
    this.on('READ', 'Users', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
           
            if (req.data.name) {
                req.query.where({ name: req.data.name });
            }
 
           
            return await next();
        } catch (error) {
            req.error(500, `Error filtering users: ${error.message}`);
        }
 
    });
 

    //Component Entity
    this.on('CREATE','Component',async(req)=>{
        try {
            const { compid, name, description, type } = req.data;
            const autoid = await this.run(SELECT.one.from(Component).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID-1) + 1;
            const newComponent = {
            autoid: newID,
            compid,
            name,
            description,
            type
        };
            return await this.run(INSERT.into(Component).entries(newComponent));
        } catch (error) {
            req.error(500, `Error creating component: ${error.message}`);
        }
    })
 
    this.on('UPDATE', 'Component', async (req) => {
        try {
            const { autoid, compid, name, description, type } = req.data;
            return await this.run(UPDATE(Component).set({ compid, name, description, type }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating component: ${error.message}`);
        }
    });
 
    this.on('DELETE', 'Component', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Component).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting component: ${error.message}`);
        }
    });
 
    this.on('READ', 'Component', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
           
            if (req.data.name) {
                req.query.where({ name: req.data.name });
            }
 
           
            return await next();
        } catch (error) {
            req.error(500, `Error filtering componentss: ${error.message}`);
        }
 
    });


                          //TaskList Entity


    this.on('CREATE','Tasklist',async(req)=>{
        try {
            const { name,description } = req.data;
            const autoid = await this.run(SELECT.one.from(Tasklist).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID-1) + 1;
            const newTasklist = {
            autoid: newID,
            name,
            description
        };
            return await this.run(INSERT.into(Tasklist).entries(newTasklist));
        } catch (error) {
            req.error(500, `Error creating tasklist: ${error.message}`);
        }
    });


    this.on('UPDATE', 'Tasklist', async (req) => {
        try {
            const { autoid, custid, name, location, description } = req.data;
            return await this.run(UPDATE(Tasklist).set({ custid, name, location, description }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating customer: ${error.message}`);
        }
    });




    this.on('CREATE', 'Roles', async (req) => {
        try {
            const { roleid, name, description, active } = req.data;

            const autoid = await this.run(SELECT.one.from(Roles).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
            const newRole = {
                autoid: newID,
                roleid,
                name,
                description,
                active
            };
    
           
            return await this.run(INSERT.into(Roles).entries(newRole));
        } catch (error) {
            req.error(500, `Error creating role: ${error.message}`);
        }
    });
    
    this.on('UPDATE', 'Roles', async (req) => {
        try {
            const { autoid, roleid, name, description, active } = req.data;
    
            
            return await this.run(UPDATE(Roles).set({ roleid, name, description, active }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating role: ${error.message}`);
        }
    });
    
    this.on('DELETE', 'Roles', async (req) => {
        try {
            const { autoid } = req.data;
    
            
            return await this.run(DELETE.from(Roles).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting role: ${error.message}`);
        }
    });
    
    this.on('READ', 'Roles', async (req, next) => {
        try {
            
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
            if (req.data.name) {
                req.query.where({ name: req.data.name });
            }
    
            // Execute the read operation with filtering
            return await next();
        } catch (error) {
            req.error(500, `Error filtering roles: ${error.message}`);
        }
    });



    this.on('CREATE', 'Customers_Projects', async (req) => {
        try {
            const { customer_id, proj_id } = req.data;
    
            // Validate that the customer and project exist
            // const customer = await this.run(SELECT.one.from(Customers).where({ autoid: customer_id }));
            // const project = await this.run(SELECT.one.from(Projects).where({ autoid: proj_id }));
    
            // if (!customer) return req.error(400, `Customer with ID ${customer_id} not found`);
            // if (!project) return req.error(400, `Project with ID ${proj_id} not found`);
    
            // Generate a new autoid based on the maximum existing value
            const lastAutoID = await this.run(SELECT.one.from(Customers_Projects).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (lastAutoID.maxID >= startingID ? lastAutoID.maxID : startingID - 1) + 1;
    
            // Create the new entry with the generated autoid and correct association
            const newEntry = {
                autoid: newID,
                customer_id,  // Use the autoid from the associated Customer
                proj_id     // Use the autoid from the associated Project
            };
    
            return await this.run(INSERT.into(Customers_Projects).entries(newEntry));
        } catch (error) {
            req.error(500, `Error creating Customers_Projects entry: ${error.message}`);
        }
    });
    this.on('READ', 'Customers_Projects', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
    
            if (req.data.customer_id) {
                req.query.where({ customer_id: req.data.customer_id });
            }
    
            if (req.data.proj_id) {
                req.query.where({ proj_id: req.data.proj_id });
            }
    
            return await next();
        } catch (error) {
            req.error(500, `Error reading Customers_Projects entries: ${error.message}`);
        }
    });
    this.on('UPDATE', 'Customers_Projects', async (req) => {
        try {
            const { autoid, customer_id, proj_id } = req.data;
            
            // Validate customer and project exist
            const customer = await this.run(SELECT.one.from(Customers).where({ autoid: customer_id }));
            const project = await this.run(SELECT.one.from(Projects).where({ autoid: proj_id }));
    
            if (!customer) req.error(400, `Customer with ID ${customer_id} not found`);
            if (!project) req.error(400, `Project with ID ${proj_id} not found`);
    
            return await this.run(
                UPDATE(Customers_Projects)
                .set({ customer_id, proj_id })
                .where({ autoid })
            );
        } catch (error) {
            req.error(500, `Error updating Customers_Projects entry: ${error.message}`);
        }
    });
    this.on('DELETE', 'Customers_Projects', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Customers_Projects).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting Customers_Projects entry: ${error.message}`);
        }
    });

    this.on('CREATE', 'Teams', async (req) => {
        try {
            const { teamid, name, description } = req.data;
   
            // Fetch the maximum autoid
            const autoid = await this.run(SELECT.one.from(Teams).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
   
            // Create a new role object
            const newTeam = {
                autoid: newID,
                teamid,
                name,
                description,
            };
   
            // Insert the new role into the database
            return await this.run(INSERT.into(Teams).entries(newTeam));
        } catch (error) {
            req.error(500, `Error creating team: ${error.message}`);
        }
    });
   
    this.on('UPDATE', 'Teams', async (req) => {
        try {
            const { autoid, teamid, name, description } = req.data;
   
            // Update the role in the database
            return await this.run(UPDATE(Teams).set({ teamid, name, description }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating team: ${error.message}`);
        }
    });
   
    this.on('DELETE', 'Teams', async (req) => {
        try {
            const { autoid } = req.data;
   
            // Delete the role from the database
            return await this.run(DELETE.from(Teams).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting team: ${error.message}`);
        }
    });
   
    this.on('READ', 'Teams', async (req, next) => {
        try {
            // Add filter by autoid if provided
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
   
            // Add filter by roleid if provided
            if (req.data.roleid) {
                req.query.where({ roleid: req.data.roleid });
            }
   
            // Add filter by name if provided
            if (req.data.name) {
                req.query.where({ name: req.data.name });
            }
   
            // Execute the read operation with filtering
            return await next();
        } catch (error) {
            req.error(500, `Error filtering teams: ${error.message}`);
        }
    });

    this.on('CREATE', 'DDData', async (req) => {
        try {
            const { name, type, comptype } = req.data;
            const autoid = await this.run(SELECT.one.from(DDData).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
            const newEntry = {
                autoid: newID,
                name,
                type,
                comptype
            };
            return await this.run(INSERT.into(DDData).entries(newEntry));
        } catch (error) {
            req.error(500, `Error creating data: ${error.message}`);
        }
    });
    
    this.on('UPDATE', 'DDData', async (req) => {
        try {
            const { autoid, name, type, comptype } = req.data;
            return await this.run(UPDATE(DDData).set({ name, type, comptype }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating data: ${error.message}`);
        }
    });
    
    this.on('DELETE', 'DDData', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(DDData).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting data: ${error.message}`);
        }
    });
    
    this.on('READ', 'DDData', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
            if (req.data.name) {
                req.query.where({ name: req.data.name });
            }
            return await next();
        } catch (error) {
            req.error(500, `Error reading data: ${error.message}`);
        }
    });
    this.on('CREATE', 'Comments', async (req) => {
        try {
            const { comment, refid, type, created_by, created_datetime } = req.data;
            const autoid = await this.run(SELECT.one.from(Comments).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
            const newComment = {
                autoid: newID,
                comment,
                refid,
                type,
                created_by,
                created_datetime
            };
            return await this.run(INSERT.into(Comments).entries(newComment));
        } catch (error) {
            req.error(500, `Error creating comment: ${error.message}`);
        }
    });
    
    this.on('UPDATE', 'Comments', async (req) => {
        try {
            const { autoid, comment, refid, type, created_by, created_datetime } = req.data;
            return await this.run(UPDATE(Comments).set({ comment, refid, type, created_by, created_datetime }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating comment: ${error.message}`);
        }
    });
    
    this.on('DELETE', 'Comments', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Comments).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting comment: ${error.message}`);
        }
    });
    
    this.on('READ', 'Comments', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
            if (req.data.refid) {
                req.query.where({ refid: req.data.refid });
            }
            if (req.data.created_by) {
                req.query.where({ created_by: req.data.created_by });
            }
            return await next();
        } catch (error) {
            req.error(500, `Error reading comments: ${error.message}`);
        }
    });
    
    this.on('CREATE', 'Stages', async (req) => {
        try {
            const { name, description } = req.data;
            const autoid = await this.run(SELECT.one.from(Stages).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
            const newStage = {
                autoid: newID,
                name,
                description
            };
            return await this.run(INSERT.into(Stages).entries(newStage));
        } catch (error) {
            req.error(500, `Error creating stage: ${error.message}`);
        }
    });
    
    this.on('UPDATE', 'Stages', async (req) => {
        try {
            const { autoid, name, description } = req.data;
            return await this.run(UPDATE(Stages).set({ name, description }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating stage: ${error.message}`);
        }
    });
    
    this.on('DELETE', 'Stages', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Stages).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting stage: ${error.message}`);
        }
    });
    
    this.on('READ', 'Stages', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
            if (req.data.name) {
                req.query.where({ name: req.data.name });
            }
            return await next();
        } catch (error) {
            req.error(500, `Error reading stages: ${error.message}`);
        }
    });
    
 
            
    
    
   
})
 