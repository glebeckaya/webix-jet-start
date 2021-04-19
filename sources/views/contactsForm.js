import {JetView} from "webix-jet";
import {statuses} from "models/statuses";
import {countries} from "models/countries";
import {contacts} from "models/contacts";

export default class ContactsFormView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		return {
			rows: [
				{
					view: "form",
					localId: "contactsForm",
					width: 300,
					elements: [
						{ template: _("Contacts"), type: "section" },
						{ view: "text", label: _("Name"), name: "Name", invalidMessage: _("fieldRequired"), bottomPadding: 25 },
						{ view: "text", label: "Email", name: "Email", invalidMessage: _("requiredEmail"), bottomPadding: 30 },
						{ 
							view: "combo", 
							label: _("Status"), 
							name: "Status", 
							bottomPadding: 25,
							invalidMessage: _("fieldRequired"),
							suggest: {
								data: statuses,
								template: "#Name#",
								body: {
									template: "#Name#",
								}
							}
						},
						{ 
							view: "combo", 
							label: _("Country"), 
							name: "Country", 
							bottomPadding: 25,
							invalidMessage: _("fieldRequired"),
							suggest: {
								data: countries,
								template: "#Name#",
								body: {
									template: "#Name#",
								}
							} 
						},
						{ margin: 5, cols: [
							{ 
								view: "button", 
								value: _("Edit"), 
								css: "webix_primary",
								click: () => this.saveFormValues(_),
							},
							{ 
								view: "button", 
								value: _("Clear"),
								click: () => this.clearForm()
							}
						]}
					],
					rules: {
						Name: webix.rules.isNotEmpty,
						Email: webix.rules.isEmail,
						Status: webix.rules.isNotEmpty,
						Country: webix.rules.isNotEmpty,
					}
				},
				{}
			]
		};
	}
	init() {
		this.form = this.$$("contactsForm");
	}
	urlChange() {
		const id = this.getParam("id", true);
		if (id && contacts.exists(id)){
			this.form.setValues(contacts.getItem(id));
		} else {
			this.form.clear();
		}
	}
	saveFormValues(_) {
		if (!this.form.validate()) {
			webix.message(_("checkFields"));
			return false;
		}
		const values = this.form.getValues();
		contacts.updateItem(values.id, values);	
	}
	clearForm() {
		webix.confirm({
			text: "Form data will be cleared"
		}).then(
			() => {
				this.form.clear();
				this.form.clearValidation();
			}
		);
	}
}