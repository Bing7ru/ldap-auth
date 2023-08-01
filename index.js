const LdapStrategy = require("passport-ldapauth");
const User = require("@saltcorn/data/models/user");
const Workflow = require("@saltcorn/data/models/workflow");
const Form = require("@saltcorn/data/models/form");
const db = require("@saltcorn/data/db");

const { getState } = require("@saltcorn/data/db/state");

const authentication = (config) => {
  return {
    ldap: {
      label: "LDAP",
      postUsernamePassword: true,
      usernameLabel: "UID",
      strategy: new LdapStrategy(
        {
          server: config,
          usernameField: "email",
          passwordField: "password",
        },
        function (user, cb) {
          User.findOrCreateByAttribute("ldapdn", user.dn, {
            email: user.mail || "",
          }).then((u) => {
            return cb(null, u.session_object);
          });
        }
      ),
    },
  };
};
const configuration_workflow = () => {
  return new Workflow({
    steps: [
      {
        name: "LDAP configuration",
        form: () =>
          new Form({
            labelCols: 3,
            fields: [
              {
                name: "url",
                label: "Server URL",
                type: "String",
                required: true,
              },
              {
                name: "bindDN",
                label: "Bind DN",
                type: "String",
              },
              {
                name: "bindCredentials",
                label: "Bind Credentials",
                input_type: "password",
              },
              {
                name: "searchBase",
                label: "Search Base",
                type: "String",
              },
              {
                name: "searchFilter",
                label: "Search Filter",
                type: "String",
                required: true,
              },
            ],
          }),
      },
    ],
  });
};
module.exports = {
  sc_plugin_api_version: 1,
  authentication,
  configuration_workflow,
};
