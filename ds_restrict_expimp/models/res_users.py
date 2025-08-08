from odoo import models, fields

class ResUsers(models.Model):
    _inherit = 'res.users'
    
    restrict_export = fields.Boolean(string='Restrict Export', default=False)
    restrict_import = fields.Boolean(string='Restrict Import', default=False)
    restrict_export_on_model_ids = fields.Many2many('ir.model', 'restrict_export_irmodel_rel', 'restrict_export_irmodel_id', string="Models Restricted Export", help="The list of models Restricted Export.")
    restrict_import_on_model_ids = fields.Many2many('ir.model', 'restrict_import_irmodel_rel', 'restrict_import_irmodel_id', string="Models Restricted Import", help="The list of models Restricted Import.")