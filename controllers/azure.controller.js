var express = require('express');
var router = express.Router();
var fs = require('fs');
const { exec } = require("child_process");

module.exports.auth = (req, res, next) => {

    let template = '#-----------------------------------------------------------------------------\n' +
        '# Azure Subscription variables\n' +
        '#-----------------------------------------------------------------------------\n' +
        'variable "subscription_id" {\n' +
        '    type = string\n' +
        '    default = {SUBSCRIPTIONID}\n' +
        '}\n' +
        'variable "client_id" {\n' +
        '    type = string\n' +
        '    default = {CLIENTID}\n' +
        '}\n' +
        'variable "client_secret" {\n' +
        '    type = string\n' +
        '    default = {CLIENTSECRET}\n' +
        '\n' +
        '}\n' +
        'variable "tenant_id" {\n' +
        '     type = string\n' +
        '    default = {TENANTID}\n' +
        '}\n' +
        'variable "Environment" {\n' +
        '    type = string\n' +
        '    default = "Dev"\n' +
        '}\n' +
        '\n' +
        '\n' +
        '#-----------------------------------------------------------------------------\n' +
        '# Network Variables block\n' +
        '#-----------------------------------------------------------------------------\n' +
        'variable "vnet_name" {\n' +
        '    default = "NAPipelineVNet"\n' +
        '    type = string\n' +
        '}\n' +
        'variable "vnet_resource_group_name" {\n' +
        '    type = string\n' +
        '    default = "NAPipe" \n' +
        '}\n' +
        'variable "vnet_address_space" {\n' +
        '    type = string\n' +
        '    default = "10.59.42.0/24"\n' +
        '}\n' +
        '\n' +
        'variable "public_ip_address_allocation" {\n' +
        '    type = string\n' +
        '    default = "static"\n' +
        '}\n' +
        'variable "loadbalancer_port" {\n' +
        '    type = string\n' +
        '    default = "80"\n' +
        '}\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '#-----------------------------------------------------------------------------\n' +
        '# Input block: defines input variables for tagging, naming and resource inputs\n' +
        '#-----------------------------------------------------------------------------\n' +
        '\n' +
        'variable "vmss_name" {\n' +
        '    type = string\n' +
        '    default = {VMNAME}\n' +
        '}\n' +
        'variable "resource_group_location" {\n' +
        '    type = string\n' +
        '    default = {RGLOCATION}\n' +
        '}\n' +
        'variable "resource_group_name" {\n' +
        '    type = string\n' +
        '    default = {RGNAME}\n' +
        '}\n' +
        'variable "upgrade_policy_mode" {\n' +
        '    type = string\n' +
        '    default = "Manual"\n' +
        '}\n' +
        'variable "os_type" {\n' +
        '    type= string\n' +
        '    default = "linux"\n' +
        '}\n' +
        'variable "sku_name" {\n' +
        '    type = string\n' +
        '    default = {INSTTYPE}\n' +
        '}\n' +
        'variable "sku_tier" {\n' +
        '    type = string\n' +
        '    default = "Standard"\n' +
        '}\n' +
        'variable "sku_capacity" {\n' +
        '    type = string\n' +
        '    default = {SKUCAPACITY}\n' +
        '}\n' +
        'variable "storage_profile_image_reference_publisher" {\n' +
        '    type = string\n' +
        '    default = "RedHat"\n' +
        '}\n' +
        'variable "storage_profile_image_reference_offer" {\n' +
        '    type = string\n' +
        '    default = "RHEL"\n' +
        '}\n' +
        'variable "storage_profile_image_reference_sku" {\n' +
        '    type = string\n' +
        '    default = "7-RAW"\n' +
        '}\n' +
        'variable "storage_profile_image_reference_version" {\n' +
        '    type = string\n' +
        '    default = "latest"\n' +
        '}\n' +
        'variable "storage_profile_os_disk_managed_disk_type" {\n' +
        '    type = string\n' +
        '    default = "Standard_LRS"\n' +
        '}\n' +
        'variable "admin_username" {\n' +
        '    type = string\n' +
        '    default = {ADMINUSERNAME} \n' +
        '}\n' +
        'variable "admin_password" {\n' +
        '    type = string\n' +
        '    default = "Owk@12345"\n' +
        '}\n' +
        '# variable "subnet_id" {}\n' +
        '# variable "load_balancer_backend_address_pool_ids" {}\n' +
        'variable "common_tags" {\n' +
        '    type="map"\n' +
        '    \n' +
        ' }\n' +
        '\n' +
        '\n' +
        '\n' +
        '#-----------------------------------------------------------------------------\n' +
        '# Input block: defines input variables for tagging, naming and resource inputs\n' +
        '#-----------------------------------------------------------------------------\n' +
        '\n' +
        '# Tag variables\n' +
        '#variable "module_common_tags" {type="map"}\n' +
        '\n' +
        '# Infra Resource variables\n' +
        '\n' +
        '\n' +
        '# variable "subnet_prefixes" {type = "list"}\n' +
        '\n' +
        'variable "address_prefix1" {\n' +
        '    type = string\n' +
        '    default = "10.59.42.32/28"\n' +
        '}\n' +
        '\n' +
        'variable "address_prefix2" {\n' +
        '    type = string\n' +
        '    default = "10.59.42.48/28"\n' +
        '}\n' +
        '\n' +
        '\n' +
        'variable "subnet_name1" {\n' +
        '    type = string\n' +
        '    default = "ds-owk-dev-data-subnet"\n' +
        '}\n' +
        '\n' +
        'variable "subnet_name2" {\n' +
        '    type = string\n' +
        '    default = "ds-owk-dev-awm-subnet" \n' +
        '}\n' +
        '\n' +
        '# variable "subnet_names" {type = "list"}\n' +
        '# variable "network_security_group_id" {type = "list"}\n' +
        'variable "subnet_service_endpoints" {\n' +
        '    type = "list"\n' +
        '    default = ["Microsoft.Sql","Microsoft.Storage"]\n' +
        '    }\n' +
        '\n' +
        '\n' +
        '\n' +
        '# variable "cloudconfig_file" {}\n' +
        '\n' +
        '\n' +
        'variable "key_data" {\n' +
        '    type = string\n' +
        '    default = "../Toyoyta-AEM/azure.pub"\n' +
        '}\n' +
        '\n' +
        '#-----------------------------------------------------------------------------\n' +
        '# Database Variables block\n' +
        '#-----------------------------------------------------------------------------\n' +
        '\n' +
        'variable "sql_db_name" {\n' +
        '    type = string\n' +
        '    default = {SQLDBNAME}\n' +
        '}\n' +
        '\n' +
        'variable "sql_db_edition" {\n' +
        '    type = string\n' +
        '    default = {SQLDBEDITION}\n' +
        '}\n' +
        'variable "sql_db_collation" {\n' +
        '    type = string\n' +
        '    default = {SQLDBCOLLATION}\n' +
        '}\n' +
        'variable "service_objective_name" {\n' +
        '    type = string\n' +
        '    default = {SERVIVEOBJNAME}\n' +
        '}\n' +
        'variable "sql_server_version" {\n' +
        '    type = string\n' +
        '    default = {SQLSERVERVERSION}\n' +
        '}\n' +
        'variable "sql_admin_username" {\n' +
        '    type = string\n' +
        '    default = {SQLADMINUSERNAME}  \n' +
        '}\n' +
        'variable "sql_password" {\n' +
        '    type = string\n' +
        '    default = {SQLPASSWORD} \n' +
        '}\n' +
        'variable "sql_server_name" {\n' +
        '    type = string\n' +
        '    default = {SQLSERVERNAME} \n' +
        '}\n' +
        'variable "sqlvnetrule_name" {\n' +
        '    type = string\n' +
        '    default = "DS-OWK-Dev-sqlVnetRule"\n' +
        '}\n' +
        '\n' +
        '#-----------------------------------------------------------------------------\n' +
        '\n' +
        '#-----------------------------------------------------------------------------\n' +
        '# Storage Account Variables block\n' +
        '#-----------------------------------------------------------------------------\n' +
        'variable "storage_account_name" {\n' +
        '    type = string\n' +
        '    default = "aem"\n' +
        '}\n' +
        'variable "quota" {\n' +
        '    type = string\n' +
        '    default = "1"\n' +
        '}\n' +
        '\n' +
        'variable "account_tier" {\n' +
        '    type = string\n' +
        '    default = "Standard"\n' +
        '}\n' +
        'variable "storage_account_replication_type" {\n' +
        '    type = string\n' +
        '    default = "GRS"\n' +
        '}\n' +
        'variable "storage_file_share_name"{\n' +
        '    type = string\n' +
        '    default = "input"\n' +
        '}\n' +
        'variable "storage_file_share_directory"{\n' +
        '    type = string\n' +
        '    default = "demo"\n' +
        '}\n' +
        '#-----------------------------------------------------------------------------\n' +
        '\n' +
        '#-----------------------------------------------------------------------------\n' +
        '\n' +
        '\n'

    console.log(req.body.authentication)
    template = template.replace('{SUBSCRIPTIONID}', '"' + req.body.authentication.subscriptionID + '"');
    template = template.replace('{CLIENTID}', '"' + req.body.authentication.clientID + '"');
    template = template.replace('{CLIENTSECRET}', '"' + req.body.authentication.clientSecret + '"');
    template = template.replace('{TENANTID}', '"' + req.body.authentication.tenantID + '"');
    fs.writeFile(__dirname + '/variable.tf', template, (err) => {
        if (err) {
            console.log(err)
        }
        console.log('File saved!');
    });
    res.json({ message: 'Authentication File saved!',status: 200})
}

