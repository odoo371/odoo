/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks"
import { ImportRecords } from "@base_import/import_records/import_records";

const { onWillStart, onWillRender, useState } = owl;

patch(ImportRecords.prototype, "ds_restrict_expimp_import_records", {
    setup() {
        this._super(...arguments);
        // Get services from root
        const { services } = this.env;
        // Alternative method to get current model
        this.action = useService("action")
        this.user = this.env.services.user;
        this.orm = useService("orm"); // Get ORM service
        this.userId = this.user.userId;
        
        this.state = useState({
            loading: true,
            userData: null,
            allowedModels: [],
        });
        

        onWillStart(async () => {
            // Load user data
            this.state.userData = await this.loadResUsersData(this.userId);
            
            // Load model data if restrictions exist
            if (this.state.userData[0]?.restrict_import_on_model_ids?.length) {
                const modelData = await this.loadIrModelsData(this.state.userData[0].restrict_import_on_model_ids);
                this.state.allowedModels = modelData.map(obj => obj.model);
            }
            
            this.state.loading = false;
        });

    },

    async loadResUsersData(id) {
        const resUserLogin = this.orm.searchRead(
            'res.users',
            [["id", "=", id]],
            ['name', 'login', 'restrict_import', 'restrict_import_on_model_ids'],
        );
        
        return resUserLogin;
    },

    async loadIrModelsData(ids) {
        const irModels = this.orm.searchRead(
            'ir.model',
            [["id", "in", ids]],
            ['id', 'name', 'model'],
        );
        
        return irModels;
    },

    get canImport() {
        // Get the current model directly from props
        const currentModel = this.action.currentController.props.resModel;
        
        if (!currentModel) {
            return false;
        }
        
        const userData = this.state.userData[0];
        const allowedModels = this.state.allowedModels;
        const user_restrict_import = userData.restrict_import
        
        const isModelAllowed = allowedModels.includes(currentModel);

        var visible_import_records = true;
        if (user_restrict_import === true) {
            if (isModelAllowed === true) {
                visible_import_records = false;
            }
        }
        
        return visible_import_records;
    }
});