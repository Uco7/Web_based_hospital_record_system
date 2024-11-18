const mongoose = require('mongoose');

const purchaseCardSchema = new mongoose.Schema({
    fName: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentReference: { type: String, required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'patient', required: true },
    purchase_date: { type: Date, default: Date.now },
    expiration_date: { type: Date, default: () => new Date().setFullYear(new Date().getFullYear() + 1) },
    card_number: { type: String, default: () => Math.floor(Math.random() * 1000000000).toString() },
});

const PurchaseCard = mongoose.model('PurchaseCard', purchaseCardSchema);
module.exports = PurchaseCard;
