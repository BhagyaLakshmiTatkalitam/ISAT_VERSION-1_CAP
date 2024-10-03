const cds = require('@sap/cds');
const customerHandlers = require('./handlers/cust-service');
module.exports = cds.service.impl(async function () {
    const { Projects, Users, DDType, Tasklist, Tasks, Roles,
        Customers_Projects, DDData, Comments, Teams, Stages, TimeCapture,
        Timelines, InterfaceDetails, Teams_Users, Component_TaskList,
        Phases, Issues, TaskNotes, TaskAttachments, Component_Stages, Users_Roles
    } = cds.entities;
    
    customerHandlers.register(this);
    // this.on('READ', 'Customers', async (req, next) => {
    //     try {
    //         if (req.data.autoid) {
    //             req.query.where({ autoid: req.data.autoid });
    //         }

    //         if (req.data.name) {
    //             req.query.where({ name: req.data.name });
    //         }
    //         return await next();
    //     } catch (error) {
    //         req.error(500, `Error filtering customers: ${error.message}`);
    //     }

    // });


    //--------------------------------------------------------------------------------
    //Projects Entity

    this.on('CREATE', 'Projects', async (req) => {
        try {
            const { projid, name, description, status } = req.data;
            const autoid = await this.run(SELECT.one.from(Projects).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
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
    this.on('UPDATE', 'Projects', async (req) => {
        try {
            const { autoid, projid, name, description, status } = req.data;
            return await this.run(UPDATE(Projects).set({ projid, name, description, status }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating project: ${error.message}`);
        }
    });
    this.on('DELETE', 'Projects', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Projects).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting project: ${error.message}`);
        }
    });
    // this.on('READ', 'Projects', async (req, next) => {
    //     try {
    //         if (req.data.autoid) {
    //             req.query.where({ autoid: req.data.autoid });
    //         }

    //         if (req.data.name) {
    //             req.query.where({ name: req.data.name });
    //         }
    //         return await next();
    //     } catch (error) {
    //         req.error(500, `Error filtering projects: ${error.message}`);
    //     }

    // });


    //---------------------------------------------------------------------
    //Users Entity
    this.on('CREATE', 'Users', async (req) => {
        try {
            const { userid, name, role, active, emailid, custid } = req.data;
            const autoid = await this.run(SELECT.one.from(Users).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
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
    this.on('UPDATE', 'Users', async (req) => {
        try {
            const { autoid, userid, name, role, active, emailid, custid } = req.data;
            return await this.run(UPDATE(Users).set({ userid, name, role, active, emailid, custid }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating user: ${error.message}`);
        }
    });
    this.on('DELETE', 'Users', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Users).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting user: ${error.message}`);
        }
    });
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

    //-------------------------------------------------------
    //DDType Entity
    this.on('CREATE', 'DDType', async (req) => {
        try {
            const { name, description } = req.data;
            const autoid = await this.run(SELECT.one.from(DDType).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
            const newDDType = {
                autoid: newID,
                name,
                description
            };
            return await this.run(INSERT.into(DDType).entries(newDDType));
        } catch (error) {
            req.error(500, `Error creating DDType: ${error.message}`);
        }
    })

    this.on('UPDATE', 'DDType', async (req) => {
        try {
            const { autoid, name, description } = req.data;
            return await this.run(UPDATE(DDType).set({ name, description }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating DDType: ${error.message}`);
        }
    });

    this.on('DELETE', 'DDType', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(DDType).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting DDType: ${error.message}`);
        }
    });

    this.on('READ', 'DDType', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }

            if (req.data.name) {
                req.query.where({ name: req.data.name });
            }
            return await next();
        } catch (error) {
            req.error(500, `Error filtering DDType: ${error.message}`);
        }

    });

    //--------------------------------------------------------------------
    //TaskList Entity
    this.on('CREATE', 'Tasklist', async (req) => {
        try {
            const { name, description } = req.data;
            const autoid = await this.run(SELECT.one.from(Tasklist).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
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
            const { autoid, name, description } = req.data;
            return await this.run(UPDATE(Tasklist).set({ name, description }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating tasklist: ${error.message}`);
        }
    });
    this.on('READ', 'Tasklist', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
            if (req.data.name) {
                req.query.where({ name: req.data.name });
            }
            return await next();
        } catch (error) {
            req.error(500, `Error filtering tasklists: ${error.message}`);
        }
    });

    this.on('DELETE', 'Tasklist', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Tasklist).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting tasklist: ${error.message}`);
        }
    });

    //----------------------------------------------------------
    //Roles Entity

    this.on('CREATE', 'Roles', async (req) => {
        try {
            const { roleid, name, description } = req.data;

            const autoid = await this.run(SELECT.one.from(Roles).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
            const newRole = {
                autoid: newID,
                roleid,
                name,
                description
            };


            return await this.run(INSERT.into(Roles).entries(newRole));
        } catch (error) {
            req.error(500, `Error creating role: ${error.message}`);
        }
    });

    this.on('UPDATE', 'Roles', async (req) => {
        try {
            const { autoid, roleid, name, description } = req.data;


            return await this.run(UPDATE(Roles).set({ roleid, name, description }).where({ autoid }));
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

    //------------------------------------------------------------
    // Customer_Projects

    this.on('CREATE', 'Customers_Projects', async (req) => {
        try {
            const { customer_id, proj_id } = req.data;
            const lastAutoID = await this.run(SELECT.one.from(Customers_Projects).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (lastAutoID.maxID >= startingID ? lastAutoID.maxID : startingID - 1) + 1;
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


    //---------------------------------
    //Teams Entity
    this.on('CREATE', 'Teams', async (req) => {
        try {
            const { teamid, name, description } = req.data;
            const autoid = await this.run(SELECT.one.from(Teams).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
            const newTeam = {
                autoid: newID,
                teamid,
                name,
                description,
            };
            return await this.run(INSERT.into(Teams).entries(newTeam));
        } catch (error) {
            req.error(500, `Error creating team: ${error.message}`);
        }
    });
    this.on('UPDATE', 'Teams', async (req) => {
        try {
            const { autoid, teamid, name, description } = req.data;
            return await this.run(UPDATE(Teams).set({ teamid, name, description }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating team: ${error.message}`);
        }
    });
    this.on('DELETE', 'Teams', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Teams).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting team: ${error.message}`);
        }
    });

    this.on('READ', 'Teams', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
            if (req.data.roleid) {
                req.query.where({ roleid: req.data.roleid });
            }
            if (req.data.name) {
                req.query.where({ name: req.data.name });
            }
            return await next();
        } catch (error) {
            req.error(500, `Error filtering teams: ${error.message}`);
        }
    });

    //-----------------------------------------------
    //DDData

    this.on('CREATE', 'DDData', async (req) => {
        try {
            const { name, value, ddType_id } = req.data;
            const autoid = await this.run(SELECT.one.from(DDData).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
            const newEntry = {
                autoid: newID,
                name,
                value,
                ddType_id
            };
            return await this.run(INSERT.into(DDData).entries(newEntry));
        } catch (error) {
            req.error(500, `Error creating data: ${error.message}`);
        }
    });

    this.on('UPDATE', 'DDData', async (req) => {
        try {
            const { autoid, name, value, ddType_id } = req.data;
            return await this.run(UPDATE(DDData).set({ name, value, ddType_id }).where({ autoid }));
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


    //------------------------------------------------
    //Comments Entity
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


    //----------------------------------------------
    //Stages Entity
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

    //Timecapture----------------------------------------
    this.on('CREATE', 'TimeCapture', async (req) => {
        try {
            const { start_time, end_time, task_id } = req.data;
            const autoid = await this.run(SELECT.one.from(TimeCapture).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
            const newTimecapture = {
                autoid: newID,
                start_time,
                end_time,
                task_id,
            };
            return await this.run(INSERT.into(TimeCapture).entries(newTimecapture));
        } catch (error) {
            req.error(500, `Error creating timecapture: ${error.message}`);
        }
    }),

        this.on('UPDATE', 'TimeCapture', async (req) => {

            try {
                const { autoid, start_time, end_time, task_id } = req.data;
                return await this.run(UPDATE(TimeCapture).set({ start_time, end_time, task_id }).where({ autoid }));
            } catch (error) {
                req.error(500, `Error updating timecapture: ${error.message}`);
            }
        });

    this.on('DELETE', 'TimeCapture', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(TimeCapture).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting timecapture: ${error.message}`);
        }
    });

    this.on('READ', 'TimeCapture', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }

            if (req.data.start_time) {
                req.query.where({ starttime: req.data.start_time });
            }


            return await next();
        } catch (error) {
            req.error(500, `Error filtering timecaptures: ${error.message}`);
        }

    });

   //Timelines-----------------------------------------
 
    this.on('CREATE', 'Timelines', async (req) => {
        try {
            const { start_datetime, end_datetime, refid, type } = req.data;
            const autoid = await this.run(SELECT.one.from(Timelines).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
            const timeline = {
                autoid: newID,
                start_datetime,
                end_datetime,
                refid,
                type

            };
            return await this.run(INSERT.into(Timelines).entries(timeline));
        } catch (error) {
            req.error(500, `Error creating Timelines: ${error.message}`);
        }
    })

    this.on('UPDATE', 'Timelines', async (req) => {
        try {
            const { autoid, start_datetime, end_datetime, refid, type } = req.data;
            return await this.run(UPDATE(Timelines).set({
                start_datetime,
                end_datetime,
                refid,
                type
            }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating Timelines: ${error.message}`);
        }
    });

    this.on('DELETE', 'Timelines', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Timelines).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting Timelines: ${error.message}`);
        }
    });

    this.on('READ', 'Timelines', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }

            if (req.data.refid) {
                req.query.where({ name: req.data.refid });
            }


            return await next();
        } catch (error) {
            req.error(500, `Error filtering Timelines: ${error.message}`);
        }

    });

    //InterfaceDetails-------------------------------------------
    this.on('CREATE', 'InterfaceDetails', async (req) => {
        try {
            const {
                name, description, module, package, senderssystem,
                receiversystem, process, sourceadapter, targetadapter, techpoc,
                functionalpoc, businesspoc, doctype, frequency, ccenabled
            } = req.data;

            const lastAutoID = await this.run(SELECT.one.from(InterfaceDetails).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (lastAutoID.maxID >= startingID ? lastAutoID.maxID : startingID - 1) + 1;

            const newEntry = {
                autoid: newID,
                name,
                description,
                module,
                package,
                senderssystem,
                receiversystem,
                process,
                sourceadapter,
                targetadapter,
                techpoc,
                functionalpoc,
                businesspoc,
                doctype,
                frequency,
                ccenabled
            };

            return await this.run(INSERT.into(InterfaceDetails).entries(newEntry));
        } catch (error) {
            req.error(500, `Error creating InterfaceDetails: ${error.message}`);
        }
    });

    this.on('READ', 'InterfaceDetails', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
            if (req.data.name) {
                req.query.where({ name: req.data.name });
            }

            return await next();
        } catch (error) {
            req.error(500, `Error reading InterfaceDetails: ${error.message}`);
        }
    });

    this.on('UPDATE', 'InterfaceDetails', async (req) => {
        try {
            const {
                autoid, name, description, module, package, senderssystem,
                receiversystem, process, sourceadapter, targetadapter, techpoc,
                functionalpoc, businesspoc, doctype, frequency, ccenabled
            } = req.data;

            return await this.run(
                UPDATE(InterfaceDetails)
                    .set({
                        name,
                        description,
                        module,
                        package,
                        senderssystem,
                        receiversystem,
                        process,
                        sourceadapter,
                        targetadapter,
                        techpoc,
                        functionalpoc,
                        businesspoc,
                        doctype,
                        frequency,
                        ccenabled
                    })
                    .where({ autoid })
            );
        } catch (error) {
            req.error(500, `Error updating InterfaceDetails: ${error.message}`);
        }
    });

    this.on('DELETE', 'InterfaceDetails', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(InterfaceDetails).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting InterfaceDetails: ${error.message}`);
        }
    });


    //Teams_Users--------------------------------------------------
    this.on('CREATE', 'Teams_Users', async (req) => {

        try {

            const { team_id, user_id, active } = req.data;

            const lastAutoID = await this.run(SELECT.one.from(Teams_Users).columns('max(autoid) as maxID'));

            const startingID = 1000000;

            const newID = (lastAutoID.maxID >= startingID ? lastAutoID.maxID : startingID - 1) + 1;

            const newEntry = {

                autoid: newID,

                team_id,

                user_id,

                active

            };

            return await this.run(INSERT.into(Teams_Users).entries(newEntry));

        } catch (error) {

            req.error(500, `Error creating Teams_Users entry: ${error.message}`);

        }

    });

    this.on('READ', 'Teams_Users', async (req, next) => {

        try {

            if (req.data.autoid) {

                req.query.where({ autoid: req.data.autoid });

            }

            if (req.data.team_id) {

                req.query.where({ team_id: req.data.team_id });

            }

            if (req.data.user_id) {

                req.query.where({ user_id: req.data.user_id });

            }

            return await next();

        } catch (error) {

            req.error(500, `Error reading Teams_Users entries: ${error.message}`);

        }

    });

    this.on('UPDATE', 'Teams_Users', async (req) => {

        try {
            const { autoid, team_id, user_id, active } = req.data;
            return await this.run(
                UPDATE(Teams_Users)

                    .set({ team_id, user_id, active })

                    .where({ autoid })
            );
        } catch (error) {
            req.error(500, `Error updating Teams_Users entry: ${error.message}`);
        }
    });

    this.on('DELETE', 'Teams_Users', async (req) => {

        try {

            const { autoid } = req.data;

            return await this.run(DELETE.from(Teams_Users).where({ autoid }));

        } catch (error) {

            req.error(500, `Error deleting Teams_Users entry: ${error.message}`);

        }

    });

    //Component_Tasklist----------------------------------

    this.on('CREATE', 'Component_TaskList', async (req) => {

        try {

            const {
                tasklist_id,
                stage_id } = req.data;

            const lastAutoID = await this.run(SELECT.one.from(Component_TaskList).columns('max(autoid) as maxID'));

            const startingID = 1000000;

            const newID = (lastAutoID.maxID >= startingID ? lastAutoID.maxID : startingID - 1) + 1;

            const newEntry = {

                autoid: newID,
                tasklist_id,
                stage_id

            };

            return await this.run(INSERT.into(Component_TaskList).entries(newEntry));

        } catch (error) {

            req.error(500, `Error creating Component_TaskList entry: ${error.message}`);

        }

    });

    this.on('READ', 'Component_TaskList', async (req, next) => {
        try {
            if (req.data.autoid) {

                req.query.where({ autoid: req.data.autoid });
            }
            return await next();

        } catch (error) {

            req.error(500, `Error reading Component_TaskList entries: ${error.message}`);
        }
    });

    this.on('UPDATE', 'Component_TaskList', async (req) => {

        try {
            const { autoid,
                tasklist_id,
                stage_id } = req.data;
            return await this.run(
                UPDATE(Component_TaskList)
                    .set({
                        tasklist_id,
                        stage_id
                    })

                    .where({ autoid })
            );

        } catch (error) {

            req.error(500, `Error updating Component_TaskList entry: ${error.message}`);
        }

    });

    this.on('DELETE', 'Component_TaskList', async (req) => {

        try {
            const { autoid } = req.data;

            return await this.run(DELETE.from(Component_TaskList).where({ autoid }));

        } catch (error) {

            req.error(500, `Error deleting Component_TaskList entry: ${error.message}`);
        }
    });

    //Tasks----------------------------------------------
    this.on('CREATE', 'Tasks', async (req) => {

        try {

            const { task_name, duration, startdate, enddate, status, type, parent_task_id, assignedto, created_by,
                updated_datetime,
                created_datetime,
                updated_by, tasklist_id } = req.data;

            const autoid = await this.run(SELECT.one.from(Tasks).columns('max(autoid) as maxID'));

            const startingID = 1000000;

            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;

            const newTask = {

                autoid: newID,
                task_name,
                duration,
                startdate,
                enddate,
                status,
                type,
                parent_task_id,
                assignedto,
                created_by,
                updated_datetime,
                created_datetime,
                updated_by,
                tasklist_id

            };

            return await this.run(INSERT.into(Tasks).entries(newTask));

        } catch (error) {

            req.error(500, `Error creating task: ${error.message}`);

        }

    });
    this.on('UPDATE', 'Tasks', async (req) => {

        try {

            const { autoid, task_name, duration, startdate, enddate, status, type, parent_task_id, assignedto, created_by,
                updated_datetime,
                created_datetime,
                updated_by, tasklist_id } = req.data;

            return await this.run(

                UPDATE(Tasks)

                    .set({
                        task_name,
                        duration,
                        startdate,
                        enddate,
                        status,
                        type,
                        parent_task_id,
                        assignedto,
                        created_by,
                        updated_datetime,
                        created_datetime,
                        updated_by,
                        tasklist_id
                    })
                    .where({ autoid })
            );
        } catch (error) {
            req.error(500, `Error updating task: ${error.message}`);
        }
    });

    this.on('DELETE', 'Tasks', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Tasks).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting task: ${error.message}`);
        }
    });

    this.on('READ', 'Tasks', async (req, next) => {

        try {

            if (req.data.autoid) {

                req.query.where({ autoid: req.data.autoid });

            }

            if (req.data.task_name) {

                req.query.where({ task_name: req.data.task_name });

            }

            return await next(); 

        } catch (error) {

            req.error(500, `Error filtering tasks: ${error.message}`);

        }

    });
    // CREATE handler for Phases
    this.on('CREATE', 'Phases', async (req) => {
        try {
            const { phase_name } = req.data;
            const lastAutoID = await this.run(SELECT.one.from(Phases).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (lastAutoID.maxID >= startingID ? lastAutoID.maxID : startingID - 1) + 1;

            const newPhase = {
                autoid: newID,
                phase_name
            };

            return await this.run(INSERT.into(Phases).entries(newPhase));
        } catch (error) {
            req.error(500, `Error creating Phase: ${error.message}`);
        }
    });

    // READ handler for Phases
    this.on('READ', 'Phases', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
            if (req.data.phase_name) {
                req.query.where({ phase_name: req.data.phase_name });
            }
            return await next();
        } catch (error) {
            req.error(500, `Error reading Phases: ${error.message}`);
        }
    });

    // UPDATE handler for Phases
    this.on('UPDATE', 'Phases', async (req) => {
        try {
            const { autoid, phase_name } = req.data;
            return await this.run(
                UPDATE(Phases)
                    .set({ phase_name })
                    .where({ autoid })
            );
        } catch (error) {
            req.error(500, `Error updating Phase: ${error.message}`);
        }
    });

    // DELETE handler for Phases
    this.on('DELETE', 'Phases', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Phases).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting Phase: ${error.message}`);
        }
    });

    this.on('CREATE', 'Issues', async (req) => {
        try {
            const { issueDesc,
                detailedDesc,
                type,
                status,
                createdBy,
                updatedBy,
                createdTime,
                updatedTime } = req.data;
            const lastAutoID = await this.run(SELECT.one.from(Issues).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (lastAutoID.maxID >= startingID ? lastAutoID.maxID : startingID - 1) + 1;

            const newIssues = {
                autoid: newID,
                issueDesc,
                detailedDesc,
                type,
                status,
                createdBy,
                updatedBy,
                createdTime,
                updatedTime
            };

            return await this.run(INSERT.into(Issues).entries(newIssues));
        } catch (error) {
            req.error(500, `Error creating Issues: ${error.message}`);
        }
    });

    // READ handler for Phases
    this.on('READ', 'Issues', async (req, next) => {
        try {
            if (req.data.autoid) {
                req.query.where({ autoid: req.data.autoid });
            }
            if (req.data.issueDesc) {
                req.query.where({ issueDesc: req.data.issueDesc });
            }
            return await next();
        } catch (error) {
            req.error(500, `Error reading Issues: ${error.message}`);
        }
    });

    // UPDATE handler for Phases
    this.on('UPDATE', 'Issues', async (req) => {
        try {
            const { autoid, issueDesc,
                detailedDesc,
                type,
                status,
                createdBy,
                updatedBy,
                createdTime,
                updatedTime } = req.data;
            return await this.run(
                UPDATE(Issues)
                    .set({
                        issueDesc,
                        detailedDesc,
                        type,
                        status,
                        createdBy,
                        updatedBy,
                        createdTime,
                        updatedTime
                    })
                    .where({ autoid })
            );
        } catch (error) {
            req.error(500, `Error updating Issues: ${error.message}`);
        }
    });

    // DELETE handler for Phases
    this.on('DELETE', 'Issues', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Issues).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting Issues: ${error.message}`);
        }
    });


    this.on('CREATE', 'TaskNotes', async (req) => {

        try {

            const { task_id, notes, name } = req.data;

            const autoid = await this.run(SELECT.one.from(TaskNotes).columns('max(autoid) as maxID'));

            const startingID = 1000000;

            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;

            const newTaskNote = {

                autoid: newID,
                task_id,
                notes,
                name

            };

            return await this.run(INSERT.into(TaskNotes).entries(newTaskNote));

        } catch (error) {

            req.error(500, `Error creating task: ${error.message}`);

        }

    });
    this.on('UPDATE', 'TaskNotes', async (req) => {

        try {

            const { autoid, task_id, notes, name } = req.data;

            return await this.run(

                UPDATE(TaskNotes)

                    .set({
                        task_id, notes, name
                    })
                    .where({ autoid })
            );
        } catch (error) {
            req.error(500, `Error updating task: ${error.message}`);
        }
    });

    this.on('DELETE', 'TaskNotes', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(TaskNotes).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting task: ${error.message}`);
        }
    });

    this.on('READ', 'TaskNotes', async (req, next) => {

        try {

            if (req.data.autoid) {

                req.query.where({ autoid: req.data.autoid });

            }

            if (req.data.name) {

                req.query.where({ name: req.data.name });

            }

            return await next();

        } catch (error) {

            req.error(500, `Error filtering tasks: ${error.message}`);

        }

    });
    this.on('CREATE', 'TaskAttachments', async (req) => {

        try {

            const { task_id,
                attachmenturl,
                name,
                type } = req.data;

            const autoid = await this.run(SELECT.one.from(TaskAttachments).columns('max(autoid) as maxID'));

            const startingID = 1000000;

            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;

            const newTaskAttachment = {

                autoid: newID,
                task_id,
                attachmenturl,
                name,
                type

            };

            return await this.run(INSERT.into(TaskAttachments).entries(newTaskAttachment));

        } catch (error) {

            req.error(500, `Error creating task: ${error.message}`);

        }

    });
    this.on('UPDATE', 'TaskAttachments', async (req) => {

        try {

            const { autoid, task_id,
                attachmenturl,
                name,
                type } = req.data;

            return await this.run(

                UPDATE(TaskAttachments)

                    .set({
                        task_id,
                        attachmenturl,
                        name,
                        type
                    })
                    .where({ autoid })
            );
        } catch (error) {
            req.error(500, `Error updating task: ${error.message}`);
        }
    });

    this.on('DELETE', 'TaskAttachments', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(TaskAttachments).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting task: ${error.message}`);
        }
    });

    this.on('READ', 'TaskAttachments', async (req, next) => {

        try {

            if (req.data.autoid) {

                req.query.where({ autoid: req.data.autoid });

            }

            if (req.data.name) {

                req.query.where({ name: req.data.name });

            }

            return await next();

        } catch (error) {

            req.error(500, `Error filtering tasks: ${error.message}`);

        }

    });

    this.on('CREATE', 'Component_Stages', async (req) => {

        try {

            const {
                stage_id,
                status } = req.data;

            const autoid = await this.run(SELECT.one.from(Component_Stages).columns('max(autoid) as maxID'));

            const startingID = 1000000;

            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;

            const component_stages = {

                autoid: newID,
                stage_id,
                status

            };

            return await this.run(INSERT.into(Component_Stages).entries(component_stages));

        } catch (error) {

            req.error(500, `Error creating task: ${error.message}`);

        }

    });
    this.on('UPDATE', 'Component_Stages', async (req) => {

        try {

            const { autoid,
                stage_id,
                status } = req.data;

            return await this.run(

                UPDATE(Component_Stages)

                    .set({
                        stage_id,
                        status
                    })
                    .where({ autoid })
            );
        } catch (error) {
            req.error(500, `Error updating task: ${error.message}`);
        }
    });

    this.on('DELETE', 'Component_Stages', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Component_Stages).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting task: ${error.message}`);
        }
    });

    this.on('READ', 'Component_Stages', async (req, next) => {

        try {

            if (req.data.autoid) {

                req.query.where({ autoid: req.data.autoid });

            }

            if (req.data.name) {

                req.query.where({ name: req.data.name });

            }

            return await next(); // Continue with the default CAP framework query

        } catch (error) {

            req.error(500, `Error filtering tasks: ${error.message}`);

        }

    });

    this.on('CREATE', 'Users_Roles', async (req) => {

        try {

            const { user_id,
                role_id
            } = req.data;

            // Fetch the maximum `autoid` from the Tasks table

            const autoid = await this.run(SELECT.one.from(Users_Roles).columns('max(autoid) as maxID'));

            const startingID = 1000000;

            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;

            const component_stages = {

                autoid: newID,
                user_id,
                role_id

            };

            return await this.run(INSERT.into(Users_Roles).entries(component_stages));

        } catch (error) {

            req.error(500, `Error creating task: ${error.message}`);

        }

    });
    this.on('UPDATE', 'Users_Roles', async (req) => {

        try {

            const { autoid, user_id,
                role_id,
            } = req.data;

            return await this.run(

                UPDATE(Users_Roles)

                    .set({
                        user_id,
                        role_id
                    })
                    .where({ autoid })
            );
        } catch (error) {
            req.error(500, `Error updating task: ${error.message}`);
        }
    });

    this.on('DELETE', 'Users_Roles', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Users_Roles).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting task: ${error.message}`);
        }
    });

    this.on('READ', 'Users_Roles', async (req, next) => {

        try {

            if (req.data.autoid) {

                req.query.where({ autoid: req.data.autoid });

            }

            return await next(); // Continue with the default CAP framework query

        } catch (error) {

            req.error(500, `Error filtering tasks: ${error.message}`);

        }

    });
   
this.on('READ', 'Customers', async (req, next) => {
    try {
        const searchValue = req.data.search || '';  // Assuming 'search' is the input variable for search
        
        if (searchValue) {
            // Modify the query to search across multiple columns using OR and LIKE
            req.query.where(
                `LOWER(custid) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(name) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(location) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(description) LIKE LOWER('%${searchValue}%')`
            );
        }
        
        return await next(); 
    } catch (error) {
        req.error(500, `Error searching Customers: ${error.message}`);
    }
});

// this.on('READ', 'Projects', async (req, next) => {
//     try {
//         const searchValue = req.data.search || '';  
//         if (searchValue) {
           
//             req.query.where(
//                ` LOWER(projid) LIKE LOWER('%${searchValue}%') OR 
//                  LOWER(name) LIKE LOWER('%${searchValue}%') OR 
//                  LOWER(CAST(status AS VARCHAR)) LIKE LOWER('%${searchValue}%') OR 
//                  LOWER(description) LIKE LOWER('%${searchValue}%')`
//             );
//         }
        
//         return await next(); // Continue with the default CAP framework query
//     } catch (error) {
//         req.error(500,` Error searching Projects: ${error.message}`);
//     }
// });
// this.on('READ', 'Projects', async (req, next) => {
//     try {
//         const searchValue = req.data.search || ''; // Search input

//         if (searchValue) {
//             const lowerSearchValue = searchValue.toLowerCase();
            
//             // Construct the query with explicit type conversion to string
//             req.query.where(`
//                 LOWER(CAST(projid AS VARCHAR)) LIKE LOWER('%${searchValue}%') OR
//                 LOWER(CAST(name AS VARCHAR)) LIKE LOWER('%${searchValue}%') OR
//                 LOWER(CAST(status AS VARCHAR)) LIKE LOWER('%${searchValue}%') OR
//                 LOWER(CAST(description AS VARCHAR)) LIKE LOWER('%${searchValue}%')
//             `);
//         }

//         return await next(); 
//     } catch (error) {
//         req.error(500, `Error searching Projects: ${error.message}`);
//     }
// });


// this.on('READ', 'Projects', async (req, next) => {
//     try {
//         const searchValue = req.data.search || '';  

//         if (searchValue) {
//             // Convert searchValue to a string for text fields
//             const stringifiedSearch = searchValue.toString().toLowerCase();

//             // Check if searchValue is numeric for status field
//             const isNumeric = !isNaN(searchValue); 

//             req.query.where(
//                 ` LOWER(projid) LIKE '%${stringifiedSearch}%' OR 
//                   LOWER(name) LIKE '%${stringifiedSearch}%' OR 
//                   LOWER(description) LIKE '%${stringifiedSearch}%' OR
//                   `
//             );
//         }
        
//         return await next(); // Continue with the default CAP framework query
//     } catch (error) {
//         req.error(500, `Error searching Projects: ${error.message}`);
//     }
// });
this.on('READ', 'Projects', async (req, next) => {
    try {
        const searchValue = req.data.search || '';

        if (searchValue) {
            const queryFilters = [];

            // Handle Integer search
            if (!isNaN(searchValue)) {
                queryFilters.push(`autoid = ${searchValue}`);
            }

            // Handle Boolean search
            if (searchValue.toLowerCase() === 'true' || searchValue.toLowerCase() === 'false') {
                const boolValue = searchValue.toLowerCase() === 'true';
                queryFilters.push(`status = ${boolValue}`);
            }

            // Handle Date search (assuming date in YYYY-MM-DD format)
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (dateRegex.test(searchValue)) {
                queryFilters.push(`CAST(projid AS Date) = '${searchValue}'`);
            }

            // Handle String search for multiple fields using OR and LIKE
            queryFilters.push(
                `LOWER(projid) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(name) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(description) LIKE LOWER('%${searchValue}%')`
            );

            // Combine all filters using OR condition
            console.log(queryFilters);
            req.query.where(queryFilters.join(' OR '));
        }

        return await next(); 
    } catch (error) {
        req.error(500, `Error searching Projects: ${error.message}`);
    }
});


this.on('READ', 'Users', async (req, next) => {
    try {
        const searchValue = req.data.search || '';  
        if (searchValue) {
           
            req.query.where(
               ` LOWER(userid) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(name) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(role) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(active) LIKE LOWER('%${searchValue}%') OR
                 LOWER(emailid) LIKE LOWER('%${searchValue}%') OR
                 LOWER(custid) LIKE LOWER('%${searchValue}%')`
            );
        }
        
        return await next(); 
    } catch (error) {
        req.error(500,` Error searching Users: ${error.message}`);
    }
});

this.on('READ', 'DDType', async (req, next) => {
    try {
        const searchValue = req.data.search || '';  // Assuming 'search' is the input variable for search
        
        if (searchValue) {
            req.query.where(
                `LOWER(name) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(description) LIKE LOWER('%${searchValue}%')`
            );
        }
        
        return await next(); 
    } catch (error) {
        req.error(500, `Error searching DDType: ${error.message}`);
    }
});

this.on('READ', 'Tasklist', async (req, next) => {
    try {
        const searchValue = req.data.search || '';  // Assuming 'search' is the input variable for search
        
        if (searchValue) {
            // Modify the query to search across multiple columns using OR and LIKE
            req.query.where(
                `LOWER(name) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(description) LIKE LOWER('%${searchValue}%')`
            );
        }
        
        return await next(); 
    } catch (error) {
        req.error(500, `Error searching Tasklist: ${error.message}`);
    }
});
this.on('READ', 'Roles', async (req, next) => {
    try {
        const searchValue = req.data.search || '';  
        
        if (searchValue) {
            req.query.where(

                `LOWER(roleid) LIKE LOWER('%${searchValue}%') OR 
                LOWER(name) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(description) LIKE LOWER('%${searchValue}%')`
            );
        }
        
        return await next(); 
    } catch (error) {
        req.error(500, `Error searching Roles: ${error.message}`);
    }
});
// this.on('READ', 'Teams', async (req, next) => {
//     try {
//         const searchValue = req.data.search || '';  
        
//         if (searchValue) {
//             req.query.where(

//                 `LOWER(teamid) LIKE LOWER('%${searchValue}%') OR 
//                 LOWER(name) LIKE LOWER('%${searchValue}%') OR 
//                  LOWER(description) LIKE LOWER('%${searchValue}%')`
//             );
//         }
        
//         return await next(); 
//     } catch (error) {
//         req.error(500, `Error searching Teams: ${error.message}`);
//     }
// });

this.on('READ', 'Teams', async (req, next) => {
    try {
        const searchValue = req.data.search || '';

        if (searchValue) {
            const searchLower = searchValue.toLowerCase();

            req.query.where(
                `autoid = ${parseInt(searchValue)} OR
                LOWER(teamid) LIKE '%${searchLower}%' OR
                LOWER(name) LIKE '%${searchLower}%' OR
                LOWER(description) LIKE '%${searchLower}%')`
            );
        }

        return await next();
    } catch (error) {
        req.error(500, `Error searching Teams: ${error.message}`);
    }
});


this.on('READ', 'InterfaceDetails', async (req, next) => {
    try {
        const searchValue = req.data.search || '';  
        if (searchValue) {
                       req.query.where(
                `LOWER(name) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(description) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(module) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(package) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(senderssystem) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(receiversystem) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(process) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(sourceadapter) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(targetadapter) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(techpoc) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(functionalpoc) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(businesspoc) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(doctype) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(frequency) LIKE LOWER('%${searchValue}%') OR 
                 ccenabled=${searchValue}`
            );
        }
        
        return await next(); // Continue with the default CAP framework query
    } catch (error) {
        req.error(500, `Error searching InterfaceDetails: ${error.message}`);
    }
});
this.on('READ', 'Issues', async (req, next) => {
    try {
        const searchValue = req.data.search || '';  // Capture the search input
        
        if (searchValue) {
            // Modify the query to search across multiple columns using OR and LIKE
            req.query.where(
                `LOWER(issueDesc) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(detailedDesc) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(type) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(status) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(createdBy) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(updatedBy) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(createdTime) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(updatedTime) LIKE LOWER('%${searchValue}%')`
            );
        }
        
        return await next(); // Continue with the default CAP framework query
    } catch (error) {
        req.error(500, `Error searching Issues: ${error.message}`);
    }
});
this.on('READ', 'Stages', async (req, next) => {
    try {
        const searchValue = req.data.search || '';  
        
        if (searchValue) {
            req.query.where(

                `LOWER(name) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(description) LIKE LOWER('%${searchValue}%')`
            );
        }
        
        return await next(); 
    } catch (error) {
        req.error(500, `Error searching Stages: ${error.message}`);
    }
});
this.on('READ', 'Phases', async (req, next) => {
    try {
        const searchValue = req.data.search || '';  
        
        if (searchValue) {
            req.query.where(

                `LOWER(phase_name) LIKE LOWER('%${searchValue}%')`
            );
        }
        
        return await next(); 
    } catch (error) {
        req.error(500, `Error searching Phases: ${error.message}`);
    }
});
this.on('READ', 'Tasks', async (req, next) => {
    try {
        const searchValue = req.data.$search || '';  // Get the search parameter

        if (searchValue) {
            let conditions = [];

            // Check if the search value is a number for integer fields
            const numericValue = parseFloat(searchValue);
            if (!isNaN(numericValue)) {
                conditions.push(`autoid = ${numericValue}`);       // Search by autoid
                conditions.push(`parent_task_id = ${numericValue}`); // Search by parent_task_id
            }

            // Create conditions for string fields using LIKE
            const searchString = searchValue.toLowerCase();
            conditions.push(`
                LOWER(task_name) LIKE LOWER('%${searchString}%') OR 
                LOWER(duration) LIKE LOWER('%${searchString}%') OR 
                LOWER(status) LIKE LOWER('%${searchString}%') OR 
                LOWER(type) LIKE LOWER('%${searchString}%') OR 
                LOWER(assignedto) LIKE LOWER('%${searchString}%') OR 
                LOWER(created_by) LIKE LOWER('%${searchString}%') OR 
                LOWER(updated_by) LIKE LOWER('%${searchString}%')
            `);

            // Check if the search value is a valid date
            const dateValue = new Date(searchValue);
            if (!isNaN(dateValue.getTime())) {
                conditions.push(`startdate = '${dateValue.toISOString()}'`); // Search by startdate
                conditions.push(`enddate = '${dateValue.toISOString()}'`);   // Search by enddate
            }

            // Combine all conditions with OR
            req.query.where(conditions.join(' OR '));
        }

        return await next(); // Continue with the request
    } catch (error) {
        req.error(500, `Error searching Tasks: ${error.message}`); // Error handling
    }
});


});

 