export function showConfirmMessage(id, data, _) {
	let promise = webix.promise.defer();
	if (!data.getItem(id)) return;
	webix.confirm({
		ok: "OK", 
		cancel: _("Cancel"),
		text: `${_("wantDelete")} "${data.getItem(id)["Name"]}"?`
	}).then(
		() => {
			data.remove(id);
			promise.resolve(data);
			
		}
	);
	return promise;
}