
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
        	
        	this.$('.cashier-item').on('click', function(e) {
        		e.stopPropagation();
        		self.select_cashier(this);
        	});
        	// After load we reset the default screen
        	this.pos_widget.screen_selector.default_screen = this.back_screen;
        },
        
        back: function() {
            this.pos_widget.screen_selector.set_current_screen(this.back_screen);
        },
        
        color_random_generator: function() {
        	return "#" + Math.random().toString(16).slice(2, 8).toUpperCase();
        },
        
        select_cashier: function(target) {
        	var self = this;
        	
        	var required_password = self.pos.db.get_required_password();
        	var cashier_id = $(target).data('cashier-id');
    		cashier_id = parseInt(cashier_id);
        	if (required_password) {
        		self.pos_widget.screen_selector.show_popup('password_confirm',{
                    message: _t('password'),
                    confirm: function(password){
                        self.check_cashier_password(cashier_id, password);
                    },
                });
        	} else {
        		self.select_cashier_by_id(cashier_id);
        	}
        },
        
        check_cashier_password: function(cashier_id, password) {
        	var self = this,
        	input_password = self.pos.db.get_cashier_password(cashier_id);
        	
        	if (input_password === password) {
        		self.select_cashier_by_id(cashier_id);
        		self.pos_widget.screen_selector.close_popup();
        	} else {
        		alert('Wrong pass!');
        	}
        },
        
        select_cashier_by_id: function(cashier_id) {
        	var self = this;
        	this.pos.cashier = this.pos.db.get_cashier(cashier_id);
    		this.pos_widget.username = new module.UsernameWidget(self.parent, self.pos.cashier);
    		this.pos_widget.username.replace($('.cashier-display'));
            
    		this.back();
        }
	});
    
    module.PasswordConfirmPopupWidget = module.PopUpWidget.extend({
        template: 'PasswordConfirmPopupWidget',
        show: function(options){
            var self = this;
            this._super();

            this.message = options.message || '';
            this.renderElement();
            
            this.$('.button.cancel').click(function(){
                self.pos_widget.screen_selector.close_popup();
                if( options.cancel ){
                    options.cancel.call(self);
                }
            });

            this.$('.button.confirm').click(function(){
                self.button_confirm(options);
            });
            
            this.$('td.number-char').click(function(e){
            	self.numpad_char(this);
            });
            
            this.$('td.number-clear').click(function(e){
            	self.numpad_clear();
            });

			this.$('td.numpad-backspace').click(function(e){
				self.numpad_backspace();
			});
			
			self.$('#password_content').focus();
        },
        
        numpad_backspace: function() {
        	var self = this;
        	var pass = self.$('#password_content').val();
			if (pass.length > 0) {
				self.$('#password_content').val(pass.slice(0, -1));
			}
			self.$('#password_content').focus();
        },
        
        numpad_clear: function() {
        	this.$('#password_content').val('').focus();
        },
        
        numpad_char: function(target) {
        	var self = this,
        	char = $(target).html(),
        	pass = self.$('#password_content').val();
			
        	pass += char;
        	self.$('#password_content').val(pass).focus();
        },
        
        button_confirm: function(options) {
        	if (options.confirm) {
        		var self = this,
            	pass = self.$('#password_content').val();
            	options.confirm.call(self, pass);
            }
        }
    });
}
