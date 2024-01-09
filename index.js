"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const eks = require("@pulumi/eks");

const bucket = new aws.s3.Bucket("my-bucket");

//VPC
const vpc = new aws.ec2.Vpc("awsome-architechs", {
  cidrBlock: "10.0.0.0/16",
  enableDnsSupport: true,
  enableDnsHostnames: true,
  tags: {
    Name: "awsome-architechs",
  },
});

//Public and Private Subnets
const publicCidrBlocks = ["10.0.2.0/24", "10.0.4.0/24", "10.0.6.0/24"];
const privateCidrBlocks = ["10.0.1.0/24", "10.0.3.0/24", "10.0.5.0/24"];
const azs = pulumi.output(aws.getAvailabilityZones({}));

const publicSubnets = publicCidrBlocks.map((cidrBlock, index) => {
  return new aws.ec2.Subnet(`public-subnet-${index + 1}`, {
    vpcId: vpc.id,
    cidrBlock,
    availabilityZone: azs.names[index],
    mapPublicIpOnLaunch: true,
    tags: {
      Name: `public-subnet-${index + 1}`,
    },
  });
});

const privateSubnets = privateCidrBlocks.map((cidrBlock, index) => {
  return new aws.ec2.Subnet(`private-subnet-${index + 1}`, {
    vpcId: vpc.id,
    cidrBlock,
    availabilityZone: azs.names[index],
    mapPublicIpOnLaunch: false,
    tags: {
      Name: `private-subnet-${index}`,
    },
  });
});

const internetGateway = new aws.ec2.InternetGateway("my-internet-gateway", {
  vpcId: vpc.id,
});

const routeTable = new aws.ec2.RouteTable("awsome-architechs", {
  vpcId: vpc.id,
});

const route = new aws.ec2.Route("my-route", {
  routeTableId: routeTable.id,
  destinationCidrBlock: "0.0.0.0/0",
  gatewayId: internetGateway.id,
});

const routeTableAssociation = publicSubnets.map((publicSubnetsId, index) => {
  return new aws.ec2.RouteTableAssociation(`awsome-architechs-${index}`, {
    subnetId: publicSubnetsId,
    routeTableId: routeTable.id,
  });
});

//Security Groups
const sgHttp = new aws.ec2.SecurityGroup("allowHttp", {
  name: "allow_http",
  description: "Allow HTTP inbound traffic",
  vpcId: vpc.id,
  ingress: [
    {
      fromPort: 80,
      toPort: 80,
      protocol: "tcp",
      cidrBlocks: ["0.0.0.0/0"],
    },
  ],
  tags: {
    Name: "http",
  },
});

const sgHttps = new aws.ec2.SecurityGroup("allowHttps", {
  name: "allow_https",
  description: "Allow HTTPS inbound traffic",
  vpcId: vpc.id,
  ingress: [
    {
      fromPort: 443,
      toPort: 443,
      protocol: "tcp",
      cidrBlocks: ["0.0.0.0/0"],
    },
  ],
  tags: {
    Name: "https",
  },
});

const sgEgress = new aws.ec2.SecurityGroup("allowEgress", {
  name: "allow_egress",
  description: "Allow all outbound traffic",
  vpcId: vpc.id,
  egress: [
    {
      fromPort: 0,
      toPort: 0,
      protocol: "-1",
      cidrBlocks: ["0.0.0.0/0"],
    },
  ],
  tags: {
    Name: "Egress",
  },
});

const allowPort3000 = new aws.ec2.SecurityGroupRule(
  "allow3000",
  {
    type: "ingress",
    fromPort: 3000,
    toPort: 3000,
    protocol: "tcp",
    cidrBlocks: ["0.0.0.0/0"],
    securityGroupId: sgHttp.id,
  },
  { dependsOn: [sgHttp] }
);


//IAM roll with the correct policies attached
const iamRoleArn = "arn:aws:iam::401404824186:role/Eks_manager";

//eks cluster
const eksCluster = new aws.eks.Cluster("awsome-architechs-cluster", {
  instanceType: "t2.medium",
  desiredCapacity: 2,
  minSize: 1,
  maxSize: 3,
  deployDashboard: false,
  roleArn: iamRoleArn,
  vpcConfig: {
    subnetIds: publicSubnets.map((publicSubnets) => publicSubnets.id),
    securityGroupIds: [sgHttp.id, sgHttp.id, sgEgress.id],
  },
});

const launchConfig = new aws.ec2.LaunchConfiguration("launchConfig", {
  instanceType: "t2.micro",
  securityGroups: [sgEgress.id, sgHttps.id, sgHttp.id],
  imageId: "ami-0e5f882be1900e43b",
});

//databases
const dbInstance = new aws.rds.Instance("my-db-instance", {
    allocatedStorage: 10,
    engine: "postgres",
    engineVersion: "15.4",
    instanceClass: "db.t3.micro",
    dbName: "awsome_db",
    username: "postgres",
    password: "cloud123",
    skipFinalSnapshot: true,
});

exports.vpcId = vpc.id;
exports.privateSubnetsIds = privateSubnets.map(
  (privateSubnets) => privateSubnets.id
);
exports.publicSubnetsIds = publicSubnets.map(
  (publicSubnets) => publicSubnets.id
);
exports.bucketName = bucket.id;
exports.internetGatewayId = internetGateway.id;
exports.routeTableId = routeTable.id;
exports.routeTableAssociationId = routeTableAssociation.map(
  (assoc) => assoc.id
);
exports.httpSecurityGroupId = sgHttp.id;
exports.httpsSecurityGroupId = sgHttps.id;
exports.egressSecurityGroupId = sgEgress.id;
exports.dbInstanceAddress = dbInstance.address;
exports.dbInstancePort = dbInstance.port;
// exports.kubeconfig = cluster.kubeconfig;
// exports.clusterName = cluster.eksCluster.name;
