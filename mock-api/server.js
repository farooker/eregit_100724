/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.static("downloads"));

const corsOptions = {
  exposedHeaders: [
    "Authorization",
    "Items-Offset",
    "Items-Limit",
    "Items-Total",
  ],
};
app.use(cors(corsOptions));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST ,DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

require("./routes/rsp")(app);
require("./routes/partner")(app);
require("./routes/dowload_mock")(app);

require("./routes/users")(app);
require("./routes/company")(app);
require("./routes/memberType")(app);
require("./routes/role")(app);
require("./routes/action")(app);
require("./routes/permission")(app);
require("./routes/modules")(app);
require("./routes/coparation")(app);
require("./routes/business")(app);
require("./routes/team")(app);
require("./routes/history_log")(app);
require("./routes/generale_link")(app);
require("./routes/payment_terms")(app);
require("./routes/employeetype")(app);
require("./routes/business_partner_group")(app);
require("./routes/account_business_type")(app);
require("./routes/account_payment_terms")(app);
require("./routes/reconciliation-accounts")(app);
require("./routes/business-register-type-by-tax")(app);
require("./routes/provinces-info")(app);
require("./routes/document-info")(app);
require("./routes/bank")(app);
require("./routes/fill_type")(app);
require("./routes/mytasks")(app);



app.listen(4000, () => {
  console.log("Start server at port 4000.");
  console.log("run==>http://localhost:4000/");
});



