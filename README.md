# ldap-auth

LDAP/Active Directory Authentication for Saltcorn

to test with public server, use these settings:

Server URL: ldap://ldap.forumsys.com
Bind DN: cn=read-only-admin,dc=example,dc=com
Bind Credentials: password
Search Base: dc=example,dc=com
Search Filter: (uid={{username}})

then log on as

uid: euler
password: password

see https://www.forumsys.com/tutorials/integration-how-to/ldap/online-ldap-test-server/
