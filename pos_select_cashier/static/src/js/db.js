
function openerp_pos_select_cashier_db(instance, module){ //module = openerp.point_of_sale;
    var QWeb = instance.web.qweb,
    _t = instance.web._t;
    
    module.PosDB.include({
    	init: function(options){
			this._super();
			// Cashier
			this.cashiers = {}
			this.cashier_by_id = {};
			// required password
			this.required_password = false;
    	},

    	set_cashier: function(users) {
        	this.cashiers = users;
        	var self = this;
        	_.each(users, function(user) {
        		self.cashier_by_id[user.id] = {
        			image: user.image_small,
        			name: user.name,
        			id: user.id,
        			cashier_password: user.cashier_password || '',
        		}
        	});
        },

        get_cashier: function(id) {
        	if (typeof(id) == 'undefined') {
        		return this.cashiers;
        	}
        	return this.cashier_by_id[id] || {};
        },
        
        set_required_password: function(config) {
        	this.required_password = config.required_password || false;
        },
        
        get_required_password: function(config) {
        	return this.required_password;
        },
        
        get_cashier_password: function(cashier_id) {
        	var cashier = this.get_cashier(cashier_id);
        	
        	if (_.isEmpty(cashier)) {
        		return false;
        	} else {
        		return cashier.cashier_password;
        	}
        }
    });
}
