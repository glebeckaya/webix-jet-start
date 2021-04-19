import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import {countries} from "models/countries";
import PopupView from "views/windows/popup";
import {showConfirmMessage} from "helpers/deleteItem";

export default class ContactsListView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		return {
			rows: [
				{ template: _("All contacts"), css: "webix_shadow_medium app_start", height: 40 },
				{
					view: "list",
					localId: "list",
					css: "contacts-list",
					data: contacts,
					template: (obj) => {
						const idCountry = obj.Country;
						return `${obj.Name} from ${countries.getItem(idCountry).Name} <div class='webix_icon wxi-trash'></div>`;
					},
					scroll: "y",
					select: true,
					onClick: {
						"wxi-trash": (e, id) => showConfirmMessage(id, this.list).then(() => this.list.select(this.list.getFirstId()))
					}
				},
				{
					view: "button",
					value: _("Add new"), 
					css: "webix_primary",
					click: () => this._jetPopup.showWindow()
				}
			]
		};
	}
	init() {
		this.list = this.$$("list");
		this._jetPopup = this.ui(PopupView);
	}
	ready() {
		this.on(this.app, "onDataSave", (data, form)=>{
			if(data){
				contacts.add(data);
				form.clear();
				this.list.select(data.id);
			}
		});
	}
}
