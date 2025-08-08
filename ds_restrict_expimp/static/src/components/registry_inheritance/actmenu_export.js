/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { ListController } from "@web/views/list/list_controller";
import { useService } from "@web/core/utils/hooks";

const { onWillStart } = owl;

patch(ListController.prototype, "export_restrict.ListController", {
    setup() {
        this._super.apply(this, arguments);
        this.orm = useService("orm");
        this.user = useService("user");
        
        // Initialize variables
        this.restrictExport = false;
        this.restrictedModels = [];
        
        onWillStart(async () => {
            await this.loadUserRestrictionData();
        });
    },

    async loadUserRestrictionData() {
        // Load user data
        const [userData] = await this.orm.searchRead(
            'res.users',
            [["id", "=", this.user.userId]],
            ['restrict_export', 'restrict_export_on_model_ids']
        );
        
        this.restrictExport = userData.restrict_export;

        
        if (userData.restrict_export_on_model_ids?.length) {
            // Load all restricted models
            const modelsData = await this.orm.searchRead(
                'ir.model',
                [["id", "in", userData.restrict_export_on_model_ids]],
                ['model']
            );
            
            this.restrictedModels = modelsData.map(model => model.model);
        }
    },

    getActionMenuItems() {
        const actionMenuItems = this._super.apply(this, arguments);
        
        // Check if export should be restricted for current model
        if (this.restrictExport && this.restrictedModels.includes(this.props.resModel)) {
            return this._filterExportItems(actionMenuItems);
        }
        return actionMenuItems;
    },

    _filterExportItems(menuItems) {
        if (!menuItems) return menuItems;
        
        // Create a deep copy to avoid modifying the original
        const filteredItems = JSON.parse(JSON.stringify(menuItems));
        
        // Filter out export items from "more" section
        if (filteredItems.other) {
            filteredItems.other = filteredItems.other.filter(item => 
                !item?.key?.includes("export") && 
                !item?.description?.toLowerCase()?.includes("export")
            );
        }
        
        return filteredItems;
    }
});