const cds=require('@sap/cds');
module.exports = {
    register:(srv)=>{
        const{Tasks,Tasklist,TimeCapture,TaskAttachments,TaskNotes,Stages,Component_Stages,Component_TaskList} = cds.entities;

        srv.on('CREATE', 'Tasks', async (req) => {

            try {
    
                const { task_name, duration, startdate, enddate, status, type, parent_task_id, assignedto, created_by,
                    updated_datetime,
                    created_datetime,
                    updated_by, tasklist_id } = req.data;
    
                const autoid = await srv.run(SELECT.one.from(Tasks).columns('max(autoid) as maxID'));
    
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
    
                return await srv.run(INSERT.into(Tasks).entries(newTask));
    
            } catch (error) {
    
                req.error(500, `Error creating task: ${error.message}`);
    
            }
    
        });

        srv.on('READ', 'Tasks', async (req, next) => {

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

        srv.on('UPDATE', 'Tasks', async (req) => {

            try {
    
                const { autoid, task_name, duration, startdate, enddate, status, type, parent_task_id, assignedto, created_by,
                    updated_datetime,
                    created_datetime,
                    updated_by, tasklist_id } = req.data;
    
                return await srv.run(
    
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

        srv.on('DELETE', 'Tasks', async (req) => {
            try {
                const { autoid } = req.data;
                return await srv.run(DELETE.from(Tasks).where({ autoid }));
            } catch (error) {
                req.error(500, `Error deleting task: ${error.message}`);
            }
        });

        srv.on('READ', 'Tasks', async (req, next) => {
            try {
                const searchValue = req.data.search || '';
    
                if (searchValue) {
                    req.query.where(
                        `LOWER(task_name) LIKE LOWER('%${searchValue}%') OR 
                     LOWER(duration) LIKE LOWER('%${searchValue}%')  OR
                     LOWER(startdate) LIKE LOWER('%${searchValue}%') OR 
                     LOWER(enddate) LIKE LOWER('%${searchValue}%') OR 
                     LOWER(status) LIKE LOWER('%${searchValue}%') OR 
                     LOWER(type) LIKE LOWER('%${searchValue}%') OR 
                     LOWER(parent_task_id) LIKE LOWER('%${searchValue}%') OR 
                     LOWER(assignedto) LIKE LOWER('%${searchValue}%') OR
                     LOWER(created_by) LIKE LOWER('%${searchValue}%') OR
                     LOWER(updated_datetime) LIKE LOWER('%${searchValue}%') OR
                     LOWER(created_datetime) LIKE LOWER('%${searchValue}%') OR
                     LOWER(updated_by) LIKE LOWER('%${searchValue}%') OR
                     LOWER(tasklist_id) LIKE LOWER('%${searchValue}%')`
                    );
                }
    
                return await next();
            } catch (error) {
                req.error(500, `Error searching Tasks: ${error.message}`);
            }
        });

         //Tasklist ..................................

         srv.on('CREATE', 'Tasklist', async (req) => {
            try {
                const { name, description } = req.data;
                const autoid = await srv.run(SELECT.one.from(Tasklist).columns('max(autoid) as maxID'));
                const startingID = 1000000;
                const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
                const newTasklist = {
                    autoid: newID,
                    name,
                    description
                };
                return await srv.run(INSERT.into(Tasklist).entries(newTasklist));
            } catch (error) {
                req.error(500, `Error creating tasklist: ${error.message}`);
            }
        });

        srv.on('READ', 'Tasklist', async (req, next) => {
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

        srv.on('UPDATE', 'Tasklist', async (req) => {
            try {
                const { autoid, name, description } = req.data;
                return await srv.run(UPDATE(Tasklist).set({ name, description }).where({ autoid }));
            } catch (error) {
                req.error(500, `Error updating tasklist: ${error.message}`);
            }
        });

        srv.on('DELETE', 'Tasklist', async (req) => {
            try {
                const { autoid } = req.data;
                return await srv.run(DELETE.from(Tasklist).where({ autoid }));
            } catch (error) {
                req.error(500, `Error deleting tasklist: ${error.message}`);
            }
        });


        srv.on('READ', 'Tasklist', async (req, next) => {
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
                req.error(500, `Error searching Tasklist: ${error.message}`);
            }
        });

        //Timecapture .............................

        srv.on('CREATE', 'TimeCapture', async (req) => {
            try {
                const { start_time, end_time, task_id } = req.data;
                const autoid = await srv.run(SELECT.one.from(TimeCapture).columns('max(autoid) as maxID'));
                const startingID = 1000000;
                const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
                const newTimecapture = {
                    autoid: newID,
                    start_time,
                    end_time,
                    task_id,
                };
                return await srv.run(INSERT.into(TimeCapture).entries(newTimecapture));
            } catch (error) {
                req.error(500, `Error creating timecapture: ${error.message}`);
            }
        });

        srv.on('READ', 'TimeCapture', async (req, next) => {
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

        srv.on('UPDATE', 'TimeCapture', async (req) => {

            try {
                const { autoid, start_time, end_time, task_id } = req.data;
                return await srv.run(UPDATE(TimeCapture).set({ start_time, end_time, task_id }).where({ autoid }));
            } catch (error) {
                req.error(500, `Error updating timecapture: ${error.message}`);
            }
        });

    srv.on('DELETE', 'TimeCapture', async (req) => {
        try {
            const { autoid } = req.data;
            return await srv.run(DELETE.from(TimeCapture).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting timecapture: ${error.message}`);
        }
    });

    srv.on('READ', 'TimeCapture', async (req, next) => {
        try {
            const searchValue = req.data.search || '';

            if (searchValue) {
                req.query.where(
                    `LOWER(start_time) LIKE LOWER('%${searchValue}%') OR 
                     LOWER(end_time) LIKE LOWER('%${searchValue}%')   OR
                     LOWER(task_id ) LIKE LOWER('%${searchValue}%')`
                );
            }

            return await next();
        } catch (error) {
            req.error(500, `Error searching TimeCapture: ${error.message}`);
        }
    });
    
 //TaskAttachments ...............................

    srv.on('CREATE', 'TaskAttachments', async (req) => {

        try {

            const { task_id,
                attachmenturl,
                name,
                type } = req.data;

            const autoid = await srv.run(SELECT.one.from(TaskAttachments).columns('max(autoid) as maxID'));

            const startingID = 1000000;

            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;

            const newTaskAttachment = {

                autoid: newID,
                task_id,
                attachmenturl,
                name,
                type

            };

            return await srv.run(INSERT.into(TaskAttachments).entries(newTaskAttachment));

        } catch (error) {

            req.error(500, `Error creating task: ${error.message}`);

        }

    });

    srv.on('READ', 'TaskAttachments', async (req, next) => {

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

    srv.on('UPDATE', 'TaskAttachments', async (req) => {

        try {

            const { autoid, task_id,
                attachmenturl,
                name,
                type } = req.data;

            return await srv.run(

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

    srv.on('DELETE', 'TaskAttachments', async (req) => {
        try {
            const { autoid } = req.data;
            return await srv.run(DELETE.from(TaskAttachments).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting task: ${error.message}`);
        }
    });

    //TaskNotes ..................................

    srv.on('CREATE', 'TaskNotes', async (req) => {

        try {

            const { task_id, notes, name } = req.data;

            const autoid = await srv.run(SELECT.one.from(TaskNotes).columns('max(autoid) as maxID'));

            const startingID = 1000000;

            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;

            const newTaskNote = {

                autoid: newID,
                task_id,
                notes,
                name

            };

            return await srv.run(INSERT.into(TaskNotes).entries(newTaskNote));

        } catch (error) {

            req.error(500, `Error creating task: ${error.message}`);

        }

    });

    srv.on('READ', 'TaskNotes', async (req, next) => {

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

    srv.on('UPDATE', 'TaskNotes', async (req) => {

        try {

            const { autoid, task_id, notes, name } = req.data;

            return await srv.run(

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

    srv.on('DELETE', 'TaskNotes', async (req) => {
        try {
            const { autoid } = req.data;
            return await srv.run(DELETE.from(TaskNotes).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting task: ${error.message}`);
        }
    });

      //Stages ........................................

      srv.on('CREATE', 'Stages', async (req) => {
        try {
            const { name, description } = req.data;
            const autoid = await srv.run(SELECT.one.from(Stages).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
            const newStage = {
                autoid: newID,
                name,
                description
            };
            return await srv.run(INSERT.into(Stages).entries(newStage));
        } catch (error) {
            req.error(500, `Error creating stage: ${error.message}`);
        }
    });

    srv.on('READ', 'Stages', async (req, next) => {
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

    srv.on('UPDATE', 'Stages', async (req) => {
        try {
            const { autoid, name, description } = req.data;
            return await srv.run(UPDATE(Stages).set({ name, description }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating stage: ${error.message}`);
        }
    });

    srv.on('DELETE', 'Stages', async (req) => {
        try {
            const { autoid } = req.data;
            return await srv.run(DELETE.from(Stages).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting stage: ${error.message}`);
        }
    });

    srv.on('READ', 'Stages', async (req, next) => {
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

    //Component_Stages .......................................

    srv.on('CREATE', 'Component_Stages', async (req) => {

        try {

            const {
                stage_id,
                status } = req.data;

            const autoid = await srv.run(SELECT.one.from(Component_Stages).columns('max(autoid) as maxID'));

            const startingID = 1000000;

            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;

            const component_stages = {

                autoid: newID,
                stage_id,
                status

            };

            return await srv.run(INSERT.into(Component_Stages).entries(component_stages));

        } catch (error) {

            req.error(500, `Error creating task: ${error.message}`);

        }

    });

    srv.on('READ', 'Component_Stages', async (req, next) => {

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

    srv.on('UPDATE', 'Component_Stages', async (req) => {

        try {

            const { autoid,
                stage_id,
                status } = req.data;

            return await srv.run(

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

    srv.on('DELETE', 'Component_Stages', async (req) => {
        try {
            const { autoid } = req.data;
            return await srv.run(DELETE.from(Component_Stages).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting task: ${error.message}`);
        }
    });

    //Component_Tasklist ...............................


    srv.on('CREATE', 'Component_TaskList', async (req) => {

        try {

            const {
                tasklist_id,
                stage_id } = req.data;

            const lastAutoID = await srv.run(SELECT.one.from(Component_TaskList).columns('max(autoid) as maxID'));

            const startingID = 1000000;

            const newID = (lastAutoID.maxID >= startingID ? lastAutoID.maxID : startingID - 1) + 1;

            const newEntry = {

                autoid: newID,
                tasklist_id,
                stage_id

            };

            return await srv.run(INSERT.into(Component_TaskList).entries(newEntry));

        } catch (error) {

            req.error(500, `Error creating Component_TaskList entry: ${error.message}`);

        }

    });

    srv.on('READ', 'Component_TaskList', async (req, next) => {
        try {
            if (req.data.autoid) {

                req.query.where({ autoid: req.data.autoid });
            }
            return await next();

        } catch (error) {

            req.error(500, `Error reading Component_TaskList entries: ${error.message}`);
        }
    });

    srv.on('UPDATE', 'Component_TaskList', async (req) => {

        try {
            const { autoid,
                tasklist_id,
                stage_id } = req.data;
            return await srv.run(
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

    srv.on('DELETE', 'Component_TaskList', async (req) => {

        try {
            const { autoid } = req.data;

            return await srv.run(DELETE.from(Component_TaskList).where({ autoid }));

        } catch (error) {

            req.error(500, `Error deleting Component_TaskList entry: ${error.message}`);
        }
    });
        
 

    }
}