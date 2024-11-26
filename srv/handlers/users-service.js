const cds = require('@sap/cds')
// const { register } = require('./cust-service')
module.exports = {
    register :(srv) => {
        const{Users,Roles,Users_Roles,Teams,Teams_Users} = cds.entities;
        
        srv.on('CREATE', 'Users', async (req) => {
            try {
                const { userid, name, role, active, emailid, custid } = req.data;
                const autoid = await srv.run(SELECT.one.from(Users).columns('max(autoid) as maxID'));
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
                return await srv.run(INSERT.into(Users).entries(newUser));
            } catch (error) {
                req.error(500, `Error creating user: ${error.message}`);
            }
        });

        srv.on('READ', 'Users', async (req, next) => {
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

        srv.on('UPDATE', 'Users', async (req) => {
            try {
                const { autoid, userid, name, role, active, emailid, custid } = req.data;
                return await srv.run(UPDATE(Users).set({ userid, name, role, active, emailid, custid }).where({ autoid }));
            } catch (error) {
                req.error(500, `Error updating user: ${error.message}`);
            }
        });
        srv.on('DELETE', 'Users', async (req) => {
            try {
                const { autoid } = req.data;
                return await srv.run(DELETE.from(Users).where({ autoid }));
            } catch (error) {
                req.error(500, `Error deleting user: ${error.message}`);
            }
        });

        srv.on('READ', 'Users', async (req, next) => {
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
                req.error(500, ` Error searching Users: ${error.message}`);
            }
        });

        //Roles ..................................

        srv.on('CREATE', 'Roles', async (req) => {
            try {
                const { roleid, name, description } = req.data;
    
                const autoid = await srv.run(SELECT.one.from(Roles).columns('max(autoid) as maxID'));
                const startingID = 1000000;
                const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
                const newRole = {
                    autoid: newID,
                    roleid,
                    name,
                    description
                };
    
    
                return await srv.run(INSERT.into(Roles).entries(newRole));
            } catch (error) {
                req.error(500, `Error creating role: ${error.message}`);
            }
        });

        srv.on('READ', 'Roles', async (req, next) => {
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

        srv.on('UPDATE', 'Roles', async (req) => {
            try {
                const { autoid, roleid, name, description } = req.data;
    
    
                return await srv.run(UPDATE(Roles).set({ roleid, name, description }).where({ autoid }));
            } catch (error) {
                req.error(500, `Error updating role: ${error.message}`);
            }
        });
    
        srv.on('DELETE', 'Roles', async (req) => {
            try {
                const { autoid } = req.data;
    
    
                return await srv.run(DELETE.from(Roles).where({ autoid }));
            } catch (error) {
                req.error(500, `Error deleting role: ${error.message}`);
            }
        });

        srv.on('READ', 'Roles', async (req, next) => {
            try {
                const searchValue = req.data.search || '';
                if (searchValue) {
    
                    req.query.where(
                        ` LOWER(roleid) LIKE LOWER('%${searchValue}%') OR 
                     LOWER(name) LIKE LOWER('%${searchValue}%') OR 
                     LOWER(description) LIKE LOWER('%${searchValue}%') `
                    );
                }
    
                return await next();
            } catch (error) {
                req.error(500, ` Error searching Roles: ${error.message}`);
            }
        });

        //Teams ................................

        srv.on('CREATE', 'Teams', async (req) => {
            try {
                const { teamid, name, description } = req.data;
                const autoid = await srv.run(SELECT.one.from(Teams).columns('max(autoid) as maxID'));
                const startingID = 1000000;
                const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
                const newTeam = {
                    autoid: newID,
                    teamid,
                    name,
                    description,
                };
                return await srv.run(INSERT.into(Teams).entries(newTeam));
            } catch (error) {
                req.error(500, `Error creating team: ${error.message}`);
            }
        });

        srv.on('READ', 'Teams', async (req, next) => {
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

        srv.on('UPDATE', 'Teams', async (req) => {
            try {
                const { autoid, teamid, name, description } = req.data;
                return await srv.run(UPDATE(Teams).set({ teamid, name, description }).where({ autoid }));
            } catch (error) {
                req.error(500, `Error updating team: ${error.message}`);
            }
        });
        srv.on('DELETE', 'Teams', async (req) => {
            try {
                const { autoid } = req.data;
                return await srv.run(DELETE.from(Teams).where({ autoid }));
            } catch (error) {
                req.error(500, `Error deleting team: ${error.message}`);
            }
        });

        srv.on('READ', 'Teams', async (req, next) => {
            try {
                const searchValue = req.data.search || '';
                if (searchValue) {
    
                    req.query.where(
                        ` LOWER(teamid) LIKE LOWER('%${searchValue}%') OR 
                     LOWER(name) LIKE LOWER('%${searchValue}%') OR 
                     LOWER(description) LIKE LOWER('%${searchValue}%') `
                    );
                }
    
                return await next();
            } catch (error) {
                req.error(500, ` Error searching Teams: ${error.message}`);
            }
        });

        //Users_Roles .................................

        srv.on('CREATE', 'Users_Roles', async (req) => {

            try {
    
                const { user_id,
                    role_id
                } = req.data;
    
                // Fetch the maximum `autoid` from the Tasks table
    
                const autoid = await srv.run(SELECT.one.from(Users_Roles).columns('max(autoid) as maxID'));
    
                const startingID = 1000000;
    
                const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
    
                const component_stages = {
    
                    autoid: newID,
                    user_id,
                    role_id
    
                };
    
                return await srv.run(INSERT.into(Users_Roles).entries(component_stages));
    
            } catch (error) {
    
                req.error(500, `Error creating task: ${error.message}`);
    
            }
    
        });

        srv.on('READ', 'Users_Roles', async (req, next) => {

            try {
    
                if (req.data.autoid) {
    
                    req.query.where({ autoid: req.data.autoid });
    
                }
    
                return await next(); // Continue with the default CAP framework query
    
            } catch (error) {
    
                req.error(500, `Error filtering tasks: ${error.message}`);
    
            }
    
        });

        srv.on('UPDATE', 'Users_Roles', async (req) => {

            try {
    
                const { autoid, user_id,
                    role_id,
                } = req.data;
    
                return await srv.run(
    
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

        srv.on('DELETE', 'Users_Roles', async (req) => {
            try {
                const { autoid } = req.data;
                return await srv.run(DELETE.from(Users_Roles).where({ autoid }));
            } catch (error) {
                req.error(500, `Error deleting task: ${error.message}`);
            }
        });

        //Teams_Users ............................

        srv.on('CREATE', 'Teams_Users', async (req) => {

            try {
    
                const { team_id, user_id, active } = req.data;
    
                const lastAutoID = await srv.run(SELECT.one.from(Teams_Users).columns('max(autoid) as maxID'));
    
                const startingID = 1000000;
    
                const newID = (lastAutoID.maxID >= startingID ? lastAutoID.maxID : startingID - 1) + 1;
    
                const newEntry = {
    
                    autoid: newID,
    
                    team_id,
    
                    user_id,
    
                    active
    
                };
    
                return await srv.run(INSERT.into(Teams_Users).entries(newEntry));
    
            } catch (error) {
    
                req.error(500, `Error creating Teams_Users entry: ${error.message}`);
    
            }
    
        });

        srv.on('READ', 'Teams_Users', async (req, next) => {

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

        srv.on('UPDATE', 'Teams_Users', async (req) => {

            try {
                const { autoid, team_id, user_id, active } = req.data;
                return await srv.run(
                    UPDATE(Teams_Users)
    
                        .set({ team_id, user_id, active })
    
                        .where({ autoid })
                );
            } catch (error) {
                req.error(500, `Error updating Teams_Users entry: ${error.message}`);
            }
        });
    
        srv.on('DELETE', 'Teams_Users', async (req) => {
    
            try {
    
                const { autoid } = req.data;
    
                return await srv.run(DELETE.from(Teams_Users).where({ autoid }));
    
            } catch (error) {
    
                req.error(500, `Error deleting Teams_Users entry: ${error.message}`);
    
            }
    
        });


    }
}