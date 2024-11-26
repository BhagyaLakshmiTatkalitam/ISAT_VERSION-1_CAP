const cds = require('@sap/cds');

const cust_service = require('./handlers/cust-service');
const dddata_service = require('./handlers/dddata-service');
const tasks_service = require('./handlers/tasks-service');
const users_service = require('./handlers/users-service');

module.exports = cds.service.impl(async function () {

    const { Comments, Timelines, InterfaceDetails,Phases, Issues  } = cds.entities;

    //Comments Entity ...............................

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

    this.on('READ', 'Comments', async (req, next) => {
        try {
            const searchValue = req.data.search || '';

            if (searchValue) {
                req.query.where(
                    `LOWER(comment) LIKE LOWER('%${searchValue}%') OR 
                     LOWER(refid) LIKE LOWER('%${searchValue}%') OR
                    LOWER(type) LIKE LOWER('%${searchValue}%')   OR
                     LOWER(created_by) LIKE LOWER('%${searchValue}%') OR
                      LOWER(created_datetime) LIKE LOWER('%${searchValue}%')`
                );
            }

            return await next();
        } catch (error) {
            req.error(500, `Error searching Comments: ${error.message}`);
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

    this.on('READ', 'Timelines', async (req, next) => {
        try {
            const searchValue = req.data.search || '';

            if (searchValue) {
                req.query.where(
                    `LOWER(start_datetime) LIKE LOWER('%${searchValue}%') OR 
                     LOWER(end_datetime) LIKE LOWER('%${searchValue}%') OR
                    LOWER(refid) LIKE LOWER('%${searchValue}%')   OR
                     LOWER(type) LIKE LOWER('%${searchValue}%') `
                );
            }

            return await next();
        } catch (error) {
            req.error(500, `Error searching Timelines: ${error.message}`);
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

    this.on('READ', 'InterfaceDetails', async (req, next) => {
        try {
            const searchValue = req.data.search || '';

            if (searchValue) {
                req.query.where(
                    `LOWER(name) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(description) LIKE LOWER('%${searchValue}%')  OR
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
                 LOWER(doctype) LIKE LOWER('%${searchValue}%')    OR
                 LOWER(frequency) LIKE LOWER('%${searchValue}%') OR
                 LOWER(ccenabled) LIKE LOWER('%${searchValue}%') `
                );
            }

            return await next();
        } catch (error) {
            req.error(500, `Error searching InterfaceDetails: ${error.message}`);
        }
    });


  
    //Phases ....................................

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

    this.on('DELETE', 'Phases', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Phases).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting Phase: ${error.message}`);
        }
    });

    this.on('READ', 'Phases', async (req, next) => {
        try {
            const searchValue = req.data.search || '';

            if (searchValue) {
                req.query.where(
                    `LOWER(phase_name) LIKE LOWER('%${searchValue}%') `
                );
            }

            return await next();
        } catch (error) {
            req.error(500, `Error searching Phases: ${error.message}`);
        }
    });

    //Issues ............................................
    
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

    this.on('DELETE', 'Issues', async (req) => {
        try {
            const { autoid } = req.data;
            return await this.run(DELETE.from(Issues).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting Issues: ${error.message}`);
        }
    });

    this.on('READ', 'Issues', async (req, next) => {
        try {
            const searchValue = req.data.search || '';

            if (searchValue) {
                req.query.where(
                    `LOWER(issueDesc) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(detailedDesc) LIKE LOWER('%${searchValue}%')  OR
                 LOWER(type) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(status) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(createdBy) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(updatedBy) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(createdTime) LIKE LOWER('%${searchValue}%') OR 
                 LOWER(updatedTime) LIKE LOWER('%${searchValue}%') `
                );
            }

            return await next();
        } catch (error) {
            req.error(500, `Error searching Issues: ${error.message}`);
        }
    });

 
    cust_service.register(this);
    dddata_service.register(this);
    tasks_service.register(this);
    users_service.register(this);

});














