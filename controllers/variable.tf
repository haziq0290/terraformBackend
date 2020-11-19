#-----------------------------------------------------------------------------
# Azure Subscription variables
#-----------------------------------------------------------------------------
variable "subscription_id" {
    type = string
    default = "123"
}
variable "client_id" {
    type = string
    default = "123"
}
variable "client_secret" {
    type = string
    default = "123"

}
variable "tenant_id" {
     type = string
    default = "123"
}
variable "Environment" {
    type = string
    default = "Dev"
}


#-----------------------------------------------------------------------------
# Network Variables block
#-----------------------------------------------------------------------------
variable "vnet_name" {
    default = "NAPipelineVNet"
    type = string
}
variable "vnet_resource_group_name" {
    type = string
    default = "NAPipe" 
}
variable "vnet_address_space" {
    type = string
    default = "10.59.42.0/24"
}

variable "public_ip_address_allocation" {
    type = string
    default = "static"
}
variable "loadbalancer_port" {
    type = string
    default = "80"
}




#-----------------------------------------------------------------------------
# Input block: defines input variables for tagging, naming and resource inputs
#-----------------------------------------------------------------------------

variable "vmss_name" {
    type = string
    default = "1"
}
variable "resource_group_location" {
    type = string
    default = "UAE Central"
}
variable "resource_group_name" {
    type = string
    default = "qewwe"
}
variable "upgrade_policy_mode" {
    type = string
    default = "Manual"
}
variable "os_type" {
    type= string
    default = "linux"
}
variable "sku_name" {
    type = string
    default = "Standard_B4ms"
}
variable "sku_tier" {
    type = string
    default = "Standard"
}
variable "sku_capacity" {
    type = string
    default = "1"
}
variable "storage_profile_image_reference_publisher" {
    type = string
    default = "RedHat"
}
variable "storage_profile_image_reference_offer" {
    type = string
    default = "RHEL"
}
variable "storage_profile_image_reference_sku" {
    type = string
    default = "7-RAW"
}
variable "storage_profile_image_reference_version" {
    type = string
    default = "latest"
}
variable "storage_profile_os_disk_managed_disk_type" {
    type = string
    default = "Standard_LRS"
}
variable "admin_username" {
    type = string
    default = "1" 
}
variable "admin_password" {
    type = string
    default = "Owk@12345"
}
# variable "subnet_id" {}
# variable "load_balancer_backend_address_pool_ids" {}
variable "common_tags" {
    type="map"
    
 }



#-----------------------------------------------------------------------------
# Input block: defines input variables for tagging, naming and resource inputs
#-----------------------------------------------------------------------------

# Tag variables
#variable "module_common_tags" {type="map"}

# Infra Resource variables


# variable "subnet_prefixes" {type = "list"}

variable "address_prefix1" {
    type = string
    default = "10.59.42.32/28"
}

variable "address_prefix2" {
    type = string
    default = "10.59.42.48/28"
}


variable "subnet_name1" {
    type = string
    default = "ds-owk-dev-data-subnet"
}

variable "subnet_name2" {
    type = string
    default = "ds-owk-dev-awm-subnet" 
}

# variable "subnet_names" {type = "list"}
# variable "network_security_group_id" {type = "list"}
variable "subnet_service_endpoints" {
    type = "list"
    default = ["Microsoft.Sql","Microsoft.Storage"]
    }



# variable "cloudconfig_file" {}


variable "key_data" {
    type = string
    default = "../Toyoyta-AEM/azure.pub"
}

#-----------------------------------------------------------------------------
# Database Variables block
#-----------------------------------------------------------------------------

variable "sql_db_name" {
    type = string
    default = "2"
}

variable "sql_db_edition" {
    type = string
    default = "123"
}
variable "sql_db_collation" {
    type = string
    default = "1234"
}
variable "service_objective_name" {
    type = string
    default = "2"
}
variable "sql_server_version" {
    type = string
    default = "2756"
}
variable "sql_admin_username" {
    type = string
    default = "141324"  
}
variable "sql_password" {
    type = string
    default = "213" 
}
variable "sql_server_name" {
    type = string
    default = "13413" 
}
variable "sqlvnetrule_name" {
    type = string
    default = "DS-OWK-Dev-sqlVnetRule"
}

#-----------------------------------------------------------------------------

#-----------------------------------------------------------------------------
# Storage Account Variables block
#-----------------------------------------------------------------------------
variable "storage_account_name" {
    type = string
    default = "aem"
}
variable "quota" {
    type = string
    default = "1"
}

variable "account_tier" {
    type = string
    default = "Standard"
}
variable "storage_account_replication_type" {
    type = string
    default = "GRS"
}
variable "storage_file_share_name"{
    type = string
    default = "input"
}
variable "storage_file_share_directory"{
    type = string
    default = "demo"
}
#-----------------------------------------------------------------------------

#-----------------------------------------------------------------------------


