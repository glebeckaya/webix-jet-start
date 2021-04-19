import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		const header = { view: "label", label:_("FirstApp"), css: "webix_header app_header" };

		const menu = {
			view: "menu", 
			id: "menu", 
			css: "app_menu",
			width: 180, 
			layout: "y", 
			select: true,
			template: (obj) => {
				return `<span class='webix_icon ${obj.icon}'></span> ${_(obj.value)}`;
			},
			data:[
				{ value: "Contacts", id: "contacts", icon: "wxi-columns" },
				{ value: "Data", id: "data", icon: "wxi-pencil" },
				{ value: "Settings", id: "settings", icon: "wxi-calendar" }
			]
		};

		return {
			type: "clean", 
			paddingX: 5, 
			css: "app_layout", 
			cols: [
				{ 
					paddingX: 5, 
					paddingY: 10, 
					rows: [{ css: "webix_shadow_medium", rows: [header, menu]}]
				},
				{ 
					type: "wide", 
					paddingY: 10, 
					paddingX: 5, 
					rows: [{ $subview: true }]
				}
			]
		};
	}
	init(){
		this.use(plugins.Menu, "menu");
	}
}