# Infrastruce Deployment with CI/CD - Pulumi
### by AWSome Architechs 

## Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Infrastructure](#infrastructure)
    - [Modules](#modules)
    - [Deployment](#deployment)
- [Components Deployment](#components-deployment)
- [Usage](#usage)
- [Customisation](#customisation)

## Overview

This Pulumi script automates the provision of scaleable and a secure infrastruce on AWS, specifically tailored to deploy. It is designed to provide a foundation for deploying scaleable and secure applications within the AWS cloud environment, as well as managing continuous intergration and deployment for the [frontend](https://github.com/ggrady00/ce-team-project-frontend) and [backend](https://github.com/ggrady00/ce-team-project-backend).

## Prerequisites 

### 1. Pulumi Installation 
Be sure Pulumi is installed on your local machine. If not you can download and install it feom the [official Pulumi website](https://www.pulumi.com/docs/install/)

To check if Pulumi is installed, run the following command in your terminal: 
```bash
pulumi --version
```

## Infrastructure
This code is written in JavaScript and use the [Pulumi Library](https://www.pulumi.com/registry/packages/aws/api-docs/) to defined the AWS infrastructure. 
### Modules 
#### s3 - fix later
#### 1. **Virtual Private Cloud (VPC)**
Defines the VPC named "AWSome-architechs" with CIDR block of "10.0.0.0/16", enabling DNS support and host names. 
The resources needed to make the VPC:
- **Pulic Subnets:** A list of public subnets associated with speific CIDR blocks and availability zones. 
- **Private Subnets:** A list of private subnets associated with speific CIDR blocks and availability zones. 
- **Internet Gateway**
- **Route Table**


#### Exported Resources
- Exports **VPC ID** and **subnet IDs** for reference in other Pulumi stacks.



#### 2. **EC2 Instances**  
The EC2 Instances section configures Elastic Compute Cloud instances, with scalable compute capacity in the AWS Cloud.
The resources needed to create the EC2:

#### Exported Resources:




### Deployment 

## Components Deployment


## Usage
### Monitoring and Alerting
Prometheus/Grafana

### Continuous Intergration
The [frontend](https://github.com/ggrady00/ce-team-project-frontend) and [backend](https://github.com/ggrady00/ce-team-project-backend) repo are all setup for usage with CircleCI and will build and push an image to AWS-ECR. 

In the build-image-and-push job the repo and public registry alias need to be changed in order to push to your own ECR repo.

#### **Changes needed when building images:**
#### **Frontend:**
- See the .env file.
- VITE_API_BASE_URL=backend-endpoint:8080
- Make sure to replace 'backend-endpoint' with the Backend Loadbalancer DNS.
#### **Backend:**
- db/migration - application.yml
- This yml file is setup to migrate the backend database to an RDS postgres instance.
- Change the datasource url to your own RDS endpoint, port and database name.

### Continous Deployment
argoCD & helm


```bash
```

## Customisation