module.exports.second = (req, res, next) => {
    // let azureAuthentication = req.body.authentication;

    fs.readFile(__dirname + '/variable.tf', function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            let scndTemplate = data.toString();
            scndTemplate = scndTemplate.replace('{VMNAME}', '"' + req.body.secondScreen.vmInfo.vmName + '"');
            scndTemplate = scndTemplate.replace('{RGLOCATION}', '"' + req.body.secondScreen.generalInfo.resourceGroupLocation + '"');
            scndTemplate = scndTemplate.replace('{RGNAME}', '"' + req.body.secondScreen.generalInfo.resourceGroupName + '"');
            scndTemplate = scndTemplate.replace('{INSTTYPE}', '"' + req.body.secondScreen.vmInfo.instanceType + '"');
            scndTemplate = scndTemplate.replace('{SKUCAPACITY}', '"' + req.body.secondScreen.vmInfo.skuCapacity + '"');
            scndTemplate = scndTemplate.replace('{ADMINUSERNAME}', '"' + req.body.secondScreen.vmInfo.adminUsername + '"');
            scndTemplate = scndTemplate.replace('{SQLDBNAME}', '"' + req.body.secondScreen.sqlDatabaseInfo.sqlDatabaseName + '"');
            scndTemplate = scndTemplate.replace('{SQLDBEDITION}', '"' + req.body.secondScreen.sqlDatabaseInfo.sqlDatabaseEdition + '"');
            scndTemplate = scndTemplate.replace('{SQLDBCOLLATION}', '"' + req.body.secondScreen.sqlDatabaseInfo.sqlDatabaseCollation + '"');
            scndTemplate = scndTemplate.replace('{SERVIVEOBJNAME}', '"' + req.body.secondScreen.sqlDatabaseInfo.serviceObjectiveName + '"');
            scndTemplate = scndTemplate.replace('{SQLSERVERVERSION}', '"' + req.body.secondScreen.sqlDatabaseInfo.sqlServerVersion + '"');
            scndTemplate = scndTemplate.replace('{SQLADMINUSERNAME}', '"' + req.body.secondScreen.sqlDatabaseInfo.sqlAdminUsername + '"');
            scndTemplate = scndTemplate.replace('{SQLPASSWORD}', '"' + req.body.secondScreen.sqlDatabaseInfo.sqlPassword + '"');
            scndTemplate = scndTemplate.replace('{SQLSERVERNAME}', '"' + req.body.secondScreen.sqlDatabaseInfo.sqlServerName + '"');
            fs.writeFile(__dirname + '/variable.tf', scndTemplate, (err) => {
                if (err) {
                    console.log(err)
                }
                console.log('File saved!');
            });
        }
    });
    res.send(JSON.stringify('variable.tf'))
}
module.exports.deploy = (req, res, next) => {
    exec('ipconfig 123', (error, stdout, stderr) => {
        console.log("error++++++++++++",error)
         console.log("stdout++++++++++++",stdout)
         console.log("stderr++++++++++++",stderr)
          if (error) {
              res.json({ message: {error},status: 400})
          }
          if (stderr) {
              res.json({ message: {stderr},status: 400})
          }
        res.json({ message: 'Terraform is deployed',status: 200})
    });
}
