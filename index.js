const LdapStrategy = require("passport-ldapauth");
const User = require("@saltcorn/data/models/user");
const Workflow = require("@saltcorn/data/models/workflow");
const Form = require("@saltcorn/data/models/form");

const { getState } = require("@saltcorn/data/db/state");

const authentication = (config) => {
  return {
    twitter: {
      label: "LDAP",
      postUsernamePassword: true,
      strategy: new LdapStrategy(
        { server: config },
        function (token, tokenSecret, profile, cb) {
          console.log(token, tokenSecret, profile, cb);
          /*User.findOrCreateByAttribute("twitterId", profile.id, {
            email: "",
          }).then((u) => {
            return cb(null, u.session_object);
          });*/
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
                type: "String",
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
