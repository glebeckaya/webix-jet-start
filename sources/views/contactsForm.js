import {JetView} from "webix-jet";
import {statuses} from "models/statuses";
import {countries} from "models/countries";

export default class ContactsFormView extends JetView {
	config() {
		return {
			rows: [
				{
					view: "form",
					localId: "contactsForm",
					width: 300,
					elements: [
						{ template: "Contacts", type: "section" },
						{ view: "text", label: "Name", name: "Name", invalidMessage: "This field is required", bottomPadding: 25 },
						{ view: "text", label: "Email", name: "Email", invalidMessage: "your-name@domain.com - required format of Email", bottomPadding: 30 },
						{ 
							view: "combo", 
							label: "Status", 
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
							label: "Country", 
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
								value: "Add new" , 
								css: "webix_primary",
								click: () => this.saveFormValues(),
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
	saveFormValues() {
		if (!this.form.validate()) {
			webix.message("Please, check all fields!");
			return false;
		}
		try {
			this.form.save();
		} catch(err) {
			const values = this.form.getValues();
			this.app.callEvent("onDataSave", [values, this.form]);
		}
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
	bindWith(list){
		this.form.bind(list);
	}
	validateEmail(email) {
		const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		return reg.test(String(email).toLowerCase());
	}
}