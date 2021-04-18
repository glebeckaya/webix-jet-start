import {JetView} from "webix-jet";

export default class ContactsFormView extends JetView {
	config() {
		return {
			type: "clean",
			rows: [
				{
					view: "form",
					localId: "contactsForm",
					width: 300,
					elements: [
						{ template: "Contacts", type: "section" },
						{ view: "text", label: "Name", name: "Name", invalidMessage: "This field is required", bottomPadding: 20 },
						{ view: "text", label: "Email", name: "Email", invalidMessage: "This field is required", bottomPadding: 20 },
						{ view: "text", label: "Status", name: "Status", bottomPadding: 20 },
						{ view: "text", label: "Country", name: "Country", bottomPadding: 20 },
						{ margin: 5, cols: [
							{ 
								view: "button", 
								value: "Add new" , 
								css: "webix_primary",
								click: () => this.validateForm(),
							},
							{ 
								view: "button", 
								value: "Clear",
								click: () => this.clearForm()
							}
						]}
					],
					rules: {
						Name: webix.rules.isNotEmpty,
						Email: webix.rules.isNotEmpty,
					}
				},
				{}
			]
		};
	}
	validateForm() {
		if (!this.$$("contactsForm").validate()) webix.message("Please, check all fields!");
	}
	clearForm() {
		const form = this.$$("contactsForm");
		webix.confirm({
			text: "Form data will be cleared"
		}).then(
			() => {
				form.clear();
				form.clearValidation();
			}
		);
	}
}
