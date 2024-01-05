"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket");

const vpc = new aws.ec2.Vpc("awsome-architechs", {
    cidrBlock: "10.0.0.0/16", 
    enableDnsSupport: true,
    enableDnsHostnames: true,
    tags: {
        Name: "awsome-architechs",
    },
});

// Export the VPC ID
exports.vpcId = vpc.id;

// Export the name of the bucket
exports.bucketName = bucket.id;

// const pulumi = require("@pulumi/pulumi");
// const aws = require("@pulumi/aws");

// // Create an EC2 instance
// const server = new aws.ec2.Instance("web-server", {
//     // The AMI to use for the instance. This should be replaced with a valid AMI ID.
//     ami: "ami-0c55b159cbfafe1f0",
//     // The instance type, for example: 't2.micro'
//     instanceType: "t2.micro",
//     // The subnet ID to launch the instance in. Ensure this is in your selected VPC.
//     subnetId: "subnet-0123456789abcdef",
//     // Security groups the instance will belong to - replace with your actual security group IDs.
//     vpcSecurityGroupIds: ["sg-0123456789abcdef"],
//     // Optionally, you can specify the key name for SSH access.
//     keyName: "my-key-pair",
    
//     // Additional optional fields could include:
//     // userData: "#!/bin/bash\necho 'Hello, World!' > index.html", // User data script to run on instance start
//     // associatePublicIpAddress: true, // Whether to associate a public IP address with an instance in a VPC
//     // tags: {                          // Tags to add to the instance
//     //     Name: "web-server-instance",
//     // },
// });

// // Export the public IP of the instance
// exports.publicIp = server.publicIp;
// exports.publicHostName = server.publicDns;
