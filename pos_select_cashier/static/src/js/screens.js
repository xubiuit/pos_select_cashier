
function openerp_pos_select_cashier_screens(instance, module){ //module = openerp.point_of_sale;
    var QWeb = instance.web.qweb,
    _t = instance.web._t;
    
    module.CashierSelectionScreenWidget = module.ScreenWidget.extend({
		template: 'CashierSelectionScreenWidget',
		back_screen: 'products', // TODO: remove by default screen
		init: function(parent, options){
			this.options = options || [];
			this.parent = parent || {}
            this._super(parent, options);
        },

        show_leftpane: false,
        
        show: function() {
        	this._super();
        	var self = this;
        	
        	this.$('.select-cashier').on('click', function(e) {
        		// TODO: check is required password to show a password for user
        		var cashier_id = $(e.target).data('cashier-id');
        		cashier_id = parseInt(cashier_id);
        		self.pos.cashier = self.pos.db.get_cashier(cashier_id);
        		self.pos_widget.username = new module.UsernameWidget(self.parent, self.pos.cashier);
                self.pos_widget.username.replace($('.cashier-display'));
                
        		self.back();
        	});
        	// After load we reset the default screen
        	this.pos_widget.screen_selector.default_screen = this.back_screen;
        },
        
        back: function() {
            this.pos_widget.screen_selector.set_current_screen(this.back_screen);
        },
	});
}
