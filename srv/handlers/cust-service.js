const cds=require('@sap/cds');
    module.exports = {
        register: (srv) => {
    const {Customers,Projects,Customers_Projects}=cds.entities;

    srv.on('CREATE', 'Customers', async (req) => {
    try {
        const { custid, name, location, description } = req.data;
        const autoid = await srv.run(SELECT.one.from(Customers).columns('max(autoid) as maxID'));
        const startingID = 1000000;
        const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
        const newCustomer = {
            autoid: newID,
            custid,
            name,
            location,
            description
        };
        return await srv.run(INSERT.into(Customers).entries(newCustomer));
    } catch (error) {
        req.error(500, `Error creating customer: ${error.message}`);
    }
}),

srv.on('READ', 'Customers', async (req, next) => {
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

srv.on('UPDATE', 'Customers', async (req) => {
        try {
            const { autoid, custid, name, location, description } = req.data;
            return await srv.run(UPDATE(Customers).set({ custid, name, location, description }).where({ autoid }));
        } catch (error) {
            req.error(500, `Error updating customer: ${error.message}`);
        }
    });

    srv.on('DELETE', 'Customers', async (req) => {
    try {
        const { autoid } = req.data;
        return await srv.run(DELETE.from(Customers).where({ autoid }));
    } catch (error) {
        req.error(500, `Error deleting customer: ${error.message}`);
    }

});


srv.on('READ', 'Customers', async (req, next) => {
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

            //Projects .................................

           srv.on('CREATE', 'Projects', async (req) => {
                try {
                    const { projid, name, description, status } = req.data;
                    const autoid = await srv.run(SELECT.one.from(Projects).columns('max(autoid) as maxID'));
                    const startingID = 1000000;
                    const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID - 1) + 1;
                    const newProject = {
                        autoid: newID,
                        projid,
                        name,
                        description,
                        status
                    };
                    return await srv.run(INSERT.into(Projects).entries(newProject));
                } catch (error) {
                    req.error(500, `Error creating project: ${error.message}`);
                }
            });
    
            srv.on('READ', 'Projects', async (req, next) => {
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
    
            srv.on('UPDATE', 'Projects', async (req) => {
                try {
                    const { autoid, projid, name, description, status } = req.data;
                    return await srv.run(UPDATE(Projects).set({ projid, name, description, status }).where({ autoid }));
                } catch (error) {
                    req.error(500, `Error updating project: ${error.message}`);
                }
            });
            srv.on('DELETE', 'Projects', async (req) => {
                try {
                    const { autoid } = req.data;
                    return await srv.run(DELETE.from(Projects).where({ autoid }));
                } catch (error) {
                    req.error(500, `Error deleting project: ${error.message}`);
                }
            });

            srv.on('READ', 'Projects', async (req, next) => {
                try {
                    const searchValue = req.data.search || '';
                    if (searchValue) {
        
                        req.query.where(
                            ` LOWER(projid) LIKE LOWER('%${searchValue}%') OR 
                         LOWER(name) LIKE LOWER('%${searchValue}%') OR 
                         LOWER(status) LIKE LOWER('%${searchValue}%') OR 
                         LOWER(description) LIKE LOWER('%${searchValue}%')`
                        );
                    }
        
                    return await next(); 
                } catch (error) {
                    req.error(500, ` Error searching Projects: ${error.message}`);
                }
            });

            // Customer_Projects

    srv.on('CREATE', 'Customers_Projects', async (req) => {
        try {
            const { customer_id, proj_id } = req.data;
            const lastAutoID = await srv.run(SELECT.one.from(Customers_Projects).columns('max(autoid) as maxID'));
            const startingID = 1000000;
            const newID = (lastAutoID.maxID >= startingID ? lastAutoID.maxID : startingID - 1) + 1;
            const newEntry = {
                autoid: newID,
                customer_id,  // Use the autoid from the associated Customer
                proj_id     // Use the autoid from the associated Project
            };

            return await srv.run(INSERT.into(Customers_Projects).entries(newEntry));
        } catch (error) {
            req.error(500, `Error creating Customers_Projects entry: ${error.message}`);
        }
    });

    srv.on('READ', 'Customers_Projects', async (req, next) => {
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

    srv.on('UPDATE', 'Customers_Projects', async (req) => {
        try {
            const { autoid, customer_id, proj_id } = req.data;
            return await srv.run(
                UPDATE(Customers_Projects)
                    .set({ customer_id, proj_id })
                    .where({ autoid })
            );
        } catch (error) {
            req.error(500, `Error updating Customers_Projects entry: ${error.message}`);
        }
    });
    srv.on('DELETE', 'Customers_Projects', async (req) => {
        try {
            const { autoid } = req.data;
            return await srv.run(DELETE.from(Customers_Projects).where({ autoid }));
        } catch (error) {
            req.error(500, `Error deleting Customers_Projects entry: ${error.message}`);
        }
    });
        }
}