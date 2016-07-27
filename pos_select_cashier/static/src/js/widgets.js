function openerp_pos_select_cashier_widgets(instance, module){ //module = openerp.point_of_sale;
    var QWeb = instance.web.qweb;
	var _t = instance.web._t;
	
	module.PosWidget = module.PosWidget.extend({
		//Overload Section
        build_widgets: function(){
            this._super();
            
            this.selectcashier = new module.CashierSelectionScreenWidget(this, this.pos.db.cashiers);
            this.selectcashier.appendTo(this.$('.screens'));
            
            // Add new screen select cashier, set default screen = selectcashier
            // After load select cashier screen, reset the default screen for native function
            this.screen_selector.screen_set['selectcashier'] = this.selectcashier;
            this.screen_selector.default_screen = 'selectcashier';
            
            /**
             * Regis password confirm popup
             */
            this.password_confirm_popup = new module.PasswordConfirmPopupWidget(this,{});
            this.password_confirm_popup.appendTo(this.$el);
            
            this.screen_selector.popup_set['password_confirm'] = this.password_confirm_popup;
            // Hide the popup because all pop up are displayed at the
            // beginning by default
            this.password_confirm_popup.hide();
            
        },
	});
	
	module.UsernameWidget.include({
        renderElement: function(){
            var self = this;
            this._super();
            this.$el.click(function(){
            	self.show_select_cashier_screen();
            });
        },
        get_image: function(){
            var user;
            user = this.pos.cashier || false;
            if(user){
                return user.image;
            }else{
                return "";
            }
        },
        
        show_select_cashier_screen: function() {
        	/**
        	 * Check current screen is receipt or not?
        	 * for make sure selectedOrder was destroyed -> cart clear
        	 */
        	var current_screen = this.pos_widget.screen_selector.get_current_screen();
        	if (current_screen !== 'receipt') {
        		this.pos_widget.screen_selector.set_current_screen('selectcashier');
        	}
        }
	});
}
