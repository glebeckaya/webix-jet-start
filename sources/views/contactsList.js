import {JetView} from "webix-jet";
import {contacts} from "models/contacts";

export default class ContactsListView extends JetView {
	config() {
		return {
			rows: [
				{ template: "All contacts", css: "webix_shadow_medium app_start", height: 40 },
				{
					view: "list",
					data: contacts,
					template: "#Name#",
					scroll: "y",
				},
			]
		};
	}
}