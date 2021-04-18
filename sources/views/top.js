import {JetView} from "webix-jet";

export default class TopView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		const header = { view: "label", label:_("FirstApp"), css: "webix_header app_header" };

		const menu = {
			view: "menu", 
			id: "top:menu", 
			css: "app_menu",
			width: 180, 
			layout: "y", 
			select: true,
			template: (obj) => {
				return `<span class='webix_icon ${obj.icon}'></span> ${_(obj.value)}`;
			},
			data:[
				{ value: "Contacts", id: "contacts", icon: "wxi-columns", href: "#!/top/contacts?id=1" },
				{ value: "Data", id: "data", icon: "wxi-pencil", href: "#!/top/data" },
				{ value: "Settings", id: "settings", icon: "wxi-calendar", href: "#!/top/settings" }
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
}