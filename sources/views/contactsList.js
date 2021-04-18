import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import PopupView from "views/windows/popup";

export default class ContactsListView extends JetView {
	config() {
		return {
			rows: [
				{ template: "All contacts", css: "webix_shadow_medium app_start", height: 40 },
				{
					view: "list",
					localId: "list",
					data: contacts,
					template: "#Name#",
					scroll: "y",
					select: true
				},
				{
					view: "button",
					value: "Add new" , 
					css: "webix_primary",
					click: () => this._jetPopup.showWindow()
				}
			]
		};
	}
	init() {
		this._jetPopup = this.ui(PopupView);
	}
	ready() {
		this.on(this.app, "onDataSave", (data, form)=>{
			if(data){
				contacts.add(data);
				form.clear();
			}
		});
	}
}