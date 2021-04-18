import {JetView} from "webix-jet";
import ContactsListView from "views/contactsList";
import ContactsFormView from "views/contactsForm";

export default class ContactsView extends JetView {
	config() {
		return { cols: [{ $subview: ContactsListView }, { $subview: ContactsFormView }] };
	}
}
