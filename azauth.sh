#!/bin/bash
rm -rf /home/azureuser/terraformBackend/code.txt
rm -rf /home/azureuser/terraformBackend/subList.json
rm -rf /home/azureuser/terraformBackend/subscription.txt
rm -rf /home/azureuser/terraformBackend/auth.json
#sudo touch /home/azureuser/terraformBackend/subscription.txt

az login --use-device-code  > >(tee /home/azureuser/terraformBackend/code.txt) 2>&1 

az account list --output json > /home/azureuser/terraformBackend/subList.json

for (( ; ; ))
do
if [ -s subscription.txt ]
then
break
fi
done

subscription="$(cat /home/azureuser/terraformBackend/subscription.txt)"

az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/$subscription" > /home/azureuser/terraformBackend/auth.json

sleep 3
az logout
