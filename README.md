<h1 align="center">
  <br>
 <img src="./Add a heading (4).png" alt="Markdownify" width="200"></a>

</h1>

<h1 align="center">
Infrastructure Deployment with CI/CD - Pulumi
</h1>

### by AWSome Architechs 

<p align="center">
  <a href="https://aws.amazon.com/">
    <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"
         alt="Gitter" width="">
  </a>
  <a href="https://www.pulumi.com/aws/"><img src=https://img.shields.io/badge/Pulumi-8A3391?style=for-the-badge&logo=pulumi&logoColor=white></a>
  <a href="https://kubernetes.io/">
      <img src="https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white">
  </a>
  <a href="https://circleci.com/">
    <img src="https://img.shields.io/badge/circle%20ci-%23161616.svg?style=for-the-badge&logo=circleci&logoColor=white">
  </a>
    <a href="https://www.postgresql.org/">
    <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white">
  </a>
    </a>
    <a href="https://prometheus.io/">
    <img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)">
  </a>
    </a>
    <a href="https://grafana.com/">
    <img src="https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white">
  </a>
      </a>
    <a href="https://argo-cd.readthedocs.io/en">
    <img src="https://img.shields.io/badge/argocd-%235091CD.svg?style=for-the-badge&logo=argo&logoColor=white">
  </a>
      </a>
    <a href="https://argo-cd.readthedocs.io/en">
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
  </a>

</p>


<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#prerequisites">Prerequistes</a> •
  <a href="#infrastructure">Infrastructure</a> •
    <a href="#components-deployed">Components Deployed</a> •
  <a href="#usage">Usage</a> •
  <a href="#troubleshooting">Troubleshooting</a>
</p>


## Overview
This Pulumi script automates the creation and management of a cloud-based infrastructure for a learner management system, incorporating DevOps practices for scalability and efficiency. Tailored for AWS, it provides a foundation for deploying secure applications and includes continuous integration and deployment for the frontend and backend.

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




## Components Deployed


## Usage
### Monitoring and Alerting
Prometheus/Grafana

### Continuous Integration
The [frontend](https://github.com/AnamariaGM/ce-team-project) repo are all setup for usage with CircleCI and will build and push an image to AWS-ECR.
In the build-image-and-push job the repo and public registry alias need to be changed in order to push to your own ECR repo.
<br>
<br> See the [**Usage**](https://github.com/AnamariaGM/ce-team-project?tab=readme-ov-file#usage) for infromation on how to intergrate using Circle CI. 


### Continuous Deployment
Utilizing ArgoCD, automate synchronization with your project repository based on commits. Set up your application in the ArgoCD dashboard, specifying deployment file paths, target cluster, and namespace for automatic syncing and deployment.
<br>
<br> See the [**Usage**](https://github.com/AnamariaGM/ce-team-project?tab=readme-ov-file#usage) for information on how to deploy using ArgoCD.
