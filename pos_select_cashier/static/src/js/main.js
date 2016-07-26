
openerp.pos_select_cashier = function(instance) {

    instance.pos_select_cashier = {};

    var module = openerp.point_of_sale;
    
    openerp_pos_select_cashier_db(instance,module);         // import db.js

    openerp_pos_select_cashier_models(instance,module);     // import pos_restaurant_menu_models.js

    openerp_pos_select_cashier_screens(instance,module);	   // import pos_select_cashier_screens.js
    
    openerp_pos_select_cashier_widgets(instance,module);    // import pos_select_cashier_widgets.js
    
};

    
