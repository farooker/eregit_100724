/* eslint-disable no-undef */

const { delay } = require("../utils");

module.exports = (app) => {
  const business_bp_number = require("../data/business-partner-detail.json");
  const partner_type = require("../data/partner-type.json");
  const business_search_bp_list = require("../data/search-business-partner.json");
  const create_business_partner_profile_form = require("../data/create-business-partner-profile-form.json");
  const item_business_partner_roles = require("../data/get-business-partner-roles.json");
  const register_form_detail = require("../data/get-register-form-detail.json");
  const extend_role = require("../data/get_extend_role_request_by_form_number.json");
  const extend_company_request_by_form_number = require("../data/extend-company-business-partner-by-form-number.json");
  const cahnge_info_request = require("../data/get-change-information-request-by-form-number.json");
  const business_partner_by_pb_number = require("../data/get-business-partner-by-bp-number.json");
  const get_business_partner_register_form = require("../data/get-business-partner-register-form.json");
  const create_uploaded_document = require("../data/create-uploaded-document.json");
  const document_require = require("../data/document-data/get-required-documents.json");

  app.get("/partner/search-business-partner", async (req, res) => {
    await delay(2000);
    res.setHeader("Items-Offset", 0);
    res.setHeader("Items-Limit", 10);
    res.setHeader("Items-Total", 24);
    res.json(business_search_bp_list);
  });

  app.get("/master/get-business-partner-types", async (req, res) => {
    res.json(partner_type);
  });

  app.post("/partner/get-business-partner-detail", async (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const { bp_number, branch_code } = req.body;
    await delay(2000);
    if (branch_code != undefined) {
      const new_item = { ...business_bp_number };
      new_item.data.branch.branch_code = branch_code;
      res.json(new_item);
    } else {
      res.json(business_bp_number);
    }
  });

  app.post(
    "/partner/create-business-partner-profile-form",
    async (req, res) => {
      return res.json(create_business_partner_profile_form);
    }
  );

  app.post("/partner/get-register-form-detail", async (req, res) => {
    return res.json(register_form_detail);
  });

  app.get("/master/get-business-partner-roles", async (req, res) => {
    res.json(item_business_partner_roles);
  });

  app.get(
    "/partner/get-extend-company-request-by-form-number/:form_number",
    async (req, res) => {
      res.json(extend_company_request_by_form_number);
    }
  );

  app.get(
    "/partner/get-extend-role-request-by-form-number/:form_number",
    async (req, res) => {
      res.json(extend_role);
    }
  );

  app.get(
    "/partner/get-business-partner-by-bp-number/:bp_number",
    async (req, res) => {
      res.json(business_partner_by_pb_number);
    }
  );

  app.get(
    "/partner/get-change-information-request-by-form-number/:form_number",
    async (req, res) => {
      res.json(cahnge_info_request);
    }
  );

  app.post("/partner/get-business-partner-register-form", async (req, res) => {
    res.json(get_business_partner_register_form);
  });

  app.post("/partner/create-uploaded-document", async (req, res) => {
    res.json(create_uploaded_document);
  });

  app.post("/partner/get-required-documents", async (req, res) => {
    res.json(document_require);
  });

  app.post("/partner/change-information", async (req, res) => {
    res.json({
      is_success: true,
      code: "200",
      message: "Ok",
      data: {},
    });
  });

  app.post("/partner/save-draft-new-register-form", async (req, res) => {
    res.json({
      is_success: true,
      code: "200",
      message: "Ok",
      data: {},
    });
  });

  app.post("/partner/save-new-registration", async (req, res) => {
    res.json({
      is_success: true,
      code: "200",
      message: "Ok",
      data: {},
    });
  });
};