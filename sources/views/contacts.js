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
		this.on(this.list, "onAfterSelect", id => {
			this.setParam("id", id, true);
		});
		this._ = this.app.getService("locale")._;
	}
	urlChange(){
		const id = this.getParam("id");
		if(!contacts.exists(id)) this.setParam("id", contacts.getFirstId(), true);
		if (id && this.list.exists(id)){
			this.list.select(id);
		}
	}
	saveNewContact() {
		webix.prompt({
			text: this._("PromptNewContact"),
			ok: this._("Add new"),
			cancel: this._("Cancel"),
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
		showConfirmMessage(id, contacts, this._).then(() => {
			const firstItem = this.list.getFirstId();
			if (firstItem)	{
				this.list.select(firstItem);
			} else {
				this.show("/top/contacts");
			}			
		});	
	}
}