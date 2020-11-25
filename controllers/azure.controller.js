var express = require('express');
var router = express.Router();
var fs = require('fs');
const {exec} = require("child_process");

module.exports.auth = (req, res, next) => {

    let mainVariableTemplate = '#-----------------------------------------------------------------------------\n' +
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
        '    default = {STORAGEACCOUNTNAME}\n' +
        '}\n' +
        'variable "quota" {\n' +
        '    type = string\n' +
        '    default = "1"\n' +
        '}\n' +
        '\n' +
        'variable "account_tier" {\n' +
        '    type = string\n' +
        '    default = {ACCOUNTTIER}\n' +
        '}\n' +
        'variable "storage_account_replication_type" {\n' +
        '    type = string\n' +
        '    default = {STORAGEACCOUNTREPLICATIONTYPE}\n' +
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

    let tempFileShareModuleTemplate = mainVariableTemplate;
    console.log(req.body.authentication)
    tempFileShareModuleTemplate = tempFileShareModuleTemplate.replace('{SUBSCRIPTIONID}', '"' + req.body.authentication.subscriptionID + '"');
    tempFileShareModuleTemplate = tempFileShareModuleTemplate.replace('{CLIENTID}', '"' + req.body.authentication.clientID + '"');
    tempFileShareModuleTemplate = tempFileShareModuleTemplate.replace('{CLIENTSECRET}', '"' + req.body.authentication.clientSecret + '"');
    tempFileShareModuleTemplate = tempFileShareModuleTemplate.replace('{TENANTID}', '"' + req.body.authentication.tenantID + '"');
    fs.writeFile('/home/azureuser/terraform/scripts/AEM/variable.tf', tempFileShareModuleTemplate, (err) => {
        if (err) {
            console.log(err)
        }
        console.log('File saved!');
    });
    res.json({message: 'Authentication File saved!', status: 200})
}

module.exports.second = (req, res, next) => {
    // let azureAuthentication = req.body.authentication;
    fs.readFile('/home/azureuser/terraform/scripts/AEM/variable.tf', function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            let mainVariableTemplate = data.toString();
            mainVariableTemplate = mainVariableTemplate.replace('{VMNAME}', '"' + req.body.secondScreen.vmInfo.vmName + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{RGLOCATION}', '"' + req.body.secondScreen.generalInfo.resourceGroupLocation + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{RGNAME}', '"' + req.body.secondScreen.generalInfo.resourceGroupName + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{INSTTYPE}', '"' + req.body.secondScreen.vmInfo.instanceType + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{SKUCAPACITY}', '"' + req.body.secondScreen.vmInfo.skuCapacity + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{ADMINUSERNAME}', '"' + req.body.secondScreen.vmInfo.adminUsername + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{SQLDBNAME}', '"' + req.body.secondScreen.sqlDatabaseInfo.sqlDatabaseName + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{SQLDBEDITION}', '"' + req.body.secondScreen.sqlDatabaseInfo.sqlDatabaseEdition + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{SQLDBCOLLATION}', '"' + req.body.secondScreen.sqlDatabaseInfo.sqlDatabaseCollation + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{SERVIVEOBJNAME}', '"' + req.body.secondScreen.sqlDatabaseInfo.serviceObjectiveName + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{SQLSERVERVERSION}', '"' + req.body.secondScreen.sqlDatabaseInfo.sqlServerVersion + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{SQLADMINUSERNAME}', '"' + req.body.secondScreen.sqlDatabaseInfo.sqlAdminUsername + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{SQLPASSWORD}', '"' + req.body.secondScreen.sqlDatabaseInfo.sqlPassword + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{SQLSERVERNAME}', '"' + req.body.secondScreen.sqlDatabaseInfo.sqlServerName + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{STORAGEACCOUNTNAME}', '"' + req.body.secondScreen.fileShareStorageAccountInfo.storageAccountName + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{ACCOUNTTIER}', '"' + req.body.secondScreen.fileShareStorageAccountInfo.accountTier + '"');
            mainVariableTemplate = mainVariableTemplate.replace('{STORAGEACCOUNTREPLICATIONTYPE}', '"' + req.body.secondScreen.fileShareStorageAccountInfo.storageAccountReplicationType + '"');
            fs.writeFile('/home/azureuser/terraform/scripts/AEM/variable.tf', mainVariableTemplate, (err) => {
                if (err) {
                    console.log(err)
                }
                console.log('File saved!');
            });
        }
    });

    for (let i = 1; i <= req.body.secondScreen.fileShareStorageAccountInfo.numOfWatchFolder; i++) {
        let fileShareModuleTemplate = '\nresource "azurerm_storage_share_directory" {WATCHFOLDER} {\n' +
            '  name                 = {WATCHFOLDERNAME}\n' +
            '  share_name           = azurerm_storage_share.fileshare_2.name\n' +
            '  storage_account_name = azurerm_storage_account.vvmdev.name\n' +
            '}\n';
        let tempFileShareModuleTemplate = '';
        tempFileShareModuleTemplate = fileShareModuleTemplate.replace('{WATCHFOLDERNAME}', '"folder' + i + '"');
        tempFileShareModuleTemplate = tempFileShareModuleTemplate.replace('{WATCHFOLDER}', '"watchfolder' + i + '"');
        fs.appendFileSync('/home/azureuser/terraform/scripts/file_share/module.tf', tempFileShareModuleTemplate, function (err) {
            if (err) throw err;
            console.log('File Share module.tf is appended');
        });
    }

    res.send(JSON.stringify('variable.tf'))
}
module.exports.deploy = (req, res, next) => {
    exec('sh /home/azureuser/terraform.sh', (error, stdout, stderr) => {
        console.log("error++++++++++++", error)
        console.log("stdout++++++++++++", stdout)
        console.log("stderr++++++++++++", stderr)
        if (error) {
            res.json({message: {error}, status: 400})
        }
        if (stderr) {
            res.json({message: {stderr}, status: 400})
        }
        res.json({message: 'Terraform is deployed', status: 200})
    });
}
