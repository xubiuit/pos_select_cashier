function openerp_pos_select_cashier_models(instance, module){ //module = openerp.point_of_sale;
    var QWeb = instance.web.qweb;
	var _t = instance.web._t;
    
    var PosModelSuper = module.PosModel;
    module.PosModel = module.PosModel.extend({
        
        models: (function() {
			
        	var base_posmodel_model = module.PosModel.prototype.models;
			
			base_posmodel_model.push(
				 // get users (cashier belong to current pos config)
	            {
	            	model: 'res.users',
	            	fields: ['id', 'image_small', 'name', 'ean13', 'cashier_password'],
	            	domain: function(self){ 
	            		return [['pos_config','=', self.pos_session.config_id[0]]]; 
	            	},
	            	loaded: function(self, users){
	            		self.users = users;
						self.db.set_cashier(users);
	                },
	            },{
	                model: 'pos.config',
	                fields: ['required_password'],
	                domain: function(self){ return [['id','=', self.pos_session.config_id[0]]]; },
	                loaded: function(self,configs){
	                    self.db.set_required_password(configs[0]);
	                },
	            }
	            
			);
			return base_posmodel_model;
		})(),
    });
}
