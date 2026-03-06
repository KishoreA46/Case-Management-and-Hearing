const { Invoice, Client, Case } = require('../models');

const getInvoices = async (req, res) => {
    try {
        let query = {};

        if (req.user.role === 'lawyer') {
            const cases = await Case.find({ lawyer_id: req.user.id }).select('_id');
            const caseIds = cases.map(c => c._id);
            query.case_id = { $in: caseIds };
        } else if (req.user.role === 'client') {
            const client = await Client.findOne({ user_id: req.user.id });
            if (client) {
                query.client_id = client._id;
            } else {
                return res.json([]);
            }
        }

        const invoices = await Invoice.find(query)
            .populate('case_id')
            .populate('client_id');

        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.create(req.body);
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getInvoices, createInvoice, updateInvoice };
