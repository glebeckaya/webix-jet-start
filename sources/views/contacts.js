import {JetView} from "webix-jet";

export default class ContactsView extends JetView {
	config() {
		return { 
			cols: [
				{ $subview: "contactsList", name: "list" }, 
				{ $subview: "contactsForm", name: "form" }
			]
		};
	}
	urlChange(){
		this.list = this.getSubView("list").getRoot().queryView({view:"list"});
		this.getSubView("form").bindWith(this.list);
		const id = this.getParam("id");
		if(!id) this.setParam("id", this.list.getFirstId(), true);
		if (id && this.list.exists(id)){
			this.list.select(id);
		}
	}
	ready() {
		this.on(this.list, "onAfterSelect", id => this.setParam("id", id, true));
	}
}