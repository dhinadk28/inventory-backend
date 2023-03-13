const Invoice = require("../../model/invoiceModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const GetAllInvoiceController = async (req, res) => {
  const { role } = req.userObj;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager", "employee"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    //
    const invoiceArray = await Invoice.find();
    if (invoiceArray.length < 1) {
      return res.status(404).send({ msg: "No invoices Found", type: "error" });
    }
    res.send({ invoiceArray, msg: "Listed invoice array", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in GetAllInvoiceController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = GetAllInvoiceController;
