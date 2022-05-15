Title: 102.6 Linux as a virtualization guest
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: Candidates should understand the implications of virtualization and cloud computing on a Linux guest system.
sortorder: 110

<div class="alert alert-danger" role="alert">
  This chapter is still a Work In Progress. Do not rely on it for LPIC version 500 exam. Will be updated in a few weeks.
</div>



_Weight: 3_

Candidates should understand the implications of virtualization and cloud computing on a Linux guest system.

### Goals

* Know the Hypervisors and it's two types
* Know the container concepts both the application container and operating system container
* Create a Virtual machine
* Know the cloud system provider (CSP) and how to log in using an SSH host key to different cloud based VMs.

#### Introduction

Virtual machines (VMs) are simulated computer systems that appear and act as physical machines to their users. The process of creating these virtual machines is called virtualization.

#### Managing VMs

The primary software tool used to create and manage VMs is a hypervisor , which has been historically called either a virtual machine monitor or a virtual machine manager (VMM).

#### Creating a Virtual Machine

There are many ways to create a virtual machine. When first starting out, most people will create a Linux virtual machine from the ground up; they set up the VM specifications within the hypervisor software of their choice and use an ISO file (live or otherwise) to install the guest operating system.

#### Integrating via Linux Extensions

Before you jump into creating virtual machines, it’s important to check that your Linux host system will support virtualization and the hypervisor product you have chosen. This support is accomplished via various extensions and modules.

#### Understanding Containers

Containers are virtual entities, but they are different from virtual machines and serve distinct purposes.

#### Looking at Infrastructure as a Service

With the high expenses of maintaining hardware and providing the electricity to run servers as well as cool them,many companies are looking to cloud-based data centers. For virtualization, companies turn to Infrastructure as a Service (IaaS) providers.

When using a cloud-based virtualized environment, you should know a few additional terms that will assist in selecting a CSP. They are as follows:

* Computing Instance
* Cloud Type
* Elasticity
* Load Balancing
* Management Console or Portal
* lock and Object Storage
* Remote Instance Access

#### Summary

Moving your system from running directly on a physical system to a virtualized environment, such as a virtual machine or a container, is becoming very popular among
businesses. You will need to understand the basic concepts of providing a virtualized
environment within your company’s data center, and/or using IaaS is critical for modern
TechOps.
