const cds=require('@sap/cds');
    module.exports = {
        register: (srv) => {
    const {Customers}=cds.entities;

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
        }
}