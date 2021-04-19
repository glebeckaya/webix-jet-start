import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import {showConfirmMessage} from "helpers/deleteItem";

export default class ContactsView extends JetView {

	config() {
		const _ = this.app.getService("locale")._;

		return {
			cols: [
				{
					rows: [
						{ template: _("All contacts"), css: "webix_shadow_medium app_start", height: 40 },
						{
							view: "list",
							localId: "list",
							css: "contacts-list",
							// data: contacts,
							template: "#Name# <div class='webix_icon wxi-trash'></div>",
							scroll: "y",
							select: true,
							onClick: {
								"wxi-trash": (e, id) => this.deleteItem(id) 
							}
						},
						{
							view: "button",
							value: _("Add new"), 
							css: "webix_primary",
							click: () => this.saveNewContact()
						}
					]
				},
				{ $subview: "contactsForm", name: "form" }
			]
			
		};
	}
	init() {
		this.list = this.$$("list");
		this.list.parse(contacts);
	}
	urlChange(){
		const id = this.getParam("id");
		if(!this.list.getItem(id)) this.setParam("id", this.list.getFirstId(), true);
		if (id && this.list.exists(id)){
			this.list.select(id);
			this.getSubView("form").setNewValues(this.list.getItem(id));
		}
	}
	ready() {
		this.on(this.app, "onDataSave", (data) => {
			if(data) {
				contacts.updateItem(data.id, data);	
			}
		});
		this.on(this.list, "onAfterSelect", id => {
			this.setParam("id", id, true);
			this.getSubView("form").setNewValues(this.list.getItem(id));
		});
	}
	saveNewContact() {
		webix.prompt({
			title: "Please, type name of new contact",
			ok: "Add",
			cancel: "Cancel",
			input: {
				required: true,
			},
			width:350,
		}).then(result => {
			const data = {Name: result};
			contacts.add(data);
			this.list.select(data.id);
		});
	}
	deleteItem(id) {
		showConfirmMessage(id, contacts).then(() => {
			const firstItem = this.list.getFirstId();
			if (firstItem)	{
				this.list.select(firstItem);
			} else {
				this.app.callEvent("onContactsEnpty");
			}			
		});	
	}
}