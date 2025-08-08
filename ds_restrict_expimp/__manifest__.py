# -*- coding: utf-8 -*-
{
    'name' : 'Restriction ActionMenu Export & Favorite menu Import Records',
    'version' : '1.0',
    'summary': 'Restriction Button Export & Import',
    'sequence': -1,
    'description': """
Restriction ActionMenu Export & Favorite menu Import Records
============================================================

In this module, there is a feature to restrict access to the action menu `export` and the favorite menu `import records` 
based on the model by the user who is logged in to ODOO, this access restriction is flexible and very useful.
""",
    'author': 'Helmi Ananda Putra',
    'category': 'Hidden/Tools',
    'depends' : ['base', 'base_import', 'web'],
    'data': [
        'views/res_users_views.xml',
    ],
    'license': 'OPL-1',  # Odoo Proprietary License v1.0
    'demo': [
    ],
    'installable': True,
    'application': True,
    'assets': {
        'web.assets_backend': [
            'ds_restrict_expimp/static/src/components/*/*.js',
            'ds_restrict_expimp/static/src/components/*/*.xml',
        ],
    },
}