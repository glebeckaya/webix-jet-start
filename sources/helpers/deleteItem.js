export function showConfirmMessage(id, data) {
	let promise = webix.promise.defer();
	if (!data.getItem(id)) return;
	webix.confirm({
		text: `Do you really want to delete "${data.getItem(id)["Name"]}"?`
	}).then(
		() => {
			data.remove(id);
			promise.resolve(data);
			
		}
	);
	return promise;
}