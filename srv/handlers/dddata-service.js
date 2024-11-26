const cds = require('@sap/cds');
module.exports = {
    register : (srv) =>{
        const{DDData,DDType} = cds.entities;

        srv.on('CREATE', 'DDData', async (req) => {
            try {
                const { name, value, ddType_id } = req.data;
                const autoid = await srv.run(SELECT.one.from(DDData).columns('max(autoid) as maxID'));
                const startingID = 1000000;
                const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
                const newEntry = {
                    autoid: newID,
                    name,
                    value,
                    ddType_id
                };
                return await srv.run(INSERT.into(DDData).entries(newEntry));
            } catch (error) {
                req.error(500, `Error creating data: ${error.message}`);
            }
        });

        srv.on('READ', 'DDData', async (req, next) => {
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

        srv.on('UPDATE', 'DDData', async (req) => {
            try {
                const { autoid, name, value, ddType_id } = req.data;
                return await srv.run(UPDATE(DDData).set({ name, value, ddType_id }).where({ autoid }));
            } catch (error) {
                req.error(500, `Error updating data: ${error.message}`);
            }
        });
    
        srv.on('DELETE', 'DDData', async (req) => {
            try {
                const { autoid } = req.data;
                return await srv.run(DELETE.from(DDData).where({ autoid }));
            } catch (error) {
                req.error(500, `Error deleting data: ${error.message}`);
            }
        });

        srv.on('READ', 'DDData', async (req, next) => {
            try {
                const searchValue = req.data.search || '';
    
                if (searchValue) {
                    req.query.where(
                        `LOWER(name) LIKE LOWER('%${searchValue}%') OR 
                         LOWER(value) LIKE LOWER('%${searchValue}%') OR
                        LOWER(ddType_id) LIKE LOWER('%${searchValue}%')`
                    );
                }
    
                return await next();
            } catch (error) {
                req.error(500, `Error searching DDData: ${error.message}`);
            }
        });

        //DDType .........................................................

        srv.on('CREATE', 'DDType', async (req) => {
            try {
                const { name, description } = req.data;
                const autoid = await srv.run(SELECT.one.from(DDType).columns('max(autoid) as maxID'));
                const startingID = 1000000;
                const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
                const newDDType = {
                    autoid: newID,
                    name,
                    description
                };
                return await srv.run(INSERT.into(DDType).entries(newDDType));
            } catch (error) {
                req.error(500, `Error creating DDType: ${error.message}`);
            }
        });

        srv.on('READ', 'DDType', async (req, next) => {
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

        srv.on('UPDATE', 'DDType', async (req) => {
            try {
                const { autoid, name, description } = req.data;
                return await srv.run(UPDATE(DDType).set({ name, description }).where({ autoid }));
            } catch (error) {
                req.error(500, `Error updating DDType: ${error.message}`);
            }
        });

        srv.on('DELETE', 'DDType', async (req) => {
            try {
                const { autoid } = req.data;
                return await srv.run(DELETE.from(DDType).where({ autoid }));
            } catch (error) {
                req.error(500, `Error deleting DDType: ${error.message}`);
            }
        });

        srv.on('READ', 'DDType', async (req, next) => {
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

    }
}