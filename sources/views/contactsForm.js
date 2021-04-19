import {JetView} from "webix-jet";
import {statuses} from "models/statuses";
import {countries} from "models/countries";

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
						{ view: "text", label: _("Name"), name: "Name", invalidMessage: "This field is required", bottomPadding: 25 },
						{ view: "text", label: "Email", name: "Email", invalidMessage: "your-name@domain.com - required format of Email", bottomPadding: 30 },
						{ 
							view: "combo", 
							label: _("Status"), 
							name: "Status", 
							bottomPadding: 25,
							invalidMessage: "This field is required",
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
							invalidMessage: "This field is required",
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
								value: _("Add new"), 
								css: "webix_primary",
								click: () => this.saveFormValues(),
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
						Email: value => webix.rules.isNotEmpty && this.validateEmail(value),
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
	ready() {
		this.on(this.app, "onContactsEnpty", () => {
			this.form.clear();
		});
	}
	saveFormValues() {
		if (!this.form.validate()) {
			webix.message("Please, check all fields!");
			return false;
		}
		const values = this.form.getValues();

		this.app.callEvent("onDataSave", [values, this.form]);
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
	setNewValues(item){
		this.form.setValues(item);
	}
	validateEmail(email) {
		const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		return reg.test(String(email).toLowerCase());
	}
}