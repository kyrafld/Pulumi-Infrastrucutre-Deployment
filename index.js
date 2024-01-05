"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");

const bucket = new aws.s3.Bucket("my-bucket");

const vpc = new aws.ec2.Vpc("awsome-architechs", {
  cidrBlock: "10.0.0.0/16",
  enableDnsSupport: true,
  enableDnsHostnames: true,
  tags: {
    Name: "awsome-architechs",
  },
});

const publicCidrBlocks = ["10.0.2.0/24", "10.0.4.0/24", "10.0.6.0/24"]
const privateCidrBlocks = ["10.0.1.0/24", "10.0.3.0/24", "10.0.5.0/24"]
const azs = pulumi.output(aws.getAvailabilityZones({}));

const publicSubnets = publicCidrBlocks.map((cidrBlock, index) => {
  return new aws.ec2.Subnet(`public-subnet-${index + 1}`, {
    vpcId: vpc.id,
    cidrBlock,
    availabilityZone: azs.names[index],
    mapPublicIpOnLaunch: true,
    tags: {
      Name: `public-subnet-${index}`
    }
  });
});

const privateSubnets = privateCidrBlocks.map((cidrBlock, index) => {
  return new aws.ec2.Subnet(`private-subnet-${index + 1}`, {
    vpcId: vpc.id,
    cidrBlock,
    availabilityZone: azs.names[index],
    mapPublicIpOnLaunch: false,
    tags: {
      Name: `private-subnet-${index}`
    }
  });
});

const internetGateway = new aws.ec2.InternetGateway('my-internet-gateway', {
  vpcId: vpc.id,
});

const routeTable = new aws.ec2.RouteTable('awsome-architechs', { vpcId: vpc.id,
});

const route = new aws.ec2.Route('my-route', {
  routeTableId: routeTable.id,
  destinationCidrBlock: '0.0.0.0/0',
  gatewayId: internetGateway.id,
})

const routeTableAssociation = publicSubnets.map((publicSubnetsId , index) => {
  return new aws.ec2.RouteTableAssociation(`awsome-architechs-${index}`, {
  subnetId: publicSubnetsId, 
  routeTableId: routeTable.id,
});
})

exports.vpcId = vpc.id;
exports.privateSubnetsIds = privateSubnets.map(privateSubnets => privateSubnets.id)
exports.publicSubnetsIds= publicSubnets.map(publicSubnets => publicSubnets.id);
exports.bucketName = bucket.id;
exports.internetGatewayId = internetGateway.id;
exports.routeTableId = routeTable.id;
exports.routeTableAssociationId = routeTableAssociation.map(assoc => assoc.id)


