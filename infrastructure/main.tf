terraform {
    required_providers {
        azurerm = {
            source = "hashicorp/azurerm"
            version = "~> 3.0.2"
        }
    }

    required_version = ">= 1.1.0"
}

provider "azurerm" {
    features {}
}

resource "azurerm_resource_group" "portfolio_rg" {
    name = "portfolio_resource"
    location = "Central India"
}

resource "azurerm_virtual_network" "portfolio_vnet" {
    name = "portfolio-network"
    address_space = ["10.0.0.0/16"]
    location = azurerm_resource_group.portfolio_rg.location
    resource_group_name = azurerm_resource_group.portfolio_rg.name
}

resource "azurerm_subnet" "portfolio_subnet" {
    name = "internal"
    resource_group_name = azurerm_resource_group.portfolio_rg.name
    virtual_network_name = azurerm_virtual_network.portfolio_vnet.name
    address_prefixes = ["10.0.1.0/24"]
}

resource "azurerm_public_ip" "portfolio_ip" {
    name = "portfolio_ip"
    resource_group_name = azurerm_resource_group.portfolio_rg.name
    location = azurerm_resource_group.portfolio_rg.location
    allocation_method = "Static"
    sku = "Standard"
}

resource "azurerm_network_security_group" "portfolio_nsg" {
    name = "portfolio_nsg"
    location = azurerm_resource_group.portfolio_rg.location
    resource_group_name = azurerm_resource_group.portfolio_rg.name

    security_rule {
        name = "SSH"
        priority = 1001
        direction = "Inbound"
        access = "Allow"
        protocol = "Tcp"
        source_port_range = "*"
        destination_port_range = "22"
        source_address_prefix = "*"
        destination_address_prefix = "*"
    }

    security_rule {
        name = "HTTP"
        priority = 1002
        direction = "Inbound"
        access = "Allow"
        protocol = "Tcp"
        source_port_range = "*"
        destination_port_range = "80"
        source_address_prefix = "*"
        destination_address_prefix = "*"
    }

    security_rule {
        name = "Monit"
        priority = 1003
        direction = "Inbound"
        access = "Allow"
        protocol = "Tcp"
        source_port_range = "*"
        destination_port_range = "2812"
        source_address_prefix = "*"
        destination_address_prefix = "*"
    }

    security_rule {
        name = "HTTPS"
        priority = 1004
        direction = "Inbound"
        access = "Allow"
        protocol = "Tcp"
        source_port_range = "*"
        destination_port_range = "443"
        source_address_prefix = "*"
        destination_address_prefix = "*"
    }
}

resource "azurerm_network_interface" "portfolio_nic" {
    name = "portfolio_nic"
    location = azurerm_resource_group.portfolio_rg.location
    resource_group_name = azurerm_resource_group.portfolio_rg.name

    ip_configuration {
        name = "internal"
        subnet_id = azurerm_subnet.portfolio_subnet.id
        private_ip_address_allocation = "Dynamic"
        public_ip_address_id = azurerm_public_ip.portfolio_ip.id
    }
}

resource "azurerm_network_interface_security_group_association" "portfolio_nic_nsg" {
    network_interface_id = azurerm_network_interface.portfolio_nic.id
    network_security_group_id = azurerm_network_security_group.portfolio_nsg.id
}

resource "azurerm_linux_virtual_machine" "portfolio_vm" {
    name = "portfolio_server"
    resource_group_name = azurerm_resource_group.portfolio_rg.name
    location = azurerm_resource_group.portfolio_rg.location
    size = "Standard_B2ats_v2"
    admin_username = "azureuser"
    computer_name = "portfolioserver"
    network_interface_ids = [
        azurerm_network_interface.portfolio_nic.id
    ]

    admin_ssh_key {
        username = "azureuser"
        public_key = file("~/.ssh/id_rsa.pub")
    }

    os_disk {
        caching = "ReadWrite"
        storage_account_type = "Standard_LRS"
    }

    source_image_reference {
        publisher = "Canonical"
        offer = "0001-com-ubuntu-server-jammy"
        sku = "22_04-lts"
        version = "latest"
    }
}

output "public_ip_address" {
    value = azurerm_public_ip.portfolio_ip.ip_address
}