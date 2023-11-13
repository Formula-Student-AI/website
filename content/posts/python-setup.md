---
title: Python Setup
date: 08/11/2023 12:00
description: How to set up python on your personal laptop
---
**Installing Python:** [https://www.python.org/downloads/](https://www.python.org/downloads/)


**Windows Users:** Downloading the installer from the above link is probably the easiest way, but if you are used to Linux, you may instead wish to use the Windows Subsystem for Linux: [https://www.windowscentral.com/how-install-wsl2-windows-10](https://www.windowscentral.com/how-install-wsl2-windows-10). Installing Python on wsl is the same as installing it on ubuntu.

**MacOS Users:** Some versions of MacOS already have Python installed. Run `python --version` in your terminal to see if **python 3** is installed. If not, follow this guide: [https://docs.python-guide.org/starting/install3/osx/](https://docs.python-guide.org/starting/install3/osx/)

**Linux Users:** There's a good chance you already have Python installed; run `python --version` or `python3 --version` to make sure that you have **python 3** installed (some distros will have both python 2 and 3 installed; thus the need to check both.If you are running Debian/Ubuntu: 

```
$ sudo apt-get update
$ sudo apt-get install python3.6

```

If you are running a Red-Hat based distro (Fedora, CentOS, Rocky, RHEL):

```
$ sudo dnf install python3
```

## Conda Installation

Conda allows you to create virtual environments for your projects. You can install it here: [https://conda.io/projects/conda/en/latest/user-guide/install/index.html#regular-installation](https://conda.io/projects/conda/en/latest/user-guide/install/index.html#regular-installation)If you have issues downloading Conda, you can use venv (which comes installed with Python) instead.
