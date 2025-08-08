# Restrict ActionMenu Export & Favorite Menu Import Records

![Odoo Version](https://img.shields.io/badge/Odoo-16.0-blue)
![License](https://img.shields.io/badge/License-OPL--1-green)

## Overview

This Odoo module provides flexible access control for two critical operations:
1. **Export** functionality in the Action menu
2. **Import Records** option in the Favorite menu

Administrators can restrict these features on a per-model basis, ensuring users only see these options when they have the appropriate permissions.

## Key Features

- Model-level access control for Export and Import operations
- Configurable through user and permissions
- Preserves all other menu items while selectively hiding restricted options
- Lightweight implementation with minimal performance impact
- Compatible with both community and enterprise editions

## Installation

1. Clone or place the module in your Odoo addons directory
2. Install as a standard Odoo module:
   - Via Apps menu in Odoo interface, or
   - Using Odoo command line: `-i ds_restrict_expimp`

## Configuration

1. Navigate to **Settings → Users & Companies → Groups**
2. Select or create a user
3. Configure the following permissions:
   - **Export Restrictions**: Set which models the user can export from
   - **Import Restrictions**: Set which models the user can import to
4. Assign users to appropriate groups

## Usage

Once configured:
- Users will only see the Export option for models they have permission to export
- The Import Records option will only appear for models where the user has import privileges
- All restrictions are enforced server-side for security

## Technical Details

- Overrides `get_view` and `get_user_actions` to filter menu items
- Adds new permission fields to user
- Maintains Odoo's standard security model
- Compatible with Odoo's web client and mobile interfaces

## Support

For issues or feature requests, please open an issue on our GitHub repository.

**Maintainer**: [Helmi Ananda Putra]  
**License**: OPL-1
